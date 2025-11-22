import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/Theme";

export default function Splash({ navigation }) {
  useEffect(() => {
    const checkLogin = async () => {
    const logged = await AsyncStorage.getItem("loggedIn");

    if (logged === "true") {
      navigation.replace("Home");
    } else {
      navigation.replace("Login");
    }
  };

  setTimeout(checkLogin, 3500);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💸 Kaching</Text>
      <ActivityIndicator size="large" color="#4caf50" />
      <Text style={styles.subtitle}>Loading your expenses...</Text>
    </View>

  );
}
