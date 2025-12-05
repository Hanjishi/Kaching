import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
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
});