import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { APIURL, http } from "../assets/http";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(null); // Başlangıçta seçili rol yok
  const [error, setError] = useState(""); // Hata mesajı için state

  const handleRegister = async () => {
    try {
      const response = await http.post(`${APIURL}/accounts/register`, {
        email,
        password,
        role: selectedRole,
      });
      console.log("Registration success:", response.data);

      // Handle success, maybe navigate to another screen
      // Otomatik giriş yap
      await handleLogin(email, password);
    } catch (error) {
      console.error("Registration error:", error.message);
      setError("Kayıt işlemi başarısız oldu. Lütfen tekrar deneyin.");
    }
  };

  const handleLogin = async (email, password) => {
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
      console.log("Token saved to AsyncStorage");
      setError("Giriş başarılı.");
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "App", params: { screen: "Dashboard" } }],
        });
      }, 1500);

      // Handle success, maybe navigate to another screen
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Giriş işlemi başarısız oldu. Lütfen tekrar deneyin.");
    }
  };

  const selectRole = (role) => {
    setSelectedRole(role);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            selectedRole === "USER" && styles.selectedButton,
          ]}
          onPress={() => selectRole("USER")}
        >
          <Text style={styles.buttonText}>USER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.roleButton,
            selectedRole === "MECHANIC" && styles.selectedButton,
          ]}
          onPress={() => selectRole("MECHANIC")}
        >
          <Text style={styles.buttonText}>MECHANIC</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.registerButton, { backgroundColor: "#ffd700" }]}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Register</Text>
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
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  roleButton: {
    backgroundColor: "#800080", // Mor
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  selectedButton: {
    backgroundColor: "#ffd700", // Sarı
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  registerButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default Register;
