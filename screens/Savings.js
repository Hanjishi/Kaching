import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Switch, Alert, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Progress from "react-native-progress"; 
import styles from "../styles/Theme";

export default function Savings() {
  const [balance, setBalance] = useState(0);
  const [isAdding, setIsAdding] = useState(true);
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [savedGoal, setSavedGoal] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  const amounts = [1, 5, 10, 20, 50, 100, 1000];

  useEffect(() => {
    const loadData = async () => {
      const email = await AsyncStorage.getItem("@logged_in_user");
      if (!email) return;
      setUserEmail(email);

      const savedBalance = await AsyncStorage.getItem(`@${email}_savingsBalance`);
      setBalance(savedBalance ? parseFloat(savedBalance) : 0);

      const goalData = await AsyncStorage.getItem(`@${email}_savingsGoal`);
      if (goalData) setSavedGoal(JSON.parse(goalData));
    };
    loadData();
  }, []);

  const handlePress = async (amount) => {
    if (!userEmail) return;
    let newBalance = isAdding ? balance + amount : balance - amount;
    if (newBalance < 0) newBalance = 0;
    setBalance(newBalance);
    await AsyncStorage.setItem(`@${userEmail}_savingsBalance`, newBalance.toString());
  };

  const confirmReset = () => 
    Alert.alert("Reset Balance", "Reset saved balance to 0?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reset",
        style: "destructive",
        onPress: async () => {
          if (!userEmail) return;
          setBalance(0);
          await AsyncStorage.setItem(`@${userEmail}_savingsBalance`, "0");
        },
      },
    ]);

  const saveGoal = async () => {
    if (!goalName.trim() || !goalAmount || isNaN(goalAmount) || parseFloat(goalAmount) <= 0 || !userEmail) {
      Alert.alert("Invalid input", "Please enter a valid goal and amount.");
      return;
    }
    const goalData = { name: goalName, amount: parseFloat(goalAmount) };
    await AsyncStorage.setItem(`@${userEmail}_savingsGoal`, JSON.stringify(goalData));
    setSavedGoal(goalData);
    setGoalName("");
    setGoalAmount("");
  };

  const resetGoal = async () => {
    if (!userEmail) return;
    Alert.alert("Remove Goal", "Do you want to remove this goal?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem(`@${userEmail}_savingsGoal`);
          setSavedGoal(null);
        },
      },
    ]);
  };

  const goalProgress =
    savedGoal && savedGoal.amount > 0
      ? Math.min(balance / savedGoal.amount, 1)
      : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Balance: ₱{balance.toFixed(2)}</Text>

      {/* Add / Deduct toggle */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 18 }}>
        <Text style={{ fontSize: 16, marginHorizontal: 10, color: "#006400" }}>Deduct</Text>
        <Switch value={isAdding} onValueChange={setIsAdding} />
        <Text style={{ fontSize: 16, marginHorizontal: 10, color: "#006400" }}>Add</Text>
      </View>

      {/* Quick Add Buttons */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {amounts.map((amt) => (
          <TouchableOpacity
            key={amt}
            style={[styles.button, { width: 90, margin: 8 }]}
            onPress={() => handlePress(amt)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>₱{amt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#e53935", marginTop: 28 }]}
        onPress={confirmReset}
      >
        <Text style={styles.buttonText}>Reset Saved Balance</Text>
      </TouchableOpacity>

      {/* Goal Section */}
      <View style={[styles.card, { marginTop: 40 }]}>
        <Text style={styles.subtitle}>Set a Savings Goal</Text>

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
            <TouchableOpacity style={styles.button} onPress={saveGoal}>
              <Text style={styles.buttonText}>Save Goal</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text style={styles.category}>
              Goal: {savedGoal.name} (₱{savedGoal.amount.toFixed(2)})
            </Text>
            <Progress.Bar
              progress={goalProgress}
              width={250}
              color="#2ecc71"
              height={15}
              borderRadius={10}
              style={{ marginTop: 10 }}
            />
            <Text style={styles.date}>{Math.round(goalProgress * 100)}% saved</Text>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#ff7043", marginTop: 14 }]}
              onPress={resetGoal}
            >
              <Text style={styles.buttonText}>Remove Goal</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
