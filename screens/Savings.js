import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { supabase } from "../services/supabase";
import styles from "../styles/SavingsStyles";
import * as Progress from "react-native-progress";

import AmountButtons from "../components/AmountButtons";
import BalanceResetButton from "../components/BalanceResetButton";
import SavingsGoalSection from "../components/SavingsGoalSection";

const upsertSavings = async (uid, balance, goal) => {
    if (!uid) return;
    try {
        await supabase.from("savings_backup").upsert(
            { user_id: uid, balance: balance, goal: goal || null },
            { onConflict: ["user_id"] }
        );
    } catch (err) {
        console.error("Supabase upsert failed:", err);
        Alert.alert("Error", "Failed to update data.");
    }
};

export default function Savings() {
  const [uid, setUid] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isAdding, setIsAdding] = useState(true);
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [savedGoal, setSavedGoal] = useState(null);

  const amounts = [1, 5, 10, 20, 50, 100, 1000];

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return;

        const user = session.user;
        setUid(user.id);

        const { data: savings, error } = await supabase
          .from("savings_backup")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching savings:", error);
          return;
        }

        if (savings) {
          setBalance(savings.balance || 0);
          setSavedGoal(savings.goal || null);
        } else {

          await upsertSavings(user.id, 0, null);
        }
      } catch (err) {
        console.error("Init savings error:", err);
      }
    };
    init();
  }, []);

  const updateBalance = async (newBalance) => {
    setBalance(newBalance);
    await upsertSavings(uid, newBalance, savedGoal);
  };

  const handlePress = async (amount) => {
    if (!uid) return;

    const newBalance = isAdding ? balance + amount : Math.max(0, balance - amount);
    setBalance(newBalance);
    await upsertSavings(uid, newBalance, savedGoal);
  };

  const confirmReset = () => Alert.alert(
    "Reset Balance",
    "Reset saved balance to 0?",
    [
      { text: "Cancel", style: "cancel" },
      { text: "Reset", style: "destructive", onPress: () => updateBalance(0) }
    ]
  );

  const saveGoal = async () => {
    if (!goalName.trim() || !goalAmount || isNaN(goalAmount) || parseFloat(goalAmount) <= 0) {
      Alert.alert("Invalid input", "Please enter a valid goal and amount.");
      return;
    }

    const goalData = { name: goalName, amount: parseFloat(goalAmount) };
    setSavedGoal(goalData);
    await upsertSavings(uid, balance, goalData);

    setGoalName("");
    setGoalAmount("");
    Alert.alert("Success", "Savings goal saved!");
  };

  const resetGoal = async () => {
    setSavedGoal(null);
    await upsertSavings(uid, balance, null);
    Alert.alert("Goal removed!");
  };

  return (
    <View style={styles.container}>

      <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Saved Balance:</Text>
          <Text style={styles.balanceAmount}>₱{balance.toFixed(2)}</Text>
      </View>

      <AmountButtons
        amounts={amounts}
        isAdding={isAdding}
        setIsAdding={setIsAdding}
        handlePress={handlePress}
      />

      <BalanceResetButton confirmReset={confirmReset} />

      <SavingsGoalSection
        savedGoal={savedGoal}
        goalName={goalName}
        setGoalName={setGoalName}
        goalAmount={goalAmount}
        setGoalAmount={setGoalAmount}
        saveGoal={saveGoal}
        resetGoal={resetGoal}
        balance={balance}
      />
    </View>
  );
}