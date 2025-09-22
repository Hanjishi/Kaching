import React from "react";
import { View, Button } from "react-native";
import ExpenseForm from "../components/ExpenseForm";
import { updateExpense, deleteExpense } from "../services/api";
import styles from "../styles/Theme";

export default function EditExpense({ route, navigation }) {
  const { expense } = route.params;

  const handleUpdate = async (updated) => {
    await updateExpense({ ...expense, ...updated });
    navigation.goBack();
  };

  const handleDelete = async () => {
    await deleteExpense(expense.id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm initialValues={expense} onSubmit={handleUpdate} />
      <Button title="Delete Expense" onPress={handleDelete} color="red" />
    </View>
  );
}
