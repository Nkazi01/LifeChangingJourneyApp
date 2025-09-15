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
