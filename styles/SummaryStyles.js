import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },

  loadingText: {
    textAlign: "center",
    marginTop: 50,
  },

  chartBlock: {
    marginTop: 30,
    alignItems: "center",
  },

  chart: {
    borderRadius: 10,
  },

  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },

  category: {
    fontSize: 16,
  },

  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },

  totalCard: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#f0f8ff",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#388e3c",
  },
});
