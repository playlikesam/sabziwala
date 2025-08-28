import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import demoData from '../constants/demo.json';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const users = demoData.users;
    if (users[username] && users[username] === password) {
      await AsyncStorage.setItem('loggedIn', username);
      router.replace('/(tabs)');
    } else {
      Alert.alert('Login Failed', 'Invalid username or password!');
    }
  };

  const handleNavigateRegister = () => {
    router.push('/register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sabziwala Login</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavigateRegister}>
        <Text style={styles.signupText}>New user? Register here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  title: { fontSize: 28, color: '#FF9800', fontWeight: 'bold', marginBottom: 24, fontFamily: 'Poppins_700Bold' },
  input: { width: '100%', padding: 10, borderWidth: 1, borderColor: '#333', borderRadius: 8, marginBottom: 14, fontSize: 16, fontFamily: 'Poppins_400Regular', backgroundColor: '#f9f9f9', color: '#000' },
  button: { backgroundColor: '#FF9800', paddingVertical: 12, paddingHorizontal: 32, borderRadius: 8, marginTop: 10, marginBottom: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontFamily: 'Poppins_500Medium' },
  signupText: { color: '#222', fontSize: 14, marginTop: 10, fontFamily: 'Poppins_400Regular', textDecorationLine: 'underline' },
});
