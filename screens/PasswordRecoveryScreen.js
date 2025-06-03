import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function PasswordRecoveryScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handlePasswordRecovery = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
    // Placeholder for password recovery logic
    Alert.alert('Password Recovery', `Password recovery link sent to ${email}`);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      <View style={styles.innerView}>
        <Text style={styles.header}>Password Recovery</Text>
        <TextInput
          style={[styles.input, styles.inputShadow]}
          placeholder="Enter your email"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.button} onPress={handlePasswordRecovery}>
          <Text style={styles.buttonText}>Send Recovery Link</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.linkText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f0ff',
  },
  innerView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 25,
    color: '#007AFF',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  inputShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
    textAlign: 'center',
  },
});
