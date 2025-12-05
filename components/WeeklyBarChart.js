import React from "react";
import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import styles from "../styles/SummaryStyles";

export default function WeeklyBarChart({ weeklyData }) {
  if (!weeklyData.length) return null;

  return (
    <View style={styles.chartBlock}>
      <Text style={styles.subtitle}>Weekly Spending Trend</Text>

      <BarChart
        data={{
          labels: weeklyData.map((w) => w.week),
          datasets: [{ data: weeklyData.map((w) => w.total) }],
        }}
        width={Dimensions.get("window").width - 40}
        height={220}
        fromZero
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#e6f5ec",
          backgroundGradientTo: "#c8e6c9",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`,
          labelColor: () => "#333",
        }}
        style={styles.chart}
      />
    </View>
  );
}
