import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#F9FAFF",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#9C27B0",
    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#388e3c",
    marginTop: 5,
    marginBottom: 15,
    textAlign: "center",
  },

  paragraph: {
    fontSize: 16,
    color: "#4B4B4B",
    lineHeight: 24,
    marginBottom: 14,
    textAlign: "center",
    paddingHorizontal: 10,
  },

  teamLead: {
    fontSize: 18,
    fontWeight: "700",
    color: "#9C27B0",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },

  teamItem: {
    fontSize: 15,
    color: "#2D3436",
    marginVertical: 4,
    backgroundColor: "#ffffffff",
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 12,
    textAlign: "center",
    width: "100%",
    maxWidth: 350,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },

  note: {
    fontSize: 14,
    color: "#636e72",
    marginTop: 40,
    textAlign: "center",
  },
});
