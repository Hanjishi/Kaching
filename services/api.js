import Expense from "../models/Expense";

// 🧾 Local dummy data
let dummyExpenses = [
  new Expense(1, 235, "Food", "2025-09-21", "Lunch at cafe"),
  new Expense(2, 120, "Transportation", "2025-09-20", "Grab ride"),
  new Expense(3, 80, "Shopping", "2025-09-19", "T-shirt"),
  new Expense(4, 1600, "Utilities", "2025-09-25", "Wi-Fi bill"),
  new Expense(5, 700, "Food", "2025-09-26", "Groceries"),
  new Expense(6, 499, "Shopping", "2025-09-27", "Shoes"),
  new Expense(7, 40, "Transportation", "2025-09-28", "Jeepney fare"),
  new Expense(8, 150, "Food", "2025-09-30", "Dinner at restaurant"),
];

// 💰 Local savings data
let savingsProgress = 0.45; // 45% of goal
let savingsGoal = 10000; // Example goal in pesos

// 💡 Local motivational tips
const tips = [
  "Save at least 20% of your income each month.",
  "Track your expenses daily to avoid overspending.",
  "Cook meals at home instead of eating out.",
  "Set a budget and stick to it.",
  "Avoid impulse buying—wait 24 hours before big purchases.",
  "Invest in needs, not wants.",
  "Automate your savings every payday.",
  "Cut down subscriptions you rarely use.",
  "Compare prices before buying big-ticket items.",
  "Review your spending habits weekly.",
];

// 🧮 Expenses CRUD
export async function getExpenses() {
  return dummyExpenses;
}

export async function addExpense(expense) {
  dummyExpenses.push(expense);
}

export async function updateExpense(updated) {
  dummyExpenses = dummyExpenses.map((e) =>
    e.id === updated.id ? updated : e
  );
}

export async function deleteExpense(id) {
  dummyExpenses = dummyExpenses.filter((e) => e.id !== id);
}

// 💰 Savings functions
export async function getSavingsProgress() {
  return { progress: savingsProgress, goal: savingsGoal };
}

export async function updateSavingsProgress(newProgress) {
  savingsProgress = newProgress;
  return { progress: savingsProgress };
}

export async function getMotivationalTips() {
  return tips;
}
