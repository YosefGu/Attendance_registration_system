import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env'
import { storeToken } from "../utils/tokenHandling"
import { AuthContext } from "../context/auth"
import styles from '../utils/globalStyles';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext)

  
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

    try {
      const response = axios.post(`${API_URL}/signup`, data)
      setLoading(false);
      Alert.alert('Registration Successful');

      await storeToken(response.data.access_token);
      setIsAuthenticated(true);
      navigation.navigate('Home')

    } catch(error) {
      if (error.response) {
        Alert.alert('Registration Failed', error.response.data.error )
      }
      setLoading(false)
      console.log(error)
    }
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

export default Register;
