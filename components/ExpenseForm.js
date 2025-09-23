import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import styles from "../styles/Theme";

export default function ExpenseForm({ onSubmit, initialValues }) {
  const [amount, setAmount] = useState(initialValues?.amount?.toString() || "");
  const [category, setCategory] = useState(initialValues?.category || "");
  const [date, setDate] = useState(initialValues?.date || "");
  const [description, setDescription] = useState(initialValues?.description || "");

  const handleSubmit = () => {
    if (!amount || !category || !date) return;
    onSubmit({
      amount: parseFloat(amount),
      category: category.trim().toLowerCase(),
      date,
      description,
    });
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Save Expense" onPress={handleSubmit} />
    </View>
  );
}
