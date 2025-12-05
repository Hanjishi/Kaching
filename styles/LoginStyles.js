import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 25 
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 25,
    alignSelf: "center",
    resizeMode: "contain",
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 30, 
    textAlign: "center" 
  },
  input: { 
    borderWidth: 1, 
    borderColor: "#ccc", 
    padding: 12,
    borderRadius: 8, 
    marginBottom: 15 
  },
  btn: { 
    backgroundColor: "#9C27B0", 
    padding: 15, 
    borderRadius: 10, 
    alignItems: "center", 
    marginTop: 10 
  },
  btnText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  link: { 
    marginTop: 20, 
    color: "#9C27B0", 
    textAlign: "center" 
  },
});