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
});

export default styles;
