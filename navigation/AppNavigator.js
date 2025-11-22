import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Splash from "../screens/Splash";
import Home from "../screens/Home";
import ExpenseList from "../screens/ExpenseList";
import AddExpense from "../screens/AddExpense";
import EditExpense from "../screens/EditExpense";
import Summary from "../screens/Summary";
import Savings from "../screens/Savings";
import Profile from "../screens/Profile";
import About from "../screens/About";
import Settings from "../screens/Settings";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ExpenseList" component={ExpenseList} />
        <Stack.Screen name="AddExpense" component={AddExpense} />
        <Stack.Screen name="EditExpense" component={EditExpense} />
        <Stack.Screen name="Summary" component={Summary} />
        <Stack.Screen name="Savings" component={Savings} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
