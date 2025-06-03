import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Animated, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';

export default function Signupscreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [glowAnim]);

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert(`Signing up with email: ${email}`);
    navigation.navigate('Login');
  };

  const glowInterpolation = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

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
        <Text style={styles.header}>Create Your Account</Text>

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

        <TextInput
          style={[styles.input, styles.inputShadow]}
          placeholder="Confirm Password"
          placeholderTextColor="#666"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account? Log In</Text>
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
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  lightImageBackground: {
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
  },
  lightImage: {
    width: 90,
    height: 225,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 25,
    color: '#007AFFs',
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
    fontSize: 20,
    fontWeight: '700',
  },
  linkText: {
    color: '#007AFEs',
    fontSize: 16,
    textAlign: 'center',
  },
});
