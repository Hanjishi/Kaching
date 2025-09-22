import Expense from "../models/Expense";

let dummyExpenses = [
  new Expense(1, 50, "Food", "2025-09-21", "Lunch at cafe"),
  new Expense(2, 120, "Transportation", "2025-09-20", "Grab ride"),
  new Expense(3, 80, "Shopping", "2025-09-19", "T-shirt"),
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
