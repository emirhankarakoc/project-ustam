import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FindMechanic from "../../screens/FindMechanic";
import MechanicProfile from "../../screens/MechanicProfile";

const SearchRouterStack = createStackNavigator();

export default function SearchNavigator() {
  return (
    <SearchRouterStack.Navigator>
      <SearchRouterStack.Screen
        name="Search Dashboard"
        component={FindMechanic}
      />
      <SearchRouterStack.Screen
        name="Mechanic Profile"
        component={MechanicProfile}
      />
    </SearchRouterStack.Navigator>
  );
}
