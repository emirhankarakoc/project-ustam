import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

const Dashboard = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");

      // Reset the navigation state and navigate to the Auth stack
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth", params: { screen: "Home" } }],
      });
    } catch (error) {
      console.error("Error removing user token:", error);
    }
  };

  const handleProfile = () => {
    navigation.navigate("Profile"); // Profile ekranına yönlendir
  };

  const handleFindMechanic = () => {
    navigation.navigate("Usta Ara"); // FindMechanic ekranına yönlendir
  };

  const handleVerifyIdCard = () => {
    navigation.navigate("Verify Id Card"); // VerifyIdCard ekranına yönlendir
  };

  const handleVerifyPhone = () => {
    navigation.navigate("Get Phone Number"); // VerifyPhone ekranına yönlendir
  };

  return (
    <View style={styles.container}>
      <Text>EMIRHAN KARAKOC 2024 BAKU</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleProfile}>
          <Text style={styles.buttonText}>Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleFindMechanic}
        >
          <Text style={styles.buttonText}>Usta Ara</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleVerifyIdCard}
        >
          <Text style={styles.buttonText}>Verify Id Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleVerifyPhone}
        >
          <Text style={styles.buttonText}>Verify Phone Number</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "purple",
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  logoutButton: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 12,
    backgroundColor: "purple",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Dashboard;
