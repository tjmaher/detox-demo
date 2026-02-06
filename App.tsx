/**
 * Login Demo App for Detox Testing
 * Based on https://the-internet.herokuapp.com/login
 *
 * @format
 */

import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import SecureAreaScreen from './src/screens/SecureAreaScreen';

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
