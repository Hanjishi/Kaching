import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Splash from "../screens/Splash";
import Home from "../screens/Home";
import ExpenseList from "../screens/ExpenseList";
import AddExpense from "../screens/AddExpense";
import EditExpense from "../screens/EditExpense";
import Summary from "../screens/Summary";
import Savings from "../screens/Savings";



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
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ExpenseList" component={ExpenseList} />
        <Stack.Screen name="AddExpense" component={AddExpense} />
        <Stack.Screen name="EditExpense" component={EditExpense} />
        <Stack.Screen name="Summary" component={Summary} />
        <Stack.Screen name="Savings" component={Savings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
