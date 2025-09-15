// Main App Component - Life Changing Journey
import React from 'react'
import { StatusBar, LogBox } from 'react-native'
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
