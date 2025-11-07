import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

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

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("Home")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
  flex: 1, 
  justifyContent: "center", 
  alignItems: "center", 
  padding: 20, 
  backgroundColor: "#fff" 
  },
  title: { 
  fontSize: 28, 
  fontWeight: "bold", 
  color: "#9C27B0" 
  },
  subtitle: { 
  fontSize: 16, 
  color: "#666", 
  marginBottom: 30 
  },
  input: { 
  width: "100%", 
  borderWidth: 1, 
  borderColor: "#ccc", 
  borderRadius: 10, 
  padding: 12, 
  marginBottom: 15
  },
  button: { 
  backgroundColor: "#9C27B0", 
  paddingVertical: 12, 
  borderRadius: 10, 
  width: "100%", 
  alignItems: "center"
  },
  buttonText: { 
  color: "#fff", 
  fontSize: 16, 
  fontWeight: "bold" 
  },
  link: { 
  marginTop: 15, 
  color: "#9C27B0", 
  fontWeight: "500" 
  },
});
