import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getExpenses } from "../services/api";
import styles from "../styles/Theme";

export default function Summary() {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    const expenses = await getExpenses();
    const grouped = {};
    expenses.forEach((e) => {
      grouped[e.category] = (grouped[e.category] || 0) + e.amount;
    });
    setSummary(grouped);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Summary</Text>
      {Object.keys(summary).map((cat) => (
        <Text key={cat} style={styles.category}>
          {cat}: ₱{summary[cat].toFixed(2)}
        </Text>
      ))}
    </View>
  );
}
