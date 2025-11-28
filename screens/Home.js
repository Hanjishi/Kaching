import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

  const [profile, setProfile] = useState({});
  const [advice, setAdvice] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [monthlyBudget, setMonthlyBudget] = useState("0.00");
  const [expenses, setExpenses] = useState([]);
  const [inputBudget, setInputBudget] = useState("");
  const [savingsBalance, setSavingsBalance] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadData = async () => {
    try {
      const currentUserEmail = await AsyncStorage.getItem("@logged_in_user");
      if (!currentUserEmail) return;

      setUserEmail(currentUserEmail);

      const savedProfile = await AsyncStorage.getItem(`@user_${currentUserEmail}_profile`);
      if (savedProfile) setProfile(JSON.parse(savedProfile));

      const savedBudget = await AsyncStorage.getItem(`@monthlyBudget_${currentUserEmail}`);
      if (savedBudget) setMonthlyBudget(savedBudget);

      const savedBalance = await AsyncStorage.getItem(`@${currentUserEmail}_savingsBalance`);
      setSavingsBalance(savedBalance ? parseFloat(savedBalance) : 0);

      const goalData = await AsyncStorage.getItem(`@${currentUserEmail}_savingsGoal`);
      if (goalData) setSavingsGoal(JSON.parse(goalData));

      fetchExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
    const unsubscribe = navigation.addListener("focus", () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  const handleSaveBudget = async () => {
    if (!inputBudget) {
      Alert.alert("Error", "Please enter a budget.");
      return;
    }
    setMonthlyBudget(inputBudget);
    if (userEmail) {
      await AsyncStorage.setItem(`@monthlyBudget_${userEmail}`, inputBudget);
    }
    setInputBudget("");
  };

  useEffect(() => {
    setAdvice(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  const goalProgress =
    savingsGoal && savingsGoal.amount > 0
      ? Math.min(savingsBalance / savingsGoal.amount, 1)
      : 0;

  return (
    <View style={styles.container}>
      {/* Profile */}
      <View style={styles.profileContainer}>
        <View style={styles.profileLeft}>
          <Image
            source={{
              uri:
                profile.avatar && profile.avatar.length > 0
                  ? profile.avatar
                  : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{profile.name || "User"}</Text>
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

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate("Settings");
            }}
          >
            <Ionicons name="settings-outline" size={18} color="#555" />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate("About");
            }}
          >
            <Ionicons name="information-circle-outline" size={18} color="#555" />
            <Text style={styles.menuText}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={async () => {
              setMenuVisible(false);
              await AsyncStorage.removeItem("@logged_in_user");
              navigation.replace("Login");
            }}
          >
            <Ionicons name="log-out-outline" size={18} color="#555" />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.title}>Kaching</Text>
      <Text style={styles.subtitle}>Smart Budget & Expense Tracker</Text>

      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Current Monthly Budget: ₱{monthlyBudget}
      </Text>

      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <TextInput
          style={{ borderWidth: 1, flex: 1, marginRight: 10, padding: 8, borderRadius: 5 }}
          placeholder="Enter new budget"
          keyboardType="numeric"
          value={inputBudget}
          onChangeText={setInputBudget}
        />
        <Button title="Save" onPress={handleSaveBudget} />
      </View>

      {/* Feature Cards */}
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("ExpenseList")}>
          <Ionicons name="list" size={30} color="#4CAF50" />
          <Text style={styles.cardText}>Expenses</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("AddExpense")}>
          <Ionicons name="add-circle-outline" size={30} color="#2196F3" />
          <Text style={styles.cardText}>Add Expense</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Savings")}>
          <FontAwesome5 name="piggy-bank" size={30} color="#9C27B0" />
          <Text style={styles.cardText}>Savings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Summary")}>
          <Ionicons name="stats-chart-outline" size={30} color="#FF9800" />
          <Text style={styles.cardText}>Summary</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Savings Goal</Text>
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
            <Text style={styles.progressText}>
              ₱{savingsBalance.toFixed(2)} / ₱{savingsGoal.amount.toFixed(2)} ({Math.round(goalProgress * 100)}%)
            </Text>
          </>
        ) : (
          <Text style={styles.progressText}>No savings goal set yet</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.tipBox}
        onPress={() => setAdvice(tips[Math.floor(Math.random() * tips.length)])}
      >
        <Text style={styles.tipText}>💡 Tip: {advice}</Text>
        <Text style={styles.tipHint}>(Tap for another tip)</Text>
      </TouchableOpacity>
    </View>
  );
}
