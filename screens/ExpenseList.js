import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { getExpenses } from "../services/api";
import ExpenseItem from "../components/ExpenseItem";
import styles from "../styles/Theme";

export default function ExpenseList({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [monthlyBudget, setMonthlyBudget] = useState("10000.00");
  const [inputBudget, setInputBudget] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  // ✅ Filter expenses based on selected category
  const filteredExpenses =
    selectedCategory === "All"
      ? expenses
      : expenses.filter(
          (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  // Calculate totals
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

      {/* ✅ Category Filter Dropdown */}
      <View
        style={{
          borderWidth: 1,
          borderColor: "#2ecc71",
          borderRadius: 8,
          backgroundColor: "#f9fdf9",
          marginBottom: 15,
        }}
      >
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value)}
        >
          <Picker.Item label="All Categories" value="All" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Transport" value="Transport" />
          <Picker.Item label="Bills" value="Bills" />
          <Picker.Item label="Shopping" value="Shopping" />
          <Picker.Item label="Entertainment" value="Entertainment" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      {/* --- Expenses List --- */}
      <FlatList
        data={filteredExpenses}
        keyExtractor={(item, index) => index.toString()}
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
      <View
        style={{
          marginTop: 20,
          padding: 15,
          borderTopWidth: 1,
          borderColor: "#ccc",
        }}
      >
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
      </View>
    </View>
  );
}
