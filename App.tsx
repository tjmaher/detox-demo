/**
 * Login Demo App for Detox Testing
 * Based on https://the-internet.herokuapp.com/login
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, View, NativeModules } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import SecureAreaScreen from './src/screens/SecureAreaScreen';

// Get reference to the native Detox module
const { DetoxModule } = NativeModules;

type Screen = 'login' | 'secureArea';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  // Initialize Detox on mount
  useEffect(() => {
    const initializeDetox = async () => {
      try {
        if (DetoxModule && DetoxModule.initialize) {
          const result = await DetoxModule.initialize();
          console.log('[Detox] Initialization result:', result);
          
          // Report that app is ready
          if (DetoxModule.reportReady) {
            await DetoxModule.reportReady();
            console.log('[Detox] App reported ready');
          }
        }
      } catch (error) {
        // Detox module may not be available in non-test environments
        console.log('[Detox] Detox not available (normal in non-test builds)', error);
      }
    };

    initializeDetox();
  }, []);

  const handleNavigateToSecureArea = () => {
    setShowLogoutMessage(false);
    setCurrentScreen('secureArea');
  };

  const handleLogout = () => {
    setShowLogoutMessage(true);
    setCurrentScreen('login');
  };

  return (
    <View 
      style={[styles.container, { paddingTop: safeAreaInsets.top }]}
      testID="appRoot">
      {currentScreen === 'login' ? (
        <LoginScreen 
          onNavigateToSecureArea={handleNavigateToSecureArea}
          showLogoutMessage={showLogoutMessage}
        />
      ) : (
        <SecureAreaScreen onLogout={handleLogout} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
