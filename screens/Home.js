import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { supabase } from "../services/supabase";
import NetInfo from "@react-native-community/netinfo";
import styles from "../styles/HomeStyles";
import { pushAllLocalDataToCloud } from "../services/syncService";
import ProfileHeader from "../components/ProfileHeader";
import BudgetInput from "../components/BudgetInput";
import FeatureCards from "../components/FeatureCards";
import TipBox from "../components/TipBox";
import SavingsProgress from "../components/SavingsProgress";

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
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [savingsBalance, setSavingsBalance] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [saveError, setSaveError] = useState(null);

  const loadData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return navigation.replace("Login");

      const uid = session.user.id;
      const email = session.user.email;

      setUserId(uid);
      setUserEmail(email);

      const { data: profileData, error: profileError } = await supabase
        .from("profiles_backup")
        .select("name, avatar")
        .eq("email", email)
        .maybeSingle();

      if (profileError) console.error("Profile fetch error:", profileError);
      else if (profileData) setProfile(profileData);

      const { data: savingsData, error: savingsError } = await supabase
        .from("savings_backup")
        .select("balance, goal")
        .eq("user_id", uid)
        .maybeSingle();
      if (savingsError) console.error("Savings fetch error:", savingsError);
      else {
        setSavingsBalance(savingsData?.balance || 0);
        setSavingsGoal(savingsData?.goal || null);
      }

      const { data: budgetData, error: budgetError } = await supabase
        .from("budgets_backup")
        .select("amount")
        .eq("user_id", uid)
        .maybeSingle();

      if (budgetError) console.error("Budget fetch error:", budgetError);
      else setMonthlyBudget(budgetData?.amount?.toString() || "0.00");
    } catch (err) {
      console.error("loadData error:", err);
    }
  };

  useEffect(() => {
    loadData();
    setAdvice(tips[Math.floor(Math.random() * tips.length)]);

    const unsubscribe = navigation.addListener("focus", loadData);
    return unsubscribe;
  }, [navigation]);

  const saveBudgetToSupabase = async (budgetAmount) => {
    if (!userId) {
      Alert.alert("Error", "User ID not found");
      return;
    }

    const parsedAmount = parseFloat(budgetAmount);
    if (isNaN(parsedAmount)) {
      Alert.alert("Error", "Invalid budget amount. Please enter a number.");
      return;
    }

    try {
      const { error } = await supabase
        .from("budgets_backup")
        .upsert(
          { user_id: userId, amount: parsedAmount },
          { onConflict: ["user_id"] }
        );

      if (error) {
        console.error("Budget save error:", error);
        Alert.alert("Error", "Failed to save budget");
        setSaveError(error.message);
      } else {
        setMonthlyBudget(parsedAmount.toString());
        setSaveError(null);
        Alert.alert("Success", "Budget updated successfully");
      }
    } catch (err) {
      console.error("saveBudgetToSupabase error:", err);
      Alert.alert("Error", "Failed to save budget");
      setSaveError(err.message);
    }
  };

  const handleBudgetChange = (newBudget) => {
    setMonthlyBudget(newBudget);
    saveBudgetToSupabase(newBudget);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.replace("Login");
  };

  const handleBackupNow = async () => {
    const net = await NetInfo.fetch();
    if (!net.isConnected) {
      return Alert.alert("No Internet", "Connect to internet to backup data.");
    }
    const res = await pushAllLocalDataToCloud();
    Alert.alert(res.success ? "Backup Complete" : "Backup Failed", res.error || "");
  };

  return (
    <View style={styles.container}>
      <ProfileHeader
        profile={profile}
        menuVisible={menuVisible}
        setMenuVisible={setMenuVisible}
        navigation={navigation}
        handleLogout={handleLogout}
        handleBackupNow={handleBackupNow}
      />

      <Text style={styles.title}>Kaching</Text>
      <Text style={styles.subtitle}>Smart Budget & Expense Tracker</Text>

      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Current Monthly Budget: ₱{monthlyBudget}
      </Text>

      <BudgetInput
        userEmail={userEmail}
        monthlyBudget={monthlyBudget}
        setMonthlyBudget={handleBudgetChange}
      />

      <FeatureCards navigation={navigation} />

      <SavingsProgress 
        savingsGoal={savingsGoal}
        savingsBalance={savingsBalance}
      />

      <TipBox advice={advice} setAdvice={setAdvice} tips={tips} />
    </View>
  );
}
