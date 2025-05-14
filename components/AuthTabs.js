import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function AuthTabs() {
  const [role, setRole] = useState('parent'); // 'parent' or 'pediatrician'
  const [tab, setTab] = useState('login'); // 'login' or 'signup'

  const goToSignup = (targetRole) => {
    setRole(targetRole);
    setTab('signup');
  };
  const goToLogin = (targetRole) => {
    setRole(targetRole);
    setTab('login');
  };

  return (
    <View style={styles.centered}>
      <View style={styles.card}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.welcome}>Welcome to Smile2Steps</Text>
        <View style={styles.roleTabs}>
          <TouchableOpacity onPress={() => setRole('parent')} style={[styles.tab, role === 'parent' && styles.activeTab]}>
            <Text style={role === 'parent' ? styles.activeText : styles.inactiveText}>Parent</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setRole('pediatrician')} style={[styles.tab, role === 'pediatrician' && styles.activeTab]}>
            <Text style={role === 'pediatrician' ? styles.activeText : styles.inactiveText}>Pediatrician</Text>
          </TouchableOpacity>
        </View>
        {tab === 'login' ? (
          <LoginForm role={role} goToSignup={goToSignup} />
        ) : (
          <SignupForm role={role} goToLogin={goToLogin} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' },
  card: {
    width: 350,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    // Blue box shadow
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12, // for Android
  },
  logo: { width: 80, height: 80, marginBottom: 12, resizeMode: 'contain' },
  welcome: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  roleTabs: { flexDirection: 'row', marginBottom: 10, width: '100%' },
  authTabs: { flexDirection: 'row', marginBottom: 20, width: '100%' },
  tab: { flex: 1, padding: 10, alignItems: 'center', borderBottomWidth: 2, borderColor: '#ccc', borderRadius: 4 },
  activeTab: { borderColor: '#007AFF', backgroundColor: '#e6f0ff' },
  activeText: { color: '#007AFF', fontWeight: 'bold' },
  inactiveText: { color: '#888' },
});