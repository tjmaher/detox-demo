/**
 * Created by GitHub Copilot
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppIcon: React.FC<{ size?: number }> = ({ size = 120 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Blue background */}
      <View style={[styles.background, { width: size, height: size }]} />
      
      {/* "T.J." text in white */}
      <Text style={[styles.initialsText, { fontSize: size * 0.35 }]}>T.J.</Text>
      
      {/* Small Detox checkmark indicator */}
      <View style={[styles.checkmark, { 
        bottom: size * 0.08, 
        right: size * 0.08,
        width: size * 0.2,
        height: size * 0.2,
        borderRadius: size * 0.1
      }]}>
        <Text style={[styles.checkSymbol, { fontSize: size * 0.12 }]}>✓</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  background: {
    position: 'absolute',
    borderRadius: 24,
    backgroundColor: '#007AFF', // iOS blue
  },
  initialsText: {
    fontFamily: 'System',
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 2,
  },
  checkmark: {
    position: 'absolute',
    backgroundColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  checkSymbol: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AppIcon;