import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

export default function LoginForm({ role, goToSignup }) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!emailOrPhone) return 'Email or Phone is required';
    if (!password) return 'Password is required';
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^\d{10}$/;
    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      return 'Enter a valid email or 10-digit phone number';
    }
    return '';
  };

  const handleLogin = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError('');
    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: emailOrPhone, password }),
      });
      if (res.ok) {
        Alert.alert('Login Success');
      } else {
        Alert.alert('Login Failed');
      }
    } catch (e) {
      Alert.alert('Network Error');
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder={role === 'pediatrician' ? "Pediatrician Email or Phone" : "Phone Number or Email ID"}
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.linksRow}>
        <TouchableOpacity>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkRed}>Trouble signing in?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.registerText}>
        New to Smile2Steps? Register (
        <Text style={{ color: '#007AFF' }} onPress={() => goToSignup('parent')}>Parent</Text>
        /
        <Text style={{ color: '#007AFF' }} onPress={() => goToSignup('pediatrician')}>Pediatrician</Text>
        )
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { width: '100%', alignItems: 'center' },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10, borderRadius: 4, backgroundColor: '#f5f8fa' },
  error: { color: 'red', marginBottom: 10, alignSelf: 'flex-start' },
  linksRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10 },
  link: { color: '#007AFF', fontSize: 13 },
  linkRed: { color: 'red', fontSize: 13, marginLeft: 10 },
  loginBtn: { backgroundColor: '#007AFF', borderRadius: 4, width: '100%', padding: 12, alignItems: 'center', marginTop: 10, marginBottom: 10 },
  loginBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  registerText: { color: '#007AFF', fontSize: 13, marginTop: 10, textAlign: 'center' },
});