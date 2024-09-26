import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env'

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
        Alert.alert('Please fill out all fields.');
        return;
      }
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    }

    setLoading(true);

    const data = {
      email: email,
      password: password
    };

    axios.post(`${API_URL}/signup`, data)
      .then(response => {
        setLoading(false);
        Alert.alert('Registration Successful', 'You can now log in.');
        // console.log('Response:', response.data);
      })
      .catch(error => {
        setLoading(false);
        // console.error('Error:', error.response.data.error);
        Alert.alert('Registration Failed', error.response.data.error );
      });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Button
        title={loading ? 'Registering...' : 'Register'}
        onPress={handleRegister}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10
  },
  button: {
    marginTop: 20,
  },
});

export default Register;
