import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { APIURL } from "../assets/http"; // Adjust the import path as needed

export default function MechanicProfile({ route }) {
  const { id } = route.params; // Get `id` from route params
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${APIURL}/users/profile/${id}`);
        setProfileData(response.data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch profile data.");
      }
    };

    fetchProfileData();
  }, [id]);

  const handleCreateAppointment = () => {
    // Implement this method as needed
    Alert.alert(
      "Create Appointment",
      "Appointment creation functionality goes here."
    );
  };

  if (!profileData) {
    return <Text>Loading...</Text>; // Optionally handle loading state
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mechanic Profile</Text>
      <Text style={styles.label}>Email: {profileData.email}</Text>
      <Text style={styles.label}>
        Phone Number: {profileData.phoneNumber || "N/A"}
      </Text>
      <Text style={styles.label}>Points: {profileData.point_M}</Text>
      <Text style={styles.label}>Extra Info: {profileData.extraInfo_M}</Text>

      {/* Reviews Section */}
      <View style={styles.reviewsSection}>
        <Text style={styles.reviewsTitle}>Reviews:</Text>
        {profileData.reviews_M.length === 0 ? (
          <Text>No reviews available.</Text>
        ) : (
          <Text>Reviews will be displayed here.</Text>
        )}
      </View>

      <Button
        title="Create Appointment"
        onPress={handleCreateAppointment}
        color="#800080"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  reviewsSection: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
