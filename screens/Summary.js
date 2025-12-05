import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { supabase } from "../services/supabase";
import styles from "../styles/SummaryStyles";
import WeeklyBarChart from "../components/WeeklyBarChart";
import CategoryPieChart from "../components/CategoryPieChart";
import CategoryList from "../components/CategoryList";

export default function Summary() {
  const [summary, setSummary] = useState({});
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      loadExpenses(user.id);
    } else {
      setLoading(false);
    }
  };

  const loadExpenses = async (userId) => {
    try {
      const { data: expenses, error } = await supabase
        .from("expenses_backup")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;

      if (!expenses || expenses.length === 0) {
        setSummary({});
        setWeeklyData([]);
        setLoading(false);
        return;
      }

      const categoryTotals = {};
      expenses.forEach((e) => {
        categoryTotals[e.category] =
          (categoryTotals[e.category] || 0) + parseFloat(e.amount);
      });
      setSummary(categoryTotals);

      const weekly = {};
      expenses.forEach((e) => {
        const d = new Date(e.date);
        const label = `${d.getMonth() + 1}/${d.getDate()}`;
        weekly[label] = (weekly[label] || 0) + parseFloat(e.amount);
      });

      const weeklyArr = Object.entries(weekly).map(([w, t]) => ({
        week: w,
        total: t,
      }));

      setWeeklyData(weeklyArr);
      setLoading(false);
    } catch (err) {
      console.error("Summary error:", err);
      setLoading(false);
    }
  };

  const total = Object.values(summary).reduce((a, b) => a + b, 0);

  if (loading)
    return <Text style={styles.loadingText}>Loading...</Text>;

  if (!Object.keys(summary).length)
    return <Text style={styles.loadingText}>No expenses yet.</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Expense Summary</Text>

      <WeeklyBarChart weeklyData={weeklyData} />
      <CategoryPieChart summary={summary} />
      <CategoryList summary={summary} />

      {/* TOTAL */}
      <View style={styles.totalCard}>
        <Text style={styles.totalText}>Total Expenses</Text>
        <Text style={styles.totalText}>₱{total.toFixed(2)}</Text>
      </View>
    </ScrollView>
  );
}
