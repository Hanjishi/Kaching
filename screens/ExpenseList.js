import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getExpenses } from "../services/api";
import ExpenseItem from "../components/ExpenseItem";
import styles from "../styles/Theme";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [monthlyBudget, setMonthlyBudget] = useState("10000.00");
  const [inputBudget, setInputBudget] = useState("");

  useEffect(() => {
    const loadBudget = async () => {
      const savedBudget = await AsyncStorage.getItem("monthlyBudget");
      if (savedBudget) {
        setMonthlyBudget(savedBudget);
      }
    };
    loadBudget();
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error(error);
    }
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

  // Calculate total expenses
  const totalExpenses = expenses.reduce(
    (sum, item) => sum + parseFloat(item.amount || 0),
    0
  );

  // Remaining balance
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

      {/* --- Expenses List --- */}
      <FlatList
        data={expenses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ExpenseItem expense={item} />}
      />

      {/* --- Summary Section --- */}
      <View
        style={{
          marginTop: 20,
          padding: 15,
          borderTopWidth: 1,
          borderColor: "#ccc",
        }}
      >
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
