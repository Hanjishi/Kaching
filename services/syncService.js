import { supabase } from "../services/supabase";

export async function pushAllDataToSupabase({ profile, budget, savings, expenses }) {
  try {
    const { data: { session } = {} } = await supabase.auth.getSession();
    const user = session?.user;
    if (!user) throw new Error("No Supabase session. Log in first.");

    if (profile) {
      const { error: profileError } = await supabase
        .from("profiles_backup")
        .upsert({
          user_id: user.id,
          name: profile.name || null,
          email: profile.email || user.email,
          phone: profile.phone || null,
          currency: profile.currency || null,
          avatar: profile.avatar || null,
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" });

      if (profileError) throw new Error(`Profile upload failed: ${profileError.message}`);
      console.log("Profile saved successfully");
    }

    if (budget !== undefined && budget !== null) {
      const { error: budgetError } = await supabase
        .from("budgets_backup")
        .insert({
          user_id: user.id,
          amount: parseFloat(budget),
          backed_at: new Date().toISOString(),
        }, { onConflict: "user_id" });

      if (budgetError) throw new Error(`Budget upload failed: ${budgetError.message}`);
      console.log("Budget saved successfully");
    }

    if (savings) {
      const { balance, goal } = savings;
      const { error: savingsError } = await supabase
        .from("savings_backup")
        .upsert({
          user_id: user.id,
          balance: parseFloat(balance),
          goal: goal || null,
          backed_at: new Date().toISOString(),
        }, { onConflict: "user_id" });

      if (savingsError) throw new Error(`Savings upload failed: ${savingsError.message}`);
      console.log("Savings saved successfully");
    }

    if (Array.isArray(expenses) && expenses.length > 0) {
      const toInsert = expenses.map(e => ({
        user_id: user.id,
        title: e.title || e.description || "Expense",
        amount: Number(e.amount || 0),
        category: e.category || null,
        date: e.date || new Date().toISOString(),
        description: e.description || null,
        backed_at: new Date().toISOString(),
      })).filter(e => e.amount > 0);

      if (toInsert.length > 0) {
        const { error: expensesError } = await supabase
          .from("expenses_backup")
          .insert(toInsert);
        if (expensesError) throw new Error(`Expenses upload failed: ${expensesError.message}`);
        console.log("Expenses saved successfully");
      }
    }

    return { success: true };
  } catch (err) {
    console.error("pushAllDataToSupabase error:", err);
    return { success: false, error: err.message || err };
  }
}

export async function pullAllDataFromSupabase() {
  try {
    const { data: { session } = {} } = await supabase.auth.getSession();
    const user = session?.user;
    if (!user) throw new Error("No Supabase session. Log in first.");

    const email = user.email;

    const [profileData, budgetData, savingsData, expensesData] = await Promise.all([
      supabase.from("profiles_backup").select("*").eq("user_id", user.id).single(),
      supabase.from("budgets_backup").select("*").eq("user_id", user.id).single(),
      supabase.from("savings_backup").select("*").eq("user_id", user.id).single(),
      supabase.from("expenses_backup").select("*").eq("user_id", user.id),
    ]);

    return {
      success: true,
      profile: profileData.data || null,
      budget: budgetData.data?.amount || 0,
      savings: savingsData.data || { balance: 0, goal: null },
      expenses: expensesData.data || [],
    };
  } catch (err) {
    console.error("pullAllDataFromSupabase error:", err);
    return { success: false, error: err.message || err };
  }
}
