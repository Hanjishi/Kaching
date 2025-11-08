import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
          style={styles.avatar}
        />
      </View>
      <Text style={styles.name}>HANJI</Text>
      <Text style={styles.email}>hanji@gmail.com</Text>

      {/* --- Profile Details Section --- */}
      <View style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Profile Details</Text>

        {/* Detail Row 1: Phone */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailValue}>+63912345678</Text>
        </View>

        {/* Detail Row 2: Member Since */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Member Since:</Text>
          <Text style={styles.detailValue}>August 2023</Text>
        </View>

        {/* Detail Row 3: Preferred Currency */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Currency:</Text>
          <Text style={styles.detailValue}>PHP (₱)</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F4F7F9",
    paddingTop: 50,
  },
  avatarContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#fff",
    padding: 5,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#7F8C8D",
    fontWeight: "400",
    marginBottom: 30,
  },
  detailsCard: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#34495E",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
    paddingBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F7F9',
  },
  detailLabel: {
    fontSize: 15,
    color: "#7F8C8D",
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 15,
    color: "#2C3E50",
    fontWeight: '600',
  }
});
