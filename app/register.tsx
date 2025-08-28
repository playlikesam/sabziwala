import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import demoData from '../constants/demo.json';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const users = demoData.users;
    if (users[username]) {
      Alert.alert('Registration Failed', 'Username already exists!');
      return;
    }
    // Just showing alert, real registration/addition requires writing to file or AsyncStorage
    Alert.alert('Registration Successful', 'Please log in with your new credentials.');
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sabziwala Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  title: { fontSize: 28, color: '#FF9800', fontWeight: 'bold', marginBottom: 24, fontFamily: 'Poppins_700Bold' },
  input: { width: '100%', padding: 10, borderWidth: 1, borderColor: '#333', borderRadius: 8, marginBottom: 14, fontSize: 16, fontFamily: 'Poppins_400Regular', backgroundColor: '#f9f9f9', color: '#000' },
  button: { backgroundColor: '#FF9800', paddingVertical: 12, paddingHorizontal: 32, borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontFamily: 'Poppins_500Medium' },
});
