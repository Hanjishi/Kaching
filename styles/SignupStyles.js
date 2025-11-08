import { StyleSheet } from "react-native";
import Theme from "./Theme";

export default StyleSheet.create({
  ...Theme, // reuse any shared base styles if needed

  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20, 
    backgroundColor: "#fff", 
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    color: "#9C27B0", 
  },
  subtitle: { 
    fontSize: 16, 
    color: "#666", 
    marginBottom: 30, 
  },
  input: { 
    width: "100%", 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 10, 
    padding: 12, 
    marginBottom: 15, 
    backgroundColor: "#f9f9f9",
  },
  button: { 
    backgroundColor: "#9C27B0", 
    paddingVertical: 12, 
    borderRadius: 10, 
    width: "100%", 
    alignItems: "center", 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold", 
  },
  link: { 
    marginTop: 15, 
    color: "#9C27B0", 
    fontWeight: "500", 
  },
});
