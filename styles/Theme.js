import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#e6f5ec",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#006400",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#006400",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#27ae60",
  },
  category: {
    fontSize: 16,
    color: "#2c3e50",
  },
  date: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  form: {
    padding: 16,
    backgroundColor: "#fff",
    alignContent: "center",
    borderRadius: 12,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#2ecc71",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#f9fdf9",
  },
  button: {
    backgroundColor: "#2ecc71",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  savingsContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  savingsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#006400",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  toggleLabel: {
    fontSize: 16,
    marginHorizontal: 10,
    color: "#2c3e50",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  savingsButton: {
    backgroundColor: "#2ecc71",
    padding: 14,
    margin: 8,
    borderRadius: 10,
    width: 90,
    alignItems: "center",
  },
  savingsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resetButton: {
    marginTop: 28,
    backgroundColor: "#e53935",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  resetText: {
    color: "white",
    fontWeight: "700",
  },

  goalSection: {
    marginTop: 40,
    width: "100%",
    backgroundColor: "#f1f8e9",
    padding: 16,
    borderRadius: 12,
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 12,
    textAlign: "center",
  },
  goalInput: {
    borderWidth: 1,
    borderColor: "#2ecc71",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  saveGoalButton: {
    backgroundColor: "#2ecc71",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  saveGoalText: {
    color: "white",
    fontWeight: "bold",
  },
  goalInfo: {
    alignItems: "center",
  },
  goalText: {
    fontSize: 16,
    color: "#2e7d32",
    fontWeight: "600",
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
  },
  removeGoalBtn: {
    marginTop: 14,
    backgroundColor: "#ff7043",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  removeGoalText: {
    color: "#fff",
    fontWeight: "700",
  },

  pickerContainer: {
  borderWidth: 1,
  borderColor: "#27ae60",
  borderRadius: 8,
  marginBottom: 12,
  overflow: "hidden",
  },

  picker: {
    height: 50,
    width: "100%",
    color: "#333",
  },

});


export default styles;
