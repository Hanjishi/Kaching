import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/Theme";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💸 Welcome to Kaching</Text>
      <Text style={styles.subtitle}>Your personal expense tracker</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ExpenseList")}
      >
        <Text style={styles.buttonText}>View Expenses</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddExpense")}
      >
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Summary")}
      >
        <Text style={styles.buttonText}>View Summary</Text>
      </TouchableOpacity>
    </View>
  );
}
