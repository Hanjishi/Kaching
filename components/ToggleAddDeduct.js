import React from "react";
import { View, Text, Switch } from "react-native";
import styles from "../styles/SavingsStyles";

export default function ToggleAddDeduct({ isAdding, setIsAdding }) {
  return (
    <View style={styles.toggleContainer}>
      <Text style={styles.toggleLabel}>Deduct</Text>
      <Switch value={isAdding} onValueChange={setIsAdding} />
      <Text style={styles.toggleLabel}>Add</Text>
    </View>
  );
}
