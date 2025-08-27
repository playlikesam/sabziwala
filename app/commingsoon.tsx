import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ComingSoonScreen() {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>🚧 Coming Soon!</Text>
      <Text style={styles.message}>We will integrate this feature soon.</Text>
      <Text style={styles.subtext}>Stay tuned for new updates and thank you for using Sabziwala. Your feedback helps us bring awesome features faster!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDF8',
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 26,
    color: '#FF9800',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 12,
  },
  message: {
    fontSize: 18,
    color: '#222',
    fontFamily: 'Poppins_500Medium',
    marginBottom: 10,
    textAlign: 'center'
  },
  subtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular'
  }
});
