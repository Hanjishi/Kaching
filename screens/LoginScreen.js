import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/LoginStyles";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem(`@${email}_user_profile`);
      if (!savedProfile) {
        Alert.alert("Error", "User not found.");
        return;
      }

      const parsed = JSON.parse(savedProfile);
      if (parsed.password !== password) {
        Alert.alert("Error", "Incorrect password.");
        return;
      }

      await AsyncStorage.setItem("@logged_in_user", email);

      navigation.replace("Home");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Login failed.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
