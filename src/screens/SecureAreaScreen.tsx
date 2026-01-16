import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';

interface SecureAreaScreenProps {
  onLogout: () => void;
}

const SecureAreaScreen: React.FC<SecureAreaScreenProps> = ({ onLogout }) => {
  const [successMessage] = useState('You logged into a secure area!');

  const handleLogout = () => {
    onLogout();
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      testID="scrollView"
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Success Banner */}
      <View style={styles.successBanner} testID="success-banner">
        <Text testID="success-text" style={styles.bannerText}>{successMessage}</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.heading} testID="secure-area-heading">
          Secure Area
        </Text>
        
        <Text style={styles.bodyText} testID="secure-area-body">
          Welcome to the Secure Area. When you are done click logout below.
        </Text>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          testID="logout-button"
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
  },
  successBanner: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginBottom: 0,
  },
  bannerText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  bodyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    lineHeight: 24,
  },
  logoutButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SecureAreaScreen;
