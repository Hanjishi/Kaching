import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "savingsBalance"; // <- separate from monthlyBudget

export default function Savings() {
  const [balance, setBalance] = useState(0);
  const [isAdding, setIsAdding] = useState(true); // true = add, false = deduct
  const amounts = [1, 5, 10, 20, 50, 100, 1000];

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        setBalance(saved ? parseFloat(saved) : 0);
      } catch (err) {
        console.log("load savings error", err);
      }
    })();
  }, []);

  const handlePress = async (amount) => {
    try {
      const newBalance = isAdding ? balance + amount : balance - amount;
      setBalance(newBalance);
      await AsyncStorage.setItem(STORAGE_KEY, newBalance.toString());
    } catch (err) {
      console.log("save savings error", err);
    }
  };

  const confirmReset = () =>
    Alert.alert(
      "Reset saved balance",
      "Are you sure you want to reset the saved balance to 0?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            try {
              setBalance(0);
              await AsyncStorage.setItem(STORAGE_KEY, "0");
            } catch (err) {
              console.log("reset error", err);
            }
          },
        },
      ]
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Balance: ₱{balance.toFixed(2)}</Text>

      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Deduct</Text>
        <Switch value={isAdding} onValueChange={setIsAdding} />
        <Text style={styles.toggleLabel}>Add</Text>
      </View>

      <View style={styles.grid}>
        {amounts.map((amt) => (
          <TouchableOpacity
            key={amt}
            style={styles.button}
            onPress={() => handlePress(amt)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>₱{amt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={confirmReset}>
        <Text style={styles.resetText}>Reset Saved Balance</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  toggleLabel: { fontSize: 16, marginHorizontal: 10 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 14,
    margin: 8,
    borderRadius: 10,
    width: 90,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "600" },
  resetButton: {
    marginTop: 28,
    backgroundColor: "#e53935",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  resetText: { color: "white", fontWeight: "700" },
});
