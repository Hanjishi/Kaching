import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8fff8"
  },

  balanceContainer: {
    alignItems: "center",
    marginBottom: 20
  },
  balanceText: {
    fontSize: 20,
    color: "#006600",
    fontWeight: "600"
  },
  balanceAmount: {
    fontSize: 34,
    color: "#008000",
    fontWeight: "bold",
    marginTop: 4
  },

  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22
  },
  toggleLabel: {
    color: "#006600",
    fontSize: 16,
    marginHorizontal: 12
  },

  amountGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 30
  },
  amountButton: {
    width: 88,
    paddingVertical: 12,
    margin: 8,
    backgroundColor: "#4caf50",
    borderRadius: 12
  },
  amountButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
  },

  goalCard: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    elevation: 3
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#006600",
    textAlign: "center",
    marginBottom: 12
  },
  goalSavedText: {
    fontSize: 16,
    color: "#004d00",
    textAlign: "center"
  },
  goalPercentText: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 14,
    color: "#333"
  },

  goalButton: {
    backgroundColor: "#2ecc71",
    padding: 12,
    borderRadius: 12,
    marginTop: 10
  },
  goalButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700"
  },

  removeGoalButton: {
    backgroundColor: "#ff7043",
    padding: 12,
    borderRadius: 12,
    marginTop: 15
  },
  resetButtonStyle: { 
    backgroundColor: "#e53935", 
    marginTop: 20, 
    width: '80%', 
    alignSelf: 'center',
    padding: 14,
    borderRadius: 12,
  },
  removeGoalButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700"
  },

  input: {
    backgroundColor: "#eef6ee",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  }
});
