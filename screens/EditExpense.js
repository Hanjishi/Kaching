import React from "react";
import { View, Button, Alert } from "react-native";
import ExpenseForm from "../components/ExpenseForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/Theme";

export default function EditExpense({ route, navigation }) {
  const { expense } = route.params;

  const handleUpdate = async (updated) => {
    try {
      const userEmail = await AsyncStorage.getItem("@logged_in_user");
      if (!userEmail) return;

      const storedExpenses = await AsyncStorage.getItem(`@${userEmail}_expenses`);
      const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];

      const updatedExpenses = expenses.map((e) =>
        e.id === expense.id ? { ...e, ...updated } : e
      );

      await AsyncStorage.setItem(`@${userEmail}_expenses`, JSON.stringify(updatedExpenses));
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update the expense.");
    }
  };

  const handleDelete = async () => {
    Alert.alert("Delete Expense", "Are you sure you want to delete this expense?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const userEmail = await AsyncStorage.getItem("@logged_in_user");
            if (!userEmail) return;

            const storedExpenses = await AsyncStorage.getItem(`@${userEmail}_expenses`);
            const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];

            const updatedExpenses = expenses.filter((e) => e.id !== expense.id);
            await AsyncStorage.setItem(`@${userEmail}_expenses`, JSON.stringify(updatedExpenses));
            navigation.goBack();
          } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to delete the expense.");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ExpenseForm initialValues={expense} onSubmit={handleUpdate} />
      <View style={{ marginTop: 20 }}>
        <Button title="Delete Expense" onPress={handleDelete} color="red" />
      </View>
    </View>
  );
}
