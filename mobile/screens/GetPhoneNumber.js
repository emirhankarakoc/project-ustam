import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { APIURL } from "../assets/http";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default GetPhoneNumber = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.post(
        `${APIURL}/users/add-phone-number`,
        { phoneNumber },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigation.navigate("VerifySMS");

      // Navigate to the screen where user will verify the code
      // Example: navigation.navigate('VerificationCodeScreen');
    } catch (error) {
      console.error("Error adding phone number:", error);
      Alert.alert("Error", "Failed to add phone number. Please try again.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Enter Your Phone Number:</Text>
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          marginVertical: 10,
          paddingHorizontal: 10,
        }}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />
      <Button title="Submit" onPress={handlePhoneNumberSubmit} />
    </View>
  );
};
