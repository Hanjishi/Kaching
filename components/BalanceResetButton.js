import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from "../styles/SavingsStyles";

export default function BalanceResetButton({ confirmReset }) {
  return (
    <TouchableOpacity
      style={styles.resetButtonStyle}
      onPress={confirmReset}
    >
      <Text style={styles.amountButtonText}>Reset Saved Balance</Text>
    </TouchableOpacity>
  );
}