import React from "react";
import { View, Button, Alert } from "react-native";
import ExpenseForm from "../components/ExpenseForm";
import { supabase } from "../services/supabase";
import styles from "../styles/Theme";

export default function EditExpense({ route, navigation }) {
  const { expense } = route.params;

  const handleUpdate = async (updated) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { error } = await supabase.from("expenses_backup").update(updated).eq("id", expense.id);
      if (error) throw error;
      navigation.goBack();
    } catch (err) {
      console.error(err);
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
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;
            const { error } = await supabase.from("expenses_backup").delete().eq("id", expense.id);
            if (error) throw error;
            navigation.goBack();
          } catch (err) {
            console.error(err);
            Alert.alert("Error", "Failed to delete the expense.");
          }
        }
      }
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
