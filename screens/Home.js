import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { getExpenses } from "../services/api";

export default function Home({ navigation }) {
  const tips = [
    "Save at least 20% of your income each month.",
    "Track your expenses daily to avoid overspending.",
    "Cook meals at home instead of eating out.",
    "Set a budget and stick to it.",
    "Avoid impulse buying—wait 24 hours before big purchases.",
    "Invest in needs, not wants.",
    "Automate your savings every payday.",
    "Cut down subscriptions you rarely use.",
    "Use cash for discretionary spending to limit overspending.",
    "Review your financial goals regularly.",
    "Plan your purchases during sales and discounts.",
    "Create an emergency fund covering 3-6 months of expenses.",
    "Use budgeting apps to monitor your finances.",
    "Avoid high-interest debt like credit cards.",
    "Set specific financial goals with deadlines.",
    "Negotiate bills and look for better deals on services.",
    "Limit dining out to once a week.",
    "Buy generic brands instead of name brands.",
    "Use public transportation to save on gas and parking.",
    "Sell unused items around your home for extra cash.",
  ];

  const [advice, setAdvice] = useState("");
  const [savingsProgress, setSavingsProgress] = useState(0.45); // Example progress
  const goalAmount = 10000; // Example goal
  const savedAmount = goalAmount * savingsProgress;
  const [topCategories, setTopCategories] = useState([]);

  useEffect(() => {
    async function loadExpenses() {
      const expenses = await getExpenses();
      const categoryTotals = {};

      expenses.forEach((e) => {
        categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
      });

      const sorted = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
      setTopCategories(sorted.slice(0, 3)); // Top 3
    }

    loadExpenses();
    setAdvice(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💸 Welcome to Kaching 💸</Text>
      <Text style={styles.subtitle}>Your personal budget and expense tracker</Text>

      {/* --- Card Grid --- */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("ExpenseList")}
        >
          <Ionicons name="list" size={32} color="#4CAF50" />
          <Text style={styles.cardText}>Expenses</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("AddExpense")}
        >
          <Ionicons name="add-circle-outline" size={32} color="#2196F3" />
          <Text style={styles.cardText}>Add Expense</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Summary")}
        >
          <Ionicons name="stats-chart-outline" size={32} color="#FF9800" />
          <Text style={styles.cardText}>Summary</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Savings")}
        >
          <FontAwesome5 name="piggy-bank" size={32} color="#9C27B0" />
          <Text style={styles.cardText}>Savings</Text>
        </TouchableOpacity>
      </View>

      {/* --- Savings Goal Progress --- */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Savings Goal Progress</Text>
        <Progress.Bar
          progress={savingsProgress}
          width={250}
          color="#9C27B0"
          borderRadius={10}
          height={15}
        />
        <Text style={styles.progressText}>
          ₱{savedAmount.toFixed(0)} / ₱{goalAmount}
        </Text>
      </View>

      {/* 🌟 Top Spending Categories */}
      {topCategories.length > 0 && (
        <View
          style={[
            styles.card,
            {
              marginTop: 20,
              backgroundColor: "#fff7e6",
              borderColor: "#f39c12",
              borderWidth: 2,
              borderRadius: 0,
              padding: 15,
              width: "100%",
            },
          ]}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#e67e22",
              marginBottom: 8,
            }}
          >
            🌟 Top Spending Categories
          </Text>
          {topCategories.map(([cat, amt], i) => (
            <Text key={cat} style={{ fontSize: 16, color: "#333" }}>
              {i + 1}. {cat}: ₱{amt.toFixed(2)}
            </Text>
          ))}
        </View>
      )}

      {/* --- Saving Advice --- */}
      <TouchableOpacity
        style={styles.tipBox}
        onPress={() =>
          setAdvice(tips[Math.floor(Math.random() * tips.length)])
        }
      >
        <Text style={styles.tipText}>💡 Tip: {advice}</Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#999",
            marginTop: 5,
          }}
        >
          (Tap for another tip)
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  card: {
    width: "47%",
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  progressContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  tipBox: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#f1f8e9",
    borderRadius: 10,
    width: "100%",
  },
  tipText: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    color: "#388e3c",
  },
});
