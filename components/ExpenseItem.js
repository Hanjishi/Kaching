import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/Theme";

export default function ExpenseItem({ expense, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(expense)}>
      <Text style={styles.amount}>₱{expense.amount.toFixed(2)}</Text>
      <Text style={styles.category}>{expense.category}</Text>

      {/* ✅ Show timestamp instead of manual date */}
      {expense.timestamp && (
        <Text style={styles.date}>Added on: {expense.timestamp}</Text>
      )}

      {expense.description ? (
        <Text style={styles.description}>{expense.description}</Text>
      ) : null}
    </TouchableOpacity>
  );
}
