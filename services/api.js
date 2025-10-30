import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const addExpense = async (expense) => {
  await addDoc(collection(db, "expenses"), expense);
};

export const getExpenses = async () => {
  const querySnapshot = await getDocs(collection(db, "expenses"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
