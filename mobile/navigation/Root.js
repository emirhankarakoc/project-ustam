import { View, Text } from "react-native";
import React, { useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./auth/AuthNavigator";
import AppNavigator from "./app/AppNavigator";

export default function Root() {
  const RootStack = createStackNavigator();
  const [token, setToken] = React.useState();
  useEffect(() => {
    const handleToken = async () => {
      const usertoken = await AsyncStorage.getItem("userToken");
      if (usertoken) {
        setToken(usertoken);
      }
    };
    handleToken();
  }, []);

  const initialRouteName = token ? "App" : "Auth";

  return (
    <RootStack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="Auth" component={AuthNavigator} />
      <RootStack.Screen name="App" component={AppNavigator} />
    </RootStack.Navigator>
  );
}
