import React, { useEffect } from "react";
import { Image, View, Text, ActivityIndicator } from "react-native";
import { supabase } from "../services/supabase";
import styles from "../styles/SplashStyles";

export default function Splash({ navigation }) {
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      setTimeout(() => {
        if (session) {
          navigation.replace("Home");
        } else {
          navigation.replace("Login");
        }
      }, 1500);
    };

    checkSession();
  }, []);

  return (
    <View style={styles.container}>

      <Image source={require("../assets/kaching_logo.png")} style={styles.logo} />

      <Text style={styles.title}>💸 Kaching</Text>
      <ActivityIndicator size="large" color="#388e3c" style={{ marginTop: 20 }} />
    </View>
  );
}
