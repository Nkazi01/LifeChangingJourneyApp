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

// Ignore specific warnings in development
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Require cycle:',
]);

export default function App() {
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
