import { View, Image, StyleSheet, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from "react-native";
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

export default function Loginscreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Placeholder for login logic
    // On successful login, navigate to Dashboard
    navigation.navigate('Dashboard');
  };

  const handleForgotPassword = () => {
    navigation.navigate('PasswordRecovery');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" />
      <Image style={styles.backgroundImage} source={require('../assets/image/blue.png')} />

      <View style={styles.innerView}>
        <View style={styles.lightImageBackground}>
          <Image style={styles.lightImage} source={require('../assets/image/life.png')} />
        </View>

        <Text style={styles.title}>Welcome Back</Text>

        <TextInput
          style={[styles.input, styles.inputShadow]}
          placeholder="Email"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={[styles.input, styles.inputShadow]}
          placeholder="Password"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.linkTextBlack}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  innerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  lightImageBackground: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    marginBottom: 20,
  },
  lightImage: {
    width: 90,
    height: 225,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  inputShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 14,
    marginTop: 15,
    textDecorationLine: 'underline',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  linkTextBlack: {
    color: 'black',
    fontSize: 16,
    marginTop: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
