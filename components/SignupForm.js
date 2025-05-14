import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity, CheckBox, ScrollView } from 'react-native';

export default function SignupForm({ role, goToLogin }) {
  const [fields, setFields] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    relationship: '',
    address: '',
    clinicName: '',
    specialization: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [agree, setAgree] = useState(false);

  const validate = () => {
    if (role === 'parent') {
      if (
        !fields.phone ||
        !fields.email ||
        !fields.firstName ||
        !fields.lastName ||
        !fields.relationship ||
        !fields.password ||
        !fields.confirmPassword
      ) {
        return 'All fields are required';
      }
    } else {
      if (
        !fields.phone ||
        !fields.email ||
        !fields.firstName ||
        !fields.lastName ||
        !fields.clinicName ||
        !fields.specialization ||
        !fields.password ||
        !fields.confirmPassword
      ) {
        return 'All fields are required';
      }
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(fields.email)) return 'Invalid email';
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(fields.phone)) return 'Invalid phone number';
    if (fields.password !== fields.confirmPassword) return 'Passwords do not match';
    if (!agree) return 'You must agree to the Terms & Conditions';
    return '';
  };

  const handleSignup = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError('');
    try {
      const res = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        Alert.alert('Signup Success');
      } else {
        Alert.alert('Signup Failed');
      }
    } catch (e) {
      Alert.alert('Network Error');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.form}>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="Phone Number *"
          value={fields.phone}
          onChangeText={v => setFields(f => ({ ...f, phone: v }))}
          keyboardType="phone-pad"
        />
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="Email"
          value={fields.email}
          onChangeText={v => setFields(f => ({ ...f, email: v }))}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="First Name *"
          value={fields.firstName}
          onChangeText={v => setFields(f => ({ ...f, firstName: v }))}
        />
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="Last Name *"
          value={fields.lastName}
          onChangeText={v => setFields(f => ({ ...f, lastName: v }))}
        />
      </View>
      {role === 'parent' ? (
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="Relationship with Child *"
            value={fields.relationship}
            onChangeText={v => setFields(f => ({ ...f, relationship: v }))}
          />
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="Address"
            value={fields.address}
            onChangeText={v => setFields(f => ({ ...f, address: v }))}
          />
        </View>
      ) : (
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="Clinic Name *"
            value={fields.clinicName}
            onChangeText={v => setFields(f => ({ ...f, clinicName: v }))}
          />
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="Specialization *"
            value={fields.specialization}
            onChangeText={v => setFields(f => ({ ...f, specialization: v }))}
          />
        </View>
      )}
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="Password *"
          value={fields.password}
          onChangeText={v => setFields(f => ({ ...f, password: v }))}
          secureTextEntry
        />
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="Confirm Password *"
          value={fields.confirmPassword}
          onChangeText={v => setFields(f => ({ ...f, confirmPassword: v }))}
          secureTextEntry
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity
        style={[styles.signupBtn, !agree && { backgroundColor: '#aaa' }]}
        onPress={handleSignup}
        disabled={!agree}
      >
        <Text style={styles.signupBtnText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.checkboxRow}>
        <CheckBox value={agree} onValueChange={setAgree} />
        <Text style={styles.termsText}>I agree to the <Text style={{ color: '#007AFF' }}>Terms & Conditions</Text></Text>
      </View>
      <Text style={styles.loginText}>
        Already have an account? Login (
        <Text style={{ color: '#007AFF' }} onPress={() => goToLogin('parent')}>Parent</Text>
        /
        <Text style={{ color: '#007AFF' }} onPress={() => goToLogin('pediatrician')}>Pediatrician</Text>
        )
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: { width: '100%', alignItems: 'center', paddingBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10, borderRadius: 4, backgroundColor: '#f5f8fa' },
  inputHalf: { width: '48%' },
  error: { color: 'red', marginBottom: 10, alignSelf: 'flex-start' },
  signupBtn: { backgroundColor: '#888', borderRadius: 4, width: '100%', padding: 12, alignItems: 'center', marginTop: 10, marginBottom: 10 },
  signupBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  termsText: { marginLeft: 8, fontSize: 13 },
  loginText: { color: '#007AFF', fontSize: 13, marginTop: 10, textAlign: 'center' },
});