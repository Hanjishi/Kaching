import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getExpenses } from "../services/api";
import ExpenseItem from "../components/ExpenseItem";

export default function ExpenseList({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [monthlyBudget, setMonthlyBudget] = useState("0.00");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const email = await AsyncStorage.getItem("@logged_in_user");
      if (!email) return;
      setUserEmail(email);

      const savedBudget = await AsyncStorage.getItem(`@monthlyBudget_${email}`);
      if (savedBudget) setMonthlyBudget(savedBudget);

      const data = await getExpenses(email);
      setExpenses(data);
    };
    loadData();
  }, []);

  const totalExpenses = expenses.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
  const remainingBalance = parseFloat(monthlyBudget || 0) - totalExpenses;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Current Monthly Budget: ₱{monthlyBudget}
      </Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExpenseItem
            expense={item}
            onPress={() => navigation.navigate("EditExpense", { expense: item })}
          />
        )}
      />

      <View style={{ marginTop: 20, padding: 15, borderTopWidth: 1, borderColor: "#ccc" }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          Total Expenses: ₱{totalExpenses.toFixed(2)}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: remainingBalance < 0 ? "red" : "green",
          }}
        >
          Remaining Balance: ₱{remainingBalance.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
