import React, { useState } from "react";
import { View, Text, Switch, TextInput, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/Theme";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [currency, setCurrency] = useState("PHP");

  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [savedBudget, setSavedBudget] = useState(null);

  const [appLock, setAppLock] = useState(false);

  const handleClearData = () => {
    Alert.alert(
      "Confirm Action",
      "Are you sure you want to delete all expense data?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => Alert.alert("Data Cleared", "All expense records were deleted."),
        }
      ]
    );
  };

  const saveBudget = () => {
    setSavedBudget(monthlyBudget);
    Alert.alert("Saved", "Monthly budget updated successfully!");
  };

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

      <View style={styles.settingRow}>
        <Text style={darkMode ? styles.darkSettingLabel : styles.settingLabel}>
          Currency
        </Text>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={currency}
          onValueChange={setCurrency}
          style={styles.picker}
        >
          <Picker.Item label="🇵🇭 PHP - Philippine Peso" value="PHP" />
          <Picker.Item label="🇺🇸 USD - US Dollar" value="USD" />
          <Picker.Item label="🇯🇵 JPY - Japanese Yen" value="JPY" />
          <Picker.Item label="🇪🇺 EUR - Euro" value="EUR" />
        </Picker>
      </View>

      <View style={styles.settingRow}>
        <Text style={darkMode ? styles.darkSettingLabel : styles.settingLabel}>
          Monthly Budget
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter amount (e.g., 5000)"
        keyboardType="numeric"
        value={monthlyBudget}
        onChangeText={setMonthlyBudget}
      />

      <TouchableOpacity style={styles.button} onPress={saveBudget}>
        <Text style={styles.buttonText}>Save Budget</Text>
      </TouchableOpacity>

      {savedBudget && (
        <Text style={styles.note}>
          Current Monthly Budget: {currency} {savedBudget}
        </Text>
      )}

      <View style={styles.settingRow}>
        <Text style={darkMode ? styles.darkSettingLabel : styles.settingLabel}>
          App Lock (PIN Required)
        </Text>
        <Switch
          value={appLock}
          onValueChange={setAppLock}
          trackColor={{ false: "#ccc", true: "#006400" }}
          thumbColor="#fff"
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={darkMode ? styles.darkSettingLabel : styles.settingLabel}>
          Clear All Data
        </Text>

        <TouchableOpacity onPress={handleClearData}>
          <Text style={{ color: "red", fontWeight: "bold" }}>Delete</Text>
        </TouchableOpacity>
      </View>

      <Text style={darkMode ? styles.darkNote : styles.note}>
        ⚠️ Warning: Clearing data cannot be undone.
      </Text>
    </View>
  );
}


