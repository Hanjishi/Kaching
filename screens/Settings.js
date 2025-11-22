import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import styles from "../styles/Theme";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={darkMode ? styles.darkContainer : styles.container}>
      <Text style={darkMode ? styles.darkTitle : styles.title}>⚙️ Settings</Text>

      <View style={styles.settingRow}>
        <Text style={darkMode ? styles.darkSettingLabel : styles.settingLabel}>
          Enable Notifications
        </Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: "#ccc", true: "#2ecc71" }}
          thumbColor={notifications ? "#fff" : "#f4f3f4"}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={darkMode ? styles.darkSettingLabel : styles.settingLabel}>
          Dark Mode
        </Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: "#ccc", true: "#2e7d32" }}
          thumbColor={darkMode ? "#fff" : "#f4f3f4"}
        />
      </View>
    </View>
  );
}