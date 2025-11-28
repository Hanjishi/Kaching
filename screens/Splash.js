import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "../styles/Theme";

export default function Splash({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💸 Kaching</Text>
      <ActivityIndicator size="large" color="#4caf50" />
      <Text style={styles.subtitle}>Loading your expenses...</Text>
    </View>
  );
}
