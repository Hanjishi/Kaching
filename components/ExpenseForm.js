import React, { useState } from "react";
import { View, TextInput, Button, TouchableOpacity, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/Theme";

export default function ExpenseForm({ onSubmit, initialValues }) {
  const [amount, setAmount] = useState(initialValues?.amount?.toString() || "");
  const [category, setCategory] = useState(initialValues?.category || "Other");
  const [date, setDate] = useState(
    initialValues?.date ? new Date(initialValues.date) : new Date()
  );
  const [description, setDescription] = useState(initialValues?.description || "");
  const [showPicker, setShowPicker] = useState(false);

  const handleSubmit = () => {
    onSubmit({
      amount: parseFloat(amount),
      category: category.trim().toLowerCase(),
      date: date.toISOString().split("T")[0],
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

      {/* Category Dropdown */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(value) => setCategory(value)}
          style={styles.picker}
        >
          <Picker.Item label="Transportation" value="Transportation" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Utilities" value="Utilities" />
          <Picker.Item label="Shopping" value="Shopping" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      {/* Date Picker Input */}
      <TouchableOpacity
        style={[styles.input, { justifyContent: "center" }]}
        onPress={() => setShowPicker(true)}
      >
        <Text>{date.toISOString().split("T")[0]}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

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
