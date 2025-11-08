import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>HANJI</Text>
      <Text style={styles.email}>hanji@example.com</Text>
      <Text style={styles.sectionTitle}>About Me</Text>
      <Text style={styles.about}>
        I’m a passionate budgeter who loves tracking my savings and goals!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#9C27B0",
    marginBottom: 10,
  },
  about: {
    textAlign: "center",
    fontSize: 15,
    color: "#555",
  },
});
