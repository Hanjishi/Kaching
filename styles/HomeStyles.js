import { StyleSheet } from "react-native";
import Theme from "./Theme";

export default StyleSheet.create({
  ...Theme,

  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#fdfdfd",
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-between",
    marginTop: -10,
    marginBottom: 15,
  },
  profileLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#9C27B0",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  menuDropdown: {
    position: "absolute",
    top: 21,
    right: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingVertical: 8,
    width: 150,
    zIndex: 999,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#333",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#9C27B0",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 25,
  },
  card: {
    width: "47%",
    backgroundColor: "#f5f5f5",
    paddingVertical: 25,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
  },
  cardText: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "600",
  },
  progressContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  tipBox: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#f1f8e9",
    borderRadius: 10,
    width: "100%",
  },
  tipText: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    color: "#388e3c",
  },
  tipHint: {
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
});
