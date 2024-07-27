import { View, Text } from "react-native";
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../../screens/Profile";
import GetPhoneNumber from "../../screens/GetPhoneNumber";
import VerifySMS from "../../screens/VerifySMS";
import VerifyIdCard from "../../screens/VerifyIdCard";
import EditUser from "../../screens/EditUser";
import EditSkills from "../../screens/EditSkills";
import EditProvinces from "../../screens/EditProvinces";

export default function ProfileNavigator() {
  const ProfileRouterStack = createStackNavigator();

  return (
    <ProfileRouterStack.Navigator>
      <ProfileRouterStack.Screen name="Profile Dashboard" component={Profile} />
      <ProfileRouterStack.Screen
        name="Send Code To Phone"
        component={GetPhoneNumber}
      />
      <ProfileRouterStack.Screen name="Edit User" component={EditUser} />
      <ProfileRouterStack.Screen name="Edit Skills" component={EditSkills} />

      <ProfileRouterStack.Screen name="VerifySMS" component={VerifySMS} />
      <ProfileRouterStack.Screen
        name="Edit Provinces"
        component={EditProvinces}
      />
      <ProfileRouterStack.Screen
        name="Verify ID Card"
        component={VerifyIdCard}
      />
    </ProfileRouterStack.Navigator>
  );
}
