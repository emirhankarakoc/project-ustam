import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get("window");

export default function Verification() {
  const navigation = useNavigation();

  const handleVerification = async () => {
    const role = await AsyncStorage.getItem("role");

    console.log(role);
    if (role === "ROLE_USER") {
      navigation.navigate("Send Code To Phone");
    } else if (role === "ROLE_MECHANIC") {
      navigation.navigate("Verify ID Card");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleVerification}>
        <Text style={styles.buttonText}>Verificate Now!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20, // Alt boşluk bırakma
  },
  button: {
    width: width * 0.8,
    padding: 10,
    backgroundColor: "purple", // Buton rengi mor
    borderRadius: 10, // Köşeleri yuvarlak yapıyoruz
    alignItems: "center", // Buton içindeki yazıyı ortala
  },
  buttonText: {
    textAlign: "center",
    color: "#fff", // Yazı rengi beyaz
    fontSize: 16,
  },
});
