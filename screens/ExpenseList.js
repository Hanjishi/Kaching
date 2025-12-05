import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import ExpenseItem from "../components/ExpenseItem";
import { pullAllDataFromSupabase } from "../services/syncService";

export default function ExpenseList({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [monthlyBudget, setMonthlyBudget] = useState(0);

  const loadData = async () => {
    const result = await pullAllDataFromSupabase();
    if (!result.success) {
      console.error("Failed to load data:", result.error);
      return navigation.replace("Login");
    }

    setExpenses(result.expenses || []);
    setMonthlyBudget(result.budget || 0);
  };

  useEffect(() => {
    loadData();
    const unsubscribe = navigation.addListener("focus", loadData);
    return unsubscribe;
  }, [navigation]);

  const totalExpenses = expenses.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
  const remainingBalance = parseFloat(monthlyBudget || 0) - totalExpenses;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Current Monthly Budget: ₱{monthlyBudget}
      </Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseItem expense={item} onPress={() => navigation.navigate("EditExpense", { expense: item })} />
        )}
      />

      <View style={{ marginTop: 20, padding: 15, borderTopWidth: 1, borderColor: "#ccc" }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Total Expenses: ₱{totalExpenses.toFixed(2)}</Text>
        <Text style={{ fontSize: 16, fontWeight: "600", color: remainingBalance < 0 ? "red" : "green" }}>
          Remaining Balance: ₱{remainingBalance.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
