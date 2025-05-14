import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AuthTabs from './components/AuthTabs';

export default function App() {
  return (
    <View style={styles.container}>
      <AuthTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    
  },
});