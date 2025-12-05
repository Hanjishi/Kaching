import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/SummaryStyles";

export default function CategoryList({ summary }) {
  return (
    <View style={{ marginTop: 20 }}>
      {Object.keys(summary).map((cat) => (
        <View key={cat} style={styles.listItem}>
          <Text style={styles.category}>{cat}</Text>
          <Text style={styles.amount}>₱{summary[cat].toFixed(2)}</Text>
        </View>
      ))}
    </View>
  );
}
