import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Homepage from "../../screens/Homepage";
import Register from "../../screens/Register";
import Login from "../../screens/Login";

const AuthStack = createStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Home" component={Homepage} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
}

export default AuthNavigator;
