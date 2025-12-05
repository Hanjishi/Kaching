import React from "react";
import { ScrollView, Text } from "react-native";
import aboutStyles from "../styles/AboutStyles";

export default function About() {
  return (
    <ScrollView contentContainerStyle={aboutStyles.container}>
      
      <Text style={aboutStyles.title}>ℹ️ About Kaching</Text>
      <Text style={aboutStyles.subtitle}>Version 1.0.0</Text>

      <Text style={aboutStyles.paragraph}>
        <Text style={{ fontWeight: "600" }}>Kaching</Text> is a Smart Budget 
        and Expense tracker that helps users manage daily spending and stay
        financially aware.
      </Text>

      <Text style={aboutStyles.paragraph}>
        Record expenses, view summaries, analyze trends, and plan smarter with
        a clean and user-friendly interface.
      </Text>

      <Text style={aboutStyles.subtitle}>👥 Development Team</Text>

      <Text style={aboutStyles.teamLead}>
        Team Lead: <Text style={{ fontWeight: "700" }}>Dalisay, John H.</Text>
      </Text>

      <Text style={aboutStyles.teamItem}>• Umbao, Adrian</Text>
      <Text style={aboutStyles.teamItem}>• Gulapo, Jhammes Leigh T.</Text>
      <Text style={aboutStyles.teamItem}>• Comedido, Kimberly C.</Text>
      <Text style={aboutStyles.teamItem}> • Dibdib, Althia Lhorine Xenieth V.</Text>
      <Text style={aboutStyles.teamItem}>• Sultan, Mark Rey V.</Text>
      <Text style={aboutStyles.teamItem}>• Raterta, Kyle Ichtus</Text>
      <Text style={aboutStyles.teamItem}>• Yuson, Alessandra Xantipi T.</Text>

      <Text style={aboutStyles.note}>© 2025 Kaching. All rights reserved.</Text>

    </ScrollView>
  );
}
