import React, { useState, useRef } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { APIURL } from "../assets/http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StickedBottomBar from "../components/StickedBottomBar";

const VerifySMS = ({ navigation }) => {
  const [isVerificated, setVerificated] = useState(false);
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const refs = useRef([]);

  const handleVerificationCodeSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.post(
        `${APIURL}/users/verificate-phone-number`,
        { c: verificationCode.join("") },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Alert.alert(
          "Verification Successful",
          "Congratulations! You verified your number."
        );

        await AsyncStorage.setItem("status", "VERIFICATED");
        setVerificated(true);
        navigation.navigate("Profile Dashboard");
      } else {
        throw new Error("Failed to verify phone number");
      }
    } catch (error) {
      console.error("Error verifying phone number:", error);
      Alert.alert("Error", "Failed to verify phone number. Please try again.");
    }
  };

  const handleChangeText = (text, index) => {
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = text;

    if (text.length === 1 && index < 5) {
      // Automatically focus on the next TextInput
      refs.current[index + 1].focus();
    }

    setVerificationCode(newVerificationCode);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Enter Verification Code:</Text>
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        {[...Array(6)].map((_, index) => (
          <TextInput
            key={index}
            ref={(input) => (refs.current[index] = input)}
            style={{
              height: 40,
              width: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginHorizontal: 5,
              textAlign: "center",
            }}
            maxLength={1}
            keyboardType="numeric"
            value={verificationCode[index]}
            onChangeText={(text) => handleChangeText(text, index)}
            onSubmitEditing={handleVerificationCodeSubmit}
          />
        ))}
      </View>
      <Button title="Submit" onPress={handleVerificationCodeSubmit} />
      {isVerificated && <StickedBottomBar />}
    </View>
  );
};

export default VerifySMS;
