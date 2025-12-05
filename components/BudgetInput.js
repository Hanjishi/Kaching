import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";

export default function BudgetInput({ userEmail, monthlyBudget, setMonthlyBudget }) {
  const [inputBudget, setInputBudget] = useState("");

  const handleSaveBudget = async () => {
    if (!inputBudget) return Alert.alert("Error", "Please enter a budget.");
    setMonthlyBudget(inputBudget);
    if (userEmail) await AsyncStorage.setItem(`@monthlyBudget_${userEmail}`, inputBudget);
    setInputBudget("");
    Alert.alert("Saved", "Monthly budget saved locally. You can backup to cloud from Settings.");
  };

  return (
    <View style={{ flexDirection: "row", marginBottom: 20 }}>
      <TextInput
        style={{ borderWidth: 1, flex: 1, marginRight: 10, padding: 8, borderRadius: 5 }}
        placeholder="Enter new budget"
        keyboardType="numeric"
        value={inputBudget}
        onChangeText={setInputBudget}
      />
      <Button title="Save" onPress={handleSaveBudget} />
    </View>
  );
}
