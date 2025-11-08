import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("Home")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
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
