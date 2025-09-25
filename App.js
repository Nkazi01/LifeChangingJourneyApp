// Main App Component - Life Changing Journey
import React from 'react'
import { StatusBar, LogBox, Platform } from 'react-native'
import { AuthProvider } from './src/context/AuthContext'
import { FontLoader } from './src/providers/FontLoader'
import { DataProvider } from './src/providers/DataProvider'
import { NetworkProvider } from './src/utils/networkUtils'
import ErrorBoundary from './src/components/ErrorBoundary'
import AppNavigator from './src/navigation/AppNavigator'
import NetworkStatusBar from './src/components/common/NetworkStatusBar'
import VideoSplash from './src/components/common/VideoSplash'

// Ignore specific warnings in development
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Require cycle:',
]);

export default function App() {
  const [showSplash, setShowSplash] = React.useState(true)

  // Override global styles for web to fix scrolling
  if (Platform.OS === 'web') {
    const style = document.createElement('style');
    style.textContent = `
      html, body {
        overflow: auto !important;
        height: 100% !important;
      }
      #root {
        overflow: auto !important;
        height: 100% !important;
      }
    `;
    document.head.appendChild(style);
  }

  return (
    <ErrorBoundary>
      <NetworkProvider>
        <FontLoader>
          <AuthProvider>
            <DataProvider>
              {showSplash && (
                <VideoSplash
                  // Put your video file into assets/ (e.g., assets/splash.mp4) and update the path below
                  source={require('./assets/splash.mp4')}
                  onFinish={() => setShowSplash(false)}
                  backgroundColor="#000"
                  minimumMs={1500}
                  poster={require('./assets/icon.png')}
                />
              )}
              <NetworkStatusBar />
              <AppNavigator />
              <StatusBar style="auto" />
            </DataProvider>
          </AuthProvider>
        </FontLoader>
      </NetworkProvider>
    </ErrorBoundary>
  )
}
