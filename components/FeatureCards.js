import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "../styles/HomeStyles";

export default function FeatureCards({ navigation }) {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("ExpenseList")}>
        <Ionicons name="list" size={30} color="#4CAF50" />
        <Text style={styles.cardText}>Expenses</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("AddExpense")}>
        <Ionicons name="add-circle-outline" size={30} color="#2196F3" />
        <Text style={styles.cardText}>Add Expense</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Savings")}>
        <FontAwesome5 name="piggy-bank" size={30} color="#9C27B0" />
        <Text style={styles.cardText}>Savings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Summary")}>
        <Ionicons name="stats-chart-outline" size={30} color="#FF9800" />
        <Text style={styles.cardText}>Summary</Text>
      </TouchableOpacity>
    </View>
  );
}
