import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import { validUser } from '../../e2e/credentials';

interface LoginScreenProps {
  onNavigateToSecureArea: () => void;
  showLogoutMessage?: boolean;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigateToSecureArea, showLogoutMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (username === validUser.userName && password === validUser.password) {
      setSuccessMessage('Login successful!');
      setTimeout(() => {
        onNavigateToSecureArea();
      }, 1000);
    } else {
      setErrorMessage('Your username is invalid!');
    }
  };

  const clearMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      testID="scrollView"
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Logout Success Banner */}
      {showLogoutMessage ? (
        <View style={styles.successBanner} testID="success-banner">
          <Text testID="success-logout-text" style={styles.bannerText}>You logged out of the secure area!</Text>
        </View>
      ) : null}

      {/* Error Banner */}
      {errorMessage ? (
        <View style={styles.errorBanner} testID="error-banner">
          <Text style={styles.bannerText} testID="error-text">{errorMessage}</Text>
        </View>
      ) : null}
      
      {/* Success Banner */}
      {successMessage ? (
        <View style={styles.successBanner} testID="success-banner">
          <Text style={styles.bannerText}>{successMessage}</Text>
        </View>
      ) : null}

      <View style={styles.formContainer}>
        <Text style={styles.heading} testID="login-heading">
          Login Page
        </Text>
        
        <Text style={styles.instructions} testID="login-instructions">
          This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            clearMessages();
          }}
          testID="username-input"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            clearMessages();
          }}
          testID="password-input"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          testID="login-button"
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Attribution text */}
      <Text style={styles.attribution}>
        Based on Dave Haefner's{' '}
        <Text style={styles.link}>The-Internet</Text>
      </Text>
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
  errorBanner: {
    backgroundColor: '#FF4444',
    padding: 15,
    marginBottom: 0,
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
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    lineHeight: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  attribution: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
