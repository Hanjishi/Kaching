import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { getExpenses } from "../services/api";

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
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate("Profile");
            }}
          >
            <Ionicons name="person-outline" size={18} color="#555" />
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate("Settings");
            }}
          >
            <Ionicons name="settings-outline" size={18} color="#555" />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate("About");
            }}
          >
            <Ionicons
              name="information-circle-outline"
              size={18}
              color="#555"
            />
            <Text style={styles.menuText}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} 
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate("Login");
            }}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#fdfdfd",
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-between",
    marginTop: 0,
    marginBottom: 15,
    padding: 10,
  },
  profileLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#9C27B0",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  menuDropdown: {
    position: "absolute",
    top: 85,
    right: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingVertical: 8,
    width: 150,
    zIndex: 999,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#333",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#9C27B0",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 25,
  },
  card: {
    width: "47%",
    backgroundColor: "#f5f5f5",
    paddingVertical: 25,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
  },
  cardText: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "600",
  },
  progressContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  tipBox: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#f1f8e9",
    borderRadius: 10,
    width: "100%",
  },
  tipText: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    color: "#388e3c",
  },
  tipHint: {
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
});
