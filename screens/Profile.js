import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currency, setCurrency] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loggedInEmail, setLoggedInEmail] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const currentUserEmail = await AsyncStorage.getItem("@logged_in_user");
        setLoggedInEmail(currentUserEmail);

        if (currentUserEmail) {
          const savedProfile = await AsyncStorage.getItem(`@user_${currentUserEmail}_profile`);
          if (savedProfile) {
            const parsed = JSON.parse(savedProfile);
            setName(parsed.name);
            setEmail(parsed.email);
            setPhone(parsed.phone || "");
            setCurrency(parsed.currency || "PHP (₱)");
            setAvatar(parsed.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
          }
        }
      } catch (error) {
        console.log("Error loading profile:", error);
      }
    };

    loadProfile();
  }, []);

  const saveProfile = async () => {
    if (!loggedInEmail) return;

    const profileData = { name, email, phone, currency, avatar };
    try {
      await AsyncStorage.setItem(`@user_${loggedInEmail}_profile`, JSON.stringify(profileData));
      Alert.alert("Profile Updated", "Your profile details were saved!");
    } catch (error) {
      Alert.alert("Error", "Failed to save profile.");
    }
  };

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

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.changePhotoText}>Change Photo</Text>
      </TouchableOpacity>

      <View style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Edit Profile</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

        <Text style={styles.label}>Phone</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

        <Text style={styles.label}>Currency</Text>
        <TextInput style={styles.input} value={currency} onChangeText={setCurrency} />

        <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7F9",
    paddingTop: 40,
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: "#fff",
  },
  changePhotoText: {
    marginTop: 10,
    color: "#3498DB",
    fontSize: 14,
    fontWeight: "500",
  },
  detailsCard: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    color: "#34495E",
  },
  label: {
    marginTop: 10,
    fontSize: 14,
    color: "#7F8C8D",
  },
  input: {
    backgroundColor: "#F0F3F4",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    fontSize: 15,
    color: "#2C3E50",
  },
  saveButton: {
    backgroundColor: "#2ECC71",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
