import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { getExpenses } from "../services/api";
import styles from "../styles/HomeStyles";

export default function Home({ navigation }) {
  const tips = [
    "Save at least 20% of your income each month.",
    "Track your expenses daily to avoid overspending.",
    "Cook meals at home instead of eating out.",
    "Set a budget and stick to it.",
    "Avoid impulse buying—wait 24 hours before big purchases.",
    "Automate your savings every payday.",
    "Use cash for discretionary spending to limit overspending.",
    "Review your financial goals regularly.",
    "Cut down subscriptions you rarely use.",
    "Create an emergency fund covering 3–6 months of expenses.",
  ];

  const [advice, setAdvice] = useState("");
  const [savingsProgress, setSavingsProgress] = useState(0.45);
  const [menuVisible, setMenuVisible] = useState(false);
  const goalAmount = 10000;
  const savedAmount = goalAmount * savingsProgress;

  useEffect(() => {
    setAdvice(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  return (
    <View style={styles.container}>
      {/* 👤 Profile Section */}
      <View style={styles.profileContainer}>
        <View style={styles.profileLeft}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>HANJI</Text>
        </View>

        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Ionicons name="menu" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      {menuVisible && (
        <View style={styles.menuDropdown}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="person-outline" size={18} color="#555" />
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={18} color="#555" />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="information-circle-outline" size={18} color="#555" />
            <Text style={styles.menuText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="log-out-outline" size={18} color="#555" />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 💸 App Title */}
      <Text style={styles.title}>Kaching</Text>
      <Text style={styles.subtitle}>Smart Budget & Expense Tracker</Text>

      {/* --- Feature Cards --- */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("ExpenseList")}
        >
          <Ionicons name="list" size={30} color="#4CAF50" />
          <Text style={styles.cardText}>Expenses</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("AddExpense")}
        >
          <Ionicons name="add-circle-outline" size={30} color="#2196F3" />
          <Text style={styles.cardText}>Add Expense</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Savings")}
        >
          <FontAwesome5 name="piggy-bank" size={30} color="#9C27B0" />
          <Text style={styles.cardText}>Savings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Summary")}
        >
          <Ionicons name="stats-chart-outline" size={30} color="#FF9800" />
          <Text style={styles.cardText}>Summary</Text>
        </TouchableOpacity>
      </View>

      {/* 💰 Savings Progress */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Savings Goal</Text>
        <Progress.Bar
          progress={savingsProgress}
          width={250}
          color="#9C27B0"
          borderRadius={10}
          height={15}
        />
        <Text style={styles.progressText}>
          ₱{savedAmount.toFixed(0)} / ₱{goalAmount}
        </Text>
      </View>

      {/* 💡 Financial Tip */}
      <TouchableOpacity
        style={styles.tipBox}
        onPress={() =>
          setAdvice(tips[Math.floor(Math.random() * tips.length)])
        }
      >
        <Text style={styles.tipText}>💡 Tip: {advice}</Text>
        <Text style={styles.tipHint}>(Tap for another tip)</Text>
      </TouchableOpacity>
    </View>
  );
}
