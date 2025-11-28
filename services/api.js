import AsyncStorage from "@react-native-async-storage/async-storage";

// Expenses
export async function getExpenses(userEmail) {
  const data = await AsyncStorage.getItem(`@${userEmail}_expenses`);
  return data ? JSON.parse(data) : [];
}

export async function addExpense(userEmail, expense) {
  const current = await getExpenses(userEmail);
  const updated = [...current, expense];
  await AsyncStorage.setItem(`@${userEmail}_expenses`, JSON.stringify(updated));
}

export async function updateExpense(userEmail, updatedExpense) {
  const current = await getExpenses(userEmail);
  const updated = current.map(e => (e.id === updatedExpense.id ? updatedExpense : e));
  await AsyncStorage.setItem(`@${userEmail}_expenses`, JSON.stringify(updated));
}

export async function deleteExpense(userEmail, id) {
  const current = await getExpenses(userEmail);
  const updated = current.filter(e => e.id !== id);
  await AsyncStorage.setItem(`@${userEmail}_expenses`, JSON.stringify(updated));
}

// Savings
export async function getSavings(userEmail) {
  const balance = await AsyncStorage.getItem(`@${userEmail}_savingsBalance`);
  const goal = await AsyncStorage.getItem(`@${userEmail}_savingsGoal`);
  return {
    balance: balance ? parseFloat(balance) : 0,
    goal: goal ? JSON.parse(goal) : null
  };
}

export async function updateSavingsBalance(userEmail, balance) {
  await AsyncStorage.setItem(`@${userEmail}_savingsBalance`, balance.toString());
}

export async function updateSavingsGoal(userEmail, goal) {
  if (!goal) {
    await AsyncStorage.removeItem(`@${userEmail}_savingsGoal`);
  } else {
    await AsyncStorage.setItem(`@${userEmail}_savingsGoal`, JSON.stringify(goal));
  }
}
