import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { http, APIURL } from "../assets/http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await http.post(`${APIURL}/accounts/login`, {
        email,
        password,
      });
      console.log("Login success:", response.data);
      const token = response.data.accessToken;
      const role = response.data.userRole;
      const verificationStatus = response.data.status;

      // Save token to AsyncStorage
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("role", role);
      await AsyncStorage.setItem("status", verificationStatus);
      // Retrieve the token to confirm it's saved
      const savedToken = await AsyncStorage.getItem("userToken");

      // Navigate to App screen after confirming token is saved
      if (savedToken) {
        navigation.reset({
          index: 0,
          routes: [{ name: "App", params: { screen: "ProfileRouter" } }],
        });
      } else {
        // Handle case where token wasn't saved
        setError("Token could not be saved. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Giriş işlemi başarısız oldu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={[styles.loginButton, { backgroundColor: "#ffd700" }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  loginButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default Login;
