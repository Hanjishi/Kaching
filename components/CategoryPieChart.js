import React from "react";
import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import styles from "../styles/SummaryStyles";

export default function CategoryPieChart({ summary }) {
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
  ];

  const top = Object.entries(summary)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const others = Object.entries(summary)
    .slice(5)
    .reduce((acc, [, v]) => acc + v, 0);

  const chartData = [
    ...top.map(([name, val], i) => ({
      name,
      population: val,
      color: colors[i % colors.length],
      legendFontColor: "#333",
      legendFontSize: 14,
    })),
    others
      ? {
          name: "Others",
          population: others,
          color: "#ccc",
          legendFontColor: "#333",
          legendFontSize: 14,
        }
      : null,
  ].filter(Boolean);

  return (
    <View style={styles.chartBlock}>
      <Text style={styles.subtitle}>Spending by Category</Text>

      <PieChart
        data={chartData}
        width={Dimensions.get("window").width - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2,
          color: (o = 1) => `rgba(0, 0, 0, ${o})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}
