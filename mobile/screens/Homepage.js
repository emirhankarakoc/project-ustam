import { View, Text, StyleSheet, Button, Image } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Homepage({ navigation }) {
  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.center}>
      <View>
        <Image
          source={{
            uri: "http://res.cloudinary.com/dhoj5fmxr/image/upload/v1720876201/fnka2afsx52vo2pq1104.png",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View>
          <Button title="Qeydiyyat" onPress={handleRegister} color="#800080" />
        </View>
        <View style={{ marginTop: "10%" }}>
          <Button title="GIRIŞ YAP" onPress={handleLogin} color="#800080" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  image: {
    width: 200, // Görselin genişliği
    height: 200, // Görselin yüksekliği
    marginBottom: 20, // Görselin alt kısmına boşluk
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "60%",
  },
});
