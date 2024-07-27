import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileNavigator from "./ProfileNavigator";
import SearchNavigator from "./SearchNavigator";

const AppStack = createStackNavigator();

function AppNavigator() {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AppStack.Screen name="ProfileRouter" component={ProfileNavigator} />

      <AppStack.Screen name="SearchRouter" component={SearchNavigator} />
    </AppStack.Navigator>
  );
}

export default AppNavigator;
