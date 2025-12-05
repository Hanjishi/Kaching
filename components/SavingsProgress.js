import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

export default function SavingsProgress({ savingsGoal, savingsBalance }) {
  const goalProgress = savingsGoal ? savingsBalance / savingsGoal.amount : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Savings Goal</Text>
      {savingsGoal ? (
        <>
          <Progress.Bar
            progress={goalProgress}
            width={250}
            color="#9C27B0"
            borderRadius={10}
            height={15}
            animated
          />
          <Text style={styles.text}>
            ₱{savingsBalance.toFixed(2)} / ₱{savingsGoal.amount.toFixed(2)} ({Math.round(goalProgress * 100)}%)
          </Text>
        </>
      ) : (
        <Text style={styles.text}>No savings goal set yet</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginVertical: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  text: { fontSize: 14, marginTop: 6 },
});
