import React from "react";
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/HomeStyles";

export default function ProfileHeader({ profile, menuVisible, setMenuVisible, navigation, handleLogout, handleBackupNow }) {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileLeft}>
        <Image
          source={{ uri: profile?.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{profile?.name || ""}</Text>
      </View>

      <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
        <Ionicons name="menu" size={28} color="#333" />
      </TouchableOpacity>

      {menuVisible && (
        <View style={styles.menuDropdown}>
          <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuVisible(false); navigation.navigate("Profile"); }}>
            <Ionicons name="person-outline" size={18} color="#555" /><Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuVisible(false); navigation.navigate("Settings"); }}>
            <Ionicons name="settings-outline" size={18} color="#555" /><Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuVisible(false); navigation.navigate("About"); }}>
            <Ionicons name="information-circle-outline" size={18} color="#555" /><Text style={styles.menuText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={async () => { setMenuVisible(false); await handleLogout(); }}>
            <Ionicons name="log-out-outline" size={18} color="#555" /><Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleBackupNow}>
            <Ionicons name="cloud-upload-outline" size={18} color="#555" /><Text style={styles.menuText}>Backup Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
