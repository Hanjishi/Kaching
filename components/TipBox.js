import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../styles/HomeStyles";

export default function TipBox({ advice, setAdvice, tips }) {
  return (
    <TouchableOpacity
      style={styles.tipBox}
      onPress={() => setAdvice(tips[Math.floor(Math.random() * tips.length)])}
    >
      <Text style={styles.tipText}>💡 Tip: {advice}</Text>
      <Text style={styles.tipHint}>(Tap for another tip)</Text>
    </TouchableOpacity>
  );
}