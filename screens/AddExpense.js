import React from "react";
import { View } from "react-native";
import ExpenseForm from "../components/ExpenseForm";
import { addExpense } from "../services/api";
import styles from "../styles/Theme";

export default function AddExpense({ navigation }) {
  const handleSubmit = async (expense) => {
    const newExpense = { id: Date.now(), ...expense };
    await addExpense(newExpense);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm onSubmit={handleSubmit} />
    </View>
  );
}
