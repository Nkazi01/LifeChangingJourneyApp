// Network connection utility for Life Changing Journey App
import NetInfo from '@react-native-community/netinfo';
import { Platform } from 'react-native';
import React, { useState, useEffect, createContext, useContext } from 'react';

// Network connection types
export const ConnectionTypes = {
  WIFI: 'wifi',
  CELLULAR: 'cellular',
  ETHERNET: 'ethernet',
  VPN: 'vpn',
  BLUETOOTH: 'bluetooth',
  UNKNOWN: 'unknown',
  NONE: 'none',
};

// Create network context
const NetworkContext = createContext({
  isConnected: true,
  connectionType: ConnectionTypes.UNKNOWN,
  isHotspot: false,
  isConnecting: false,
});

// Network provider component
export const NetworkProvider = ({ children }) => {
  const [networkState, setNetworkState] = useState({
    isConnected: true,
    connectionType: ConnectionTypes.UNKNOWN,
    isHotspot: false,
    isConnecting: false,
  });

  useEffect(() => {
    // Subscribe to network info updates
    const unsubscribe = NetInfo.addEventListener(state => {
      // Determine if connection might be a hotspot
      const possibleHotspot = state.isConnected && 
        (state.type === 'cellular' || 
         (state.type === 'wifi' && Platform.OS === 'android' && state.details?.ssid?.includes('android')));
      
      setNetworkState({
        isConnected: state.isConnected ?? false,
        connectionType: state.type ?? ConnectionTypes.UNKNOWN,
        isHotspot: possibleHotspot,
        isConnecting: false,
      });
    });

    // Check network on startup
    checkNetworkConnection();
    
    return () => {
      unsubscribe();
    };
  }, []);

  // Function to check network manually
  const checkNetworkConnection = async () => {
    setNetworkState(prev => ({ ...prev, isConnecting: true }));
    
    try {
      const state = await NetInfo.fetch();
      
      // Determine if connection might be a hotspot
      const possibleHotspot = state.isConnected && 
        (state.type === 'cellular' || 
         (state.type === 'wifi' && Platform.OS === 'android' && state.details?.ssid?.includes('android')));
      
      setNetworkState({
        isConnected: state.isConnected ?? false,
        connectionType: state.type ?? ConnectionTypes.UNKNOWN,
        isHotspot: possibleHotspot,
        isConnecting: false,
      });
    } catch (error) {
      console.error('Error checking network:', error);
      setNetworkState(prev => ({ 
        ...prev, 
        isConnecting: false,
        isConnected: false,
      }));
    }
  };

  return (
    <NetworkContext.Provider 
      value={{
        ...networkState,
        checkNetworkConnection,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

// Hook to use network status
export const useNetworkStatus = () => {
  try {
    return useContext(NetworkContext);
  } catch (error) {
    // Fallback if not wrapped in provider
    return {
      isConnected: true,
      connectionType: ConnectionTypes.UNKNOWN,
      isHotspot: false,
      isConnecting: false,
      checkNetworkConnection: () => {},
    };
  }
};

// Helper to determine best connection method for Expo
export const getExpoConnectionType = () => {
  return new Promise(async (resolve) => {
    try {
      const state = await NetInfo.fetch();
      
      // If not connected, use offline mode
      if (!state.isConnected) {
        resolve('offline');
        return;
      }
      
      // If connected to mobile hotspot, use tunnel
      if (state.type === 'cellular' || 
          (state.type === 'wifi' && Platform.OS === 'android' && state.details?.ssid?.includes('android'))) {
        resolve('tunnel');
        return;
      }
      
      // Otherwise use LAN
      resolve('lan');
    } catch (error) {
      console.error('Error determining connection type:', error);
      resolve('offline'); // Fallback to offline if error
    }
  });
};

// Test a specific URL connection
export const testUrlConnection = async (url) => {
  try {
    const response = await fetch(url, { 
      method: 'HEAD',
      timeout: 5000,
    });
    return response.ok;
  } catch (error) {
    console.error(`Connection to ${url} failed:`, error);
    return false;
  }
};

// Fetch latest videos from a YouTube channel via RSS (no API key required)
// channelId: e.g., 'UC_x5XG1OV2P6uZZ5FSM9Tg'
export const fetchYouTubeChannelVideos = async (channelId, maxItems = 6) => {
  try {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const proxied = `https://r.jina.ai/http/${rssUrl.replace('https://', '')}`;
    const res = await fetch(proxied);
    const xml = await res.text();
    const entries = Array.from(xml.matchAll(/<entry>[\s\S]*?<\/entry>/g)).slice(0, maxItems);
    return entries.map((match) => {
      const entry = match[0];
      const get = (regex) => {
        const m = entry.match(regex);
        return m ? m[1] : '';
      };
      const id = get(/<yt:videoId>(.*?)<\/yt:videoId>/);
      const title = get(/<title>([\s\S]*?)<\/title>/);
      const published = get(/<published>(.*?)<\/published>/);
      const link = get(/<link rel=\"alternate\" href=\"(.*?)\"\/>/);
      const thumbnail = get(/<media:thumbnail url=\"(.*?)\"/);
      const durationSecStr = get(/<media:group>[\s\S]*?<yt:duration seconds=\"(\d+)\"\/>/);
      const viewsStr = get(/<media:group>[\s\S]*?<media:community>[\s\S]*?<media:statistics views=\"(\d+)\"\/>/);
      const durationSeconds = durationSecStr ? parseInt(durationSecStr, 10) : undefined;
      const views = viewsStr ? parseInt(viewsStr, 10) : undefined;
      return { id, title, published, link, thumbnail, durationSeconds, views };
    });
  } catch (error) {
    console.warn('Failed to fetch YouTube RSS:', error);
    return [];
  }
};

// Attempt to fetch via YouTube "user" RSS using a handle or username.
export const fetchYouTubeVideosByHandle = async (handleOrUser, maxItems = 6) => {
  const clean = (handleOrUser || '').replace(/^@/, '');
  try {
    // Try legacy user feed via proxy to avoid CORS
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?user=${clean}`;
    const proxied = `https://r.jina.ai/http/${rssUrl.replace('https://', '')}`;
    const res = await fetch(proxied);
    const xml = await res.text();
    if (xml.includes('<entry>')) {
      const entries = Array.from(xml.matchAll(/<entry>[\s\S]*?<\/entry>/g)).slice(0, maxItems);
      return entries.map((match) => {
        const entry = match[0];
        const get = (regex) => {
          const m = entry.match(regex);
          return m ? m[1] : '';
        };
        const id = get(/<yt:videoId>(.*?)<\/yt:videoId>/);
        const title = get(/<title>([\s\S]*?)<\/title>/);
        const published = get(/<published>(.*?)<\/published>/);
        const link = get(/<link rel=\"alternate\" href=\"(.*?)\"\/>/);
        const thumbnail = get(/<media:thumbnail url=\"(.*?)\"/);
        const durationSecStr = get(/<media:group>[\s\S]*?<yt:duration seconds=\"(\d+)\"\/>/);
        const viewsStr = get(/<media:group>[\s\S]*?<media:community>[\s\S]*?<media:statistics views=\"(\d+)\"\/>/);
        const durationSeconds = durationSecStr ? parseInt(durationSecStr, 10) : undefined;
        const views = viewsStr ? parseInt(viewsStr, 10) : undefined;
        return { id, title, published, link, thumbnail, durationSeconds, views };
      });
    }
  } catch (e) {
    // fallthrough to channelId resolution
  }

  try {
    // Try resolving channelId from handle page via a read-only proxy to bypass CORS
    const tryResolve = async (path) => {
      const proxyUrl = `https://r.jina.ai/http/https://www.youtube.com/${path}`;
      const page = await fetch(proxyUrl);
      const html = await page.text();
      const idMatch = html.match(/"channelId":"(UC[^"]+)"/);
      return idMatch ? idMatch[1] : null;
    };
    let channelId = await tryResolve(`@${clean}`);
    if (!channelId) {
      channelId = await tryResolve(`@${clean}/about`);
    }
    if (channelId) {
      return await fetchYouTubeChannelVideos(channelId, maxItems);
    }
  } catch (e) {
    console.warn('Failed to resolve channel from handle:', e);
  }

  return [];
};