// services/firebaseService.js
import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Add a new expense
export const addExpenseToFirestore = async (expense) => {
  try {
    await addDoc(collection(db, "expenses"), expense);
    console.log("✅ Expense added to Firestore!");
  } catch (error) {
    console.error("❌ Error adding expense:", error);
  }
};

// Get all expenses
export const getExpensesFromFirestore = async () => {
  try {
    const snapshot = await getDocs(collection(db, "expenses"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("❌ Error fetching expenses:", error);
    return [];
  }
};
