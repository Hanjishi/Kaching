import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";
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

  // 🎨 Colors for chart
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
  ];

  // 📊 Chart data
  const chartData = Object.keys(summary).map((category, index) => ({
    name: category,
    population: summary[category],
    color: colors[index % colors.length] || "#888888",
    legendFontColor: "#333",
    legendFontSize: 14,
  }));

  // 🧮 Compute total expenses
  const total = Object.values(summary).reduce((acc, val) => acc + val, 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Expense Summary</Text>

      {/* 📝 Per category summary (as cards) */}
      {Object.keys(summary).map((cat) => (
        <View key={cat} style={styles.card}>
          <Text style={styles.category}>{cat}</Text>
          <Text style={styles.amount}>₱{summary[cat].toFixed(2)}</Text>
        </View>
      ))}

      {/* 📊 Pie chart */}
      {chartData.length > 0 && (
        <PieChart
          data={chartData}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      )}

      {/* 🧾 Total expenses (as a card) */}
      <View style={[styles.card, { marginTop: 20, backgroundColor: "#f0f8ff" }]}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#2e86de" }}>
          Total Expenses: ₱{total.toFixed(2)}
        </Text>
      </View>
    </ScrollView>
  );
}
