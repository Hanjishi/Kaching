import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    alignItems: "center", 
    backgroundColor: "#F4F7F9" 
},
  avatar: { 
    width: 130, 
    height: 130, 
    borderRadius: 65, 
    borderWidth: 4, 
    borderColor: "#fff", 
    marginBottom: 10 
},
  changePhotoText: { 
    color: "#3498DB", 
    fontSize: 14, 
    fontWeight: "500", 
    marginBottom: 20 
},
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20 
},
  input: { 
    width: "100%", 
    backgroundColor: "#F0F3F4", 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 15 
},
  saveButton: { 
    backgroundColor: "#2ECC71", 
    padding: 14, 
    borderRadius: 10, 
    width: "100%", alignItems: "center", 
    marginTop: 10 
},
  saveButtonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "700" 
},
});