import React from "react";
import { View, Alert } from "react-native";
import ExpenseForm from "../components/ExpenseForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/Theme";

export default function AddExpense({ navigation }) {
  const handleSubmit = async (expense) => {
    try {
      const userEmail = await AsyncStorage.getItem("@logged_in_user");
      if (!userEmail) {
        Alert.alert("Error", "No logged-in user found.");
        return;
      }

      const storedExpenses = await AsyncStorage.getItem(`@${userEmail}_expenses`);
      const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];

      const newExpense = { id: Date.now(), ...expense };
      const updatedExpenses = [...expenses, newExpense];

      await AsyncStorage.setItem(`@${userEmail}_expenses`, JSON.stringify(updatedExpenses));
      navigation.goBack();
    } catch (error) {
      console.error("Error saving expense:", error);
      Alert.alert("Error", "Failed to save expense.");
    }
  };

  return (
    <View style={styles.container}>
      <ExpenseForm onSubmit={handleSubmit} />
    </View>
  );
}
