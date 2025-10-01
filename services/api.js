import Expense from "../models/Expense";

let dummyExpenses = [
  new Expense(1, 235, "Food", "2025-09-21", "Lunch at cafe"),
  new Expense(2, 120, "Transportation", "2025-09-20", "Grab ride"),
  new Expense(3, 80, "Shopping", "2025-09-19", "T-shirt"),
  new Expense(4, 1600, "Utilities", "2025-09-25", "Wi-Fi bill"),
  new Expense(5, 700, "Food", "2025-09-26", "Groceries"),
  new Expense(6, 499, "Shopping", "2025-09-27", "Shoes"),
  new Expense(7, 40, "Transportation", "2025-09-28", "Jeepney fare"),
  new Expense(9, 150, "Food", "2025-09-30", "Dinner at restaurant"),
];

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
