import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExpenseItem from "../components/ExpenseItem";
import { getExpenses } from "../services/api";
import styles from "../styles/Theme";

export default function ExpenseList({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [monthlyBudget, setMonthlyBudget] = useState("10000.00");
  const [inputBudget, setInputBudget] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    loadBudget();
    fetchExpenses();
  }, []);

  const loadBudget = async () => {
    const savedBudget = await AsyncStorage.getItem("monthlyBudget");
    if (savedBudget) setMonthlyBudget(savedBudget);
  };

  const fetchExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  const handleSaveBudget = async () => {
    if (!inputBudget) {
      Alert.alert("Error", "Please enter a budget.");
      return;
    }
    setMonthlyBudget(inputBudget);
    await AsyncStorage.setItem("monthlyBudget", inputBudget);
    setInputBudget("");
  };

  // ✅ Filter by category
  const categories = ["All", "Food", "Transport", "Bills", "Shopping", "Entertainment", "Other"];
  const filteredExpenses =
    selectedCategory === "All"
      ? expenses
      : expenses.filter(
          (item) =>
            item.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  const totalExpenses = filteredExpenses.reduce(
    (sum, item) => sum + parseFloat(item.amount || 0),
    0
  );
  const remainingBalance = parseFloat(monthlyBudget) - totalExpenses;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* --- Budget Display --- */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Current Monthly Budget: ₱{monthlyBudget}
      </Text>

      {/* --- Budget Input --- */}
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <TextInput
          style={{
            borderWidth: 1,
            flex: 1,
            marginRight: 10,
            padding: 8,
            borderRadius: 5,
          }}
          placeholder="Enter new budget"
          keyboardType="numeric"
          value={inputBudget}
          onChangeText={setInputBudget}
        />
        <Button title="Save" onPress={handleSaveBudget} />
      </View>

      {/* ✅ Categories shown in one click */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 10 }}>
        {categories.map((cat) => (
          <Button
            key={cat}
            title={cat}
            color={selectedCategory === cat ? "#2ecc71" : "#aaa"}
            onPress={() => setSelectedCategory(cat)}
          />
        ))}
      </View>

      {/* --- Expenses List --- */}
      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseItem
            expense={item}
            onPress={() => navigation.navigate("EditExpense", { expense: item })}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#555", marginTop: 20 }}>
            No expenses found for this category.
          </Text>
        }
      />

      {/* --- Summary Section --- */}
      <View style={{ marginTop: 20, padding: 15, borderTopWidth: 1, borderColor: "#ccc" }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          Total ({selectedCategory}): ₱{totalExpenses.toFixed(2)}
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
        <Text style={{ marginTop: 10, color: "#888" }}>
          💡 Reminder: Spend on **needs** first before **wants**!
        </Text>
      </View>
    </View>
  );
}
