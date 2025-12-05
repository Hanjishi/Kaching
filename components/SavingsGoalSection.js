import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import * as Progress from "react-native-progress";
import styles from "../styles/SavingsStyles";

export default function SavingsGoalSection({
  savedGoal,
  goalName,
  setGoalName,
  goalAmount,
  setGoalAmount,
  saveGoal,
  resetGoal,
  balance,
}) {
  const goalProgress = savedGoal ? Math.min(balance / savedGoal.amount, 1) : 0;

  return (
    <View style={styles.goalCard}>
      <Text style={styles.goalTitle}>Set a Savings Goal</Text>
      {!savedGoal ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="What are you saving for?"
            value={goalName}
            onChangeText={setGoalName}
          />
          <TextInput
            style={styles.input}
            placeholder="Target amount (₱)"
            keyboardType="numeric"
            value={goalAmount}
            onChangeText={setGoalAmount}
          />
          <TouchableOpacity style={styles.goalButton} onPress={saveGoal}>
            <Text style={styles.goalButtonText}>Save Goal</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={{ alignItems:"center" }}>
          <Text style={styles.goalSavedText}>
            Goal: {savedGoal.name} (₱{savedGoal.amount.toFixed(2)})
          </Text>
          
          <Progress.Bar
            progress={goalProgress}
            width={250}
            color="#4caf50" 
            height={15}
            borderRadius={10}
            style={{ marginTop: 10 }}
          />
          
          <Text style={styles.goalPercentText}>
            {Math.round(goalProgress * 100)}% saved
          </Text>
          
          <TouchableOpacity
            style={styles.removeGoalButton}
            onPress={resetGoal}
          >
            <Text style={styles.removeGoalButtonText}>Remove Goal</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}