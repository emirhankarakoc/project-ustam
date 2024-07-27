import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { height } = Dimensions.get("window");

export default function StickedBottomBar() {
  const navigation = useNavigation();

  const handleGoProfile = async () => {
    navigation.reset({
      index: 0,
      routes: [
        { name: "ProfileRouter", params: { screen: "Profile Dashboard" } },
      ],
    });
  };

  const handleGoSearch = () => {
    navigation.reset({
      index: 0,
      routes: [
        { name: "SearchRouter", params: { screen: "Search Dashboard" } },
      ],
    });
  };

  return (
    <View style={styles.fixedFooter}>
      <TouchableOpacity style={styles.column} onPress={handleGoSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.column} onPress={handleGoProfile}>
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fixedFooter: {
    position: "absolute",
    bottom: 0,
    left: 10, // Sol kenardan 10px margin
    right: 10, // Sağ kenardan 10px margin
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent", // Arka plan rengini kaldırdık
    padding: 10,
    borderTopWidth: 0,
    borderTopColor: "#ccc",
    height: height * 0.05, // Ekranın %5'i kadar yükseklik
    borderRadius: 10, // Köşeleri yuvarlak yapıyoruz
    overflow: "hidden", // İçerik köşelerden taşmaması için
  },
  column: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "purple", // Butonların rengi mor
    borderRadius: 10, // Köşeleri yuvarlak yapıyoruz
  },
  divider: {
    width: 1,
    backgroundColor: "#fff", // Beyaz çizgi
  },
  buttonText: {
    color: "#fff", // Yazı rengi beyaz
    fontSize: 16,
  },
});
