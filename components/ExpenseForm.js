import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import styles from "../styles/Theme";
import { addExpense } from "../services/api";

export default function ExpenseForm({ navigation }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const categories = [
    "Food",
    "Transport",
    "Bills",
    "Shopping",
    "Entertainment",
    "Other",
  ];

  const handleSubmit = async () => {
    if (!amount || !category) {
      Alert.alert("Error", "Please enter both amount and category.");
      return;
    }

    const expense = {
      amount: parseFloat(amount),
      category,
      description: description.trim(),
      timestamp: new Date().toLocaleString(),
    };

    try {
      await addExpense(expense);
      Alert.alert("Success", "Expense saved successfully!");
      setAmount("");
      setCategory("");
      setDescription("");
      setShowCategories(false);
      if (navigation) navigation.goBack(); // ✅ navigate back after saving
    } catch (error) {
      console.error("Error saving expense:", error);
      Alert.alert("Error", "Failed to save expense.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <View style={styles.formContainer}>
        {/* Amount */}
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        {/* Category */}
        <Text style={styles.label}>Category</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#f0f0f0",
            borderRadius: 10,
            padding: 12,
            marginBottom: 10,
          }}
          onPress={() => setShowCategories(!showCategories)}
        >
          <Text style={{ fontSize: 16, color: "#333" }}>
            {category ? category : "Select Category"}
          </Text>
        </TouchableOpacity>

        {showCategories && (
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              elevation: 2,
              marginBottom: 10,
              paddingVertical: 5,
            }}
          >
            {categories.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  setCategory(item);
                  setShowCategories(false);
                }}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderBottomWidth: item === "Other" ? 0 : 1,
                  borderColor: "#ddd",
                }}
              >
                <Text style={{ fontSize: 16 }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description (optional)"
          value={description}
          onChangeText={setDescription}
        />

        {/* Reminder */}
        <View
          style={{
            backgroundColor: "#E8F5E9",
            borderLeftWidth: 5,
            borderLeftColor: "#4CAF50",
            padding: 10,
            marginVertical: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#2E7D32", fontSize: 14 }}>
            💡 Reminder: Ask yourself — is this a{" "}
            <Text style={{ fontWeight: "bold" }}>need</Text> or a{" "}
            <Text style={{ fontWeight: "bold" }}>want</Text>?
          </Text>
        </View>

        {/* Save Button */}
        <View style={{ marginTop: 10 }}>
          <Button title="Save Expense" onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  );
}
