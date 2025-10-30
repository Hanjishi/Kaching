import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "../styles/Theme";

export default function ExpenseForm({ onSubmit }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const categories = ["Food", "Transport", "Bills", "Shopping", "Entertainment", "Other"];

  const handleSubmit = () => {
    if (!amount || !category) return;
    const timestamp = new Date().toLocaleString();

    onSubmit({
      amount: parseFloat(amount),
      category: category.trim().toLowerCase(),
      description,
      timestamp,
    });

    setAmount("");
    setCategory("");
    setDescription("");
  };

  return (
    <View style={[styles.form, { paddingVertical: 20 }]}>
      {/* --- Amount --- */}
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      {/* --- Category Section --- */}
      <Text style={styles.label}>Category</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setShowCategories(!showCategories)}
        style={{
          borderWidth: 1,
          borderColor: "#2ecc71",
          borderRadius: 10,
          paddingVertical: 14,
          paddingHorizontal: 14,
          backgroundColor: "#f9fff9",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: category ? "#2c3e50" : "#999",
          }}
        >
          {category ? category : "Select Category"}
        </Text>
      </TouchableOpacity>

      {/* ✅ Category options shown immediately below when clicked */}
      {showCategories && (
        <View
          style={{
            marginTop: 8,
            backgroundColor: "#fff",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#2ecc71",
            overflow: "hidden",
          }}
        >
          <FlatList
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setCategory(item);
                  setShowCategories(false);
                }}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderBottomWidth: item !== "Other" ? 1 : 0,
                  borderColor: "#eee",
                }}
              >
                <Text style={{ fontSize: 16, color: "#2c3e50" }}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* --- Description --- */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description (optional)"
        value={description}
        onChangeText={setDescription}
      />

      {/* --- Save Expense --- */}
      <TouchableOpacity
        style={{
          backgroundColor: "#2ecc71",
          paddingVertical: 14,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 10,
        }}
        onPress={handleSubmit}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          Save Expense
        </Text>
      </TouchableOpacity>
    </View>
  );
}
