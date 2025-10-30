import React from "react";
import { View } from "react-native";
import ExpenseForm from "../components/ExpenseForm";
import { addExpense } from "../services/api";
import styles from "../styles/Theme";

export default function AddExpense({ navigation }) {
  const handleSubmit = async (expense) => {
    // ✅ Create timestamp when expense is added
    const timestamp = new Date().toLocaleString();

    const newExpense = {
      id: Date.now(),
      ...expense,
      timestamp, // ✅ include timestamp here
    };

    await addExpense(newExpense);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* ✅ Pass handleSubmit to ExpenseForm */}
      <ExpenseForm onSubmit={handleSubmit} />
    </View>
  );
}
