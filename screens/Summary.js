import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit";
import { getExpenses } from "../services/api";
import styles from "../styles/Theme";

export default function Summary() {
  const [summary, setSummary] = useState({});
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    const expenses = await getExpenses();

    // 🧮 Group by category
    const grouped = {};
    expenses.forEach((e) => {
      grouped[e.category] = (grouped[e.category] || 0) + e.amount;
    });
    setSummary(grouped);

    // 📅 Group by week (for bar chart)
    const weekly = {};
    expenses.forEach((e) => {
      const date = new Date(e.date);
      const week = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;
      weekly[week] = (weekly[week] || 0) + e.amount;
    });
    setWeeklyData(
      Object.entries(weekly).map(([week, total]) => ({ week, total }))
    );
  };

  // 🎨 Chart colors
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
  ];

  // 📊 Pie chart data
  const chartData = Object.keys(summary).map((category, index) => ({
    name: category,
    population: summary[category],
    color: colors[index % colors.length],
    legendFontColor: "#333",
    legendFontSize: 14,
  }));

  // 🧾 Total
  const total = Object.values(summary).reduce((acc, val) => acc + val, 0);

  // 🌟 Find top 3 spending categories
  const topCategories = Object.entries(summary)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Expense Summary</Text>
      {/* 📅 Weekly Spending Trend */}
      {weeklyData.length > 0 && (
        <View style={{ marginTop: 25 }}>
          <Text style={[styles.subtitle, { textAlign: "center" }]}>
            Weekly Spending Trend
          </Text>
          <BarChart
            data={{
              labels: weeklyData.map((w) => w.week),
              datasets: [{ data: weeklyData.map((w) => w.total) }],
            }}
            width={Dimensions.get("window").width - 40}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#e6f5ec",
              backgroundGradientTo: "#c8e6c9",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`,
              labelColor: () => "#333",
            }}
            style={{
              marginVertical: 10,
              borderRadius: 10,
              alignSelf: "center",
            }}
          />
        </View>
      )}
      
      {/* 🌟 Top Spending Categories */}
      {topCategories.length > 0 && (
        <View
          style={[
            styles.card,
            {
              marginTop: 20,
              backgroundColor: "#fff7e6",
              borderLeftWidth: 6,
              borderLeftColor: "#f39c12",
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

      {/* 🧮 Category cards */}
      {Object.keys(summary).map((cat) => (
        <View key={cat} style={styles.card}>
          <Text style={styles.category}>{cat}</Text>
          <Text style={styles.amount}>₱{summary[cat].toFixed(2)}</Text>
        </View>
      ))}

      {/* 📊 Pie Chart */}
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

      {/* 🧾 Total */}
      <View style={[styles.card, { marginTop: 20, backgroundColor: "#f0f8ff" }]}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#2e86de" }}>
          Total Expenses: ₱{total.toFixed(2)}
        </Text>
      </View>
    </ScrollView>
  );
}
