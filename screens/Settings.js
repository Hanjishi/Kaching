import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import styles from "../styles/SettingsStyles";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>

      <Text style={styles.sectionTitle}>General</Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Enable Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: "#ccc", true: "#2ecc71" }}
          thumbColor={notifications ? "#fff" : "#f4f3f4"}
        />
      </View>
    </View>
  );
}
