import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import styles from "../styles/SignupStyles";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("https://cdn-icons-png.flaticon.com/512/3135/3135715.png");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSignup = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    const profileData = {
      name,
      email,
      phone,
      currency: "PHP (₱)",
      avatar,
      password,
    };

    try {
      await AsyncStorage.setItem(`@user_${email}_profile`, JSON.stringify(profileData));
      await AsyncStorage.setItem("@logged_in_user", email);

      Alert.alert("Success", "Account created successfully!");
      navigation.replace("Home");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to save account.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {/* Avatar */}
      <TouchableOpacity onPress={pickImage} style={{ alignItems: "center", marginBottom: 15 }}>
        <Image source={{ uri: avatar }} style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: "#2ECC71" }} />
        <Text style={{ color: "#3498DB", marginTop: 5 }}>Choose Photo</Text>
      </TouchableOpacity>

      {/* Optional: Take a photo */}
      <TouchableOpacity onPress={takePhoto} style={{ alignItems: "center", marginBottom: 15 }}>
        <Text style={{ color: "#3498DB" }}>Take a Photo</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}
