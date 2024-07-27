import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function EditProfile() {
  const navigation = useNavigation();

  const handleEditUserRequest = async () => {
    navigation.navigate("Edit User");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleEditUserRequest}>
        <Text style={styles.buttonText}>Edit User</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: width * 0.8, // Ekranın %80'i kadar genişlik
    padding: 10,
    backgroundColor: "purple", // Buton rengi mor
    borderRadius: 10, // Köşeleri yuvarlak yapıyoruz
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", // Yazı rengi beyaz
    fontSize: 16,
  },
});
