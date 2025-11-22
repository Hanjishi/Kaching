import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "../styles/Theme";

export default function About() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ℹ️ About Kaching</Text>

      <Text style={styles.subtitle}>Version 1.0.0</Text>

      <Text style={styles.paragraph}>
        Kaching is a <Text style={{ fontWeight: "600" }}>smart expense and savings tracker</Text> 
        designed to help users manage their daily spending, monitor savings, and stay financially aware.
      </Text>

      <Text style={styles.paragraph}>
        Record expenses, view summaries, analyze trends, and plan better with a 
        <Text style={{ fontWeight: "600" }}> clean and user-friendly interface</Text>.
      </Text>

      <Text style={styles.paragraph}>
        Developed by: <Text style={{ fontWeight: "600" }}>Kaching Team</Text>
      </Text>

      <Text style={styles.note}>
        © 2025 Kaching. All rights reserved.
      </Text>
    </ScrollView>
  );
}
