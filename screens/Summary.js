import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/SummaryStyles";

export default function Summary() {
  const [summary, setSummary] = useState({});
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const userEmail = await AsyncStorage.getItem("@logged_in_user");
      if (!userEmail) return;

      const storedExpenses = await AsyncStorage.getItem(`@${userEmail}_expenses`);
      const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];

      const grouped = {};
      expenses.forEach((e) => {
        grouped[e.category] = (grouped[e.category] || 0) + parseFloat(e.amount);
      });
      setSummary(grouped);

      const weekly = {};
      expenses.forEach((e) => {
        const date = new Date(e.date);
        const weekLabel = `${date.getMonth() + 1}/${date.getDate()}`;
        weekly[weekLabel] = (weekly[weekLabel] || 0) + parseFloat(e.amount);
      });
      setWeeklyData(
        Object.entries(weekly).map(([week, total]) => ({ week, total }))
      );

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];

  const topCategories = Object.entries(summary)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const othersTotal = Object.entries(summary)
    .sort((a, b) => b[1] - a[1])
    .slice(5)
    .reduce((acc, [_, val]) => acc + val, 0);

  const chartData = [
    ...topCategories.map(([name, val], i) => ({
      name,
      population: val,
      color: colors[i % colors.length],
      legendFontColor: "#333",
      legendFontSize: 14,
    })),
    othersTotal
      ? {
          name: "Others",
          population: othersTotal,
          color: "#ccc",
          legendFontColor: "#333",
          legendFontSize: 14,
        }
      : null,
  ].filter(Boolean);

  const total = Object.values(summary).reduce((acc, val) => acc + val, 0);

  if (loading) return <Text style={{ textAlign: "center", marginTop: 50 }}>Loading...</Text>;
  if (!Object.keys(summary).length) return <Text style={{ textAlign: "center", marginTop: 50 }}>No expenses yet.</Text>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      <Text style={styles.title}>Expense Summary</Text>

      {/* Weekly Spending Trend */}
      {weeklyData.length > 0 && (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={[styles.subtitle, { marginBottom: 10 }]}>Weekly Spending Trend</Text>
          <BarChart
            data={{
              labels: weeklyData.map((w) => w.week),
              datasets: [{ data: weeklyData.map((w) => w.total) }],
            }}
            width={Dimensions.get("window").width - 40}
            height={220}
            fromZero
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#e6f5ec",
              backgroundGradientTo: "#c8e6c9",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`,
              labelColor: () => "#333",
            }}
            style={{ borderRadius: 10 }}
          />
        </View>
      )}

      {/* Pie Chart */}
      {chartData.length > 0 && (
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <Text style={[styles.subtitle, { marginBottom: 10 }]}>Spending by Category</Text>
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
        </View>
      )}

      {/* Category Cards */}
      <View style={{ marginTop: 30 }}>
        {Object.keys(summary).map((cat) => (
          <View key={cat} style={[styles.card, { flexDirection: "row", justifyContent: "space-between" }]}>
            <Text style={styles.category}>{cat}</Text>
            <Text style={styles.amount}>₱{summary[cat].toFixed(2)}</Text>
          </View>
        ))}
      </View>

      {/* Total Expenses */}
      <View style={[styles.card, { marginTop: 20, backgroundColor: "#f0f8ff", flexDirection: "row", justifyContent: "space-between" }]}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#2e86de" }}>Total Expenses</Text>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#2e86de" }}>₱{total.toFixed(2)}</Text>
      </View>
    </ScrollView>
  );
}
