import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import styles from "../styles/SavingsStyles";

export default function AmountButtons({ amounts, isAdding, setIsAdding, handlePress }) {
  return (
    <>
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Deduct</Text>
        <Switch 
          value={isAdding} 
          onValueChange={setIsAdding} 
          trackColor={{ false: "#ff7043", true: "#4caf50" }} 
          thumbColor={isAdding ? "#ffffff" : "#ffffff"}
        />
        <Text style={styles.toggleLabel}>Add</Text>
      </View>

      <View style={styles.amountGrid}>
        {amounts.map(amt => (
          <TouchableOpacity
            key={amt}
            style={styles.amountButton}
            onPress={() => handlePress(amt)}
          >
            <Text style={styles.amountButtonText}>₱{amt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}