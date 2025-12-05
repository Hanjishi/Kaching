import React from "react";
import { View, Alert } from "react-native";
import ExpenseForm from "../components/ExpenseForm";
import { supabase } from "../services/supabase";

export default function AddExpense({ navigation }) {
  const handleSubmit = async (values) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const email = session?.user?.email;
      if (!email) return navigation.replace("Login");

      const { data: profile, error: profileError } = await supabase
        .from("profiles_backup")
        .select("user_id")
        .eq("email", email)
        .single();

      if (profileError || !profile) {
        throw new Error("User profile not found, Complete Profile Details First.");
      }

      const { error } = await supabase.from("expenses_backup").insert([{
        user_id: profile.user_id,
        title: values.description || "Expense",
        amount: values.amount,
        category: values.category,
        date: values.date,
        description: values.description,
        backed_at: new Date().toISOString(),
      }]);

      if (error) throw error;

      navigation.replace("ExpenseList");
    } catch (err) {
      console.error("AddExpense error", err);
      Alert.alert("Error", err.message || "Failed to add expense.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ExpenseForm onSubmit={handleSubmit} />
    </View>
  );
}
