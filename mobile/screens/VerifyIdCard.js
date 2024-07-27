import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  Image,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APIURL } from "../assets/http";
import StickedBottomBar from "../components/StickedBottomBar";
import { useNavigation } from "@react-navigation/native";

const ImagePickerComponent = () => {
  const navigation = useNavigation();

  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  // Function: Request gallery permission
  const requestGalleryPermission = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log("Gallery permission status:", status);
      if (status !== "granted") {
        Alert.alert("Gallery access denied.");
      }
    } catch (error) {
      console.error("Error while requesting gallery permission:", error);
    }
  };

  // Function: Pick image from gallery
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log("Image selection result:", result);

      if (!result.cancelled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error while selecting image:", error);
    }
  };

  // Function: Send selected image to server
  const sendImageToServer = async () => {
    try {
      if (!selectedImage) {
        Alert.alert("Please select an image.");
        return;
      }

      setLoading(true); // Start loading spinner and disable buttons

      const formData = new FormData();
      formData.append("multipartFile", {
        uri: selectedImage,
        type: "image/jpeg",
        name: "identifyCard.jpg",
      });

      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.post(
        `${APIURL}/mechanics/send-id-card`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API response:", response.data);

      // Show success message
      Alert.alert(
        "Image successfully sent",
        "You must wait while we are inspecting your id card."
      );

      navigation.navigate("Profile Dashboard");
    } catch (error) {
      console.error("Error while sending image:", error);
      Alert.alert("Error while sending image.");
    } finally {
      setLoading(false); // Stop loading spinner and enable buttons
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
      <View style={styles.buttonContainer}>
        <Button
          title="Check permissions"
          onPress={requestGalleryPermission}
          disabled={loading}
        />
        <View style={styles.buttonGap} />
        <Button title="Select Image" onPress={pickImage} disabled={loading} />
        <View style={styles.buttonGap} />
        <Button
          title="Send to API"
          onPress={sendImageToServer}
          disabled={!selectedImage || loading}
        />
      </View>
      {loading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.spinner}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonGap: {
    width: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  spinner: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
  },
});

export default ImagePickerComponent;
