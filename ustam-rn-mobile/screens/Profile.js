import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APIURL } from "../assets/http";
import StickedBottomBar from "../components/StickedBottomBar";
import LogOut from "../components/LogOut";
import Verification from "../components/Verification";
import EditProfile from "../components/EditProfile";
import EditSKills from "../components/EditSkills";
import EditProvinces from "../components/EditProvinces";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusForVerification, setStatusForVerification] = useState(null);

  // useCallback hook'u ile callback fonksiyonunu oluşturuyoruz
  const fetchProfileData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get(`${APIURL}/accounts/getMe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("istek attim.");

      setProfileData(response.data);
      setStatusForVerification(response.data.status);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setLoading(false);
    }
  }, []);

  // useFocusEffect, bileşen odağa geldiğinde fetchProfileData fonksiyonunu çağırır
  useFocusEffect(
    useCallback(() => {
      // Async function içindeki veriyi hemen çağırıyoruz
      fetchProfileData();
    }, [fetchProfileData])
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileInfoContainer}>
          <Text style={styles.label}>Id: {profileData.id}</Text>
          <Text style={styles.label}>Telefon: {profileData.phoneNumber}</Text>
          <Text style={styles.label}>Email: {profileData.email}</Text>
          <Text style={styles.label}>Role: {profileData.role}</Text>
          <Text style={styles.label}>Status: {profileData.status}</Text>
          <Text style={styles.label}>
            Extra Info: {profileData.extraInfo_M}
          </Text>

          {(statusForVerification === "NOTHING" ||
            statusForVerification === "REJECTED") && <Verification />}

          <EditProfile />
          <EditProvinces />
          <EditSKills />
          <LogOut />
        </View>
      </ScrollView>
      <StickedBottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 80, // Space for StickedBottomBar
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  profileInfoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Profile;
