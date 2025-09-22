import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { getExpenses } from "../services/api";
import ExpenseItem from "../components/ExpenseItem";
import styles from "../styles/Theme";

export default function ExpenseList({ navigation }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Expenses</Text>
      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <ExpenseItem
            expense={item}
            onPress={(expense) => navigation.navigate("EditExpense", { expense })}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Add Expense" onPress={() => navigation.navigate("AddExpense")} />
      <Button title="View Summary" onPress={() => navigation.navigate("Summary")} />
    </View>
  );
}
