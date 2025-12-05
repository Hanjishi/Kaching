import React, { useState } from "react";
import { Image, View, Text, TextInput, TouchableOpacity, Alert,} from "react-native";
import { supabase } from "../services/supabase";
import styles from "../styles/SignupStyles";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      return Alert.alert("Validation Error", "All fields are required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("Validation Error", "Please enter a valid email address.");
    }

    if (password.length < 6) {
      return Alert.alert("Validation Error", "Password must be at least 6 characters.");
    }

    if (password !== confirmPassword) {
      return Alert.alert("Validation Error", "Passwords do not match.");
    }

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      Alert.alert(
        "Success",
        "Account created successfully. Check your email for confirmation (if required)."
      );
      navigation.replace("Login");
    } catch (err) {
      Alert.alert("Signup Error", err.message || "Failed to create account.");
    }
  };

  return (
    <View style={styles.container}>

      <Image source={require("../assets/kaching_logo.png")} style={styles.logo} />

      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#6B7280"
        style={styles.input}
        value={email}
        valueTextColor="#6B7280"
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#6B7280"
        style={styles.input}
        value={password}
        valueTextColor="#6B7280"
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Re-enter Password"
        placeholderTextColor="#6B7280"
        style={styles.input}
        value={confirmPassword}
        valueTextColor="#6B7280"
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}
