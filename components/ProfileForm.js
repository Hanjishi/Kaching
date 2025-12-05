import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import styles from "../styles/ProfileFormStyles";

export default function ProfileForm({ profile, setProfile, onSave,}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
      </TouchableOpacity>

      <Text style={styles.title}>Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={profile.name}
        onChangeText={(t) => setProfile(prev => ({ ...prev, name: t }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={profile.email}
        onChangeText={(t) => setProfile(prev => ({ ...prev, email: t }))}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={profile.phone}
        onChangeText={(t) => setProfile(prev => ({ ...prev, phone: t }))}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Currency"
        editable={false}
        value={profile.currency}
        onChangeText={(t) => setProfile(prev => ({ ...prev, currency: t }))}
      />

      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}
