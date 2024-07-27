import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native"; // useNavigation hook'u
import StickedBottomBar from "../components/StickedBottomBar";
import { APIURL } from "../assets/http";

export default function FindMechanic() {
  const navigation = useNavigation(); // useNavigation hook'u ile navigasyon erişimi

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [skills, setSkills] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [isSkillModalVisible, setIsSkillModalVisible] = useState(false);
  const [isProvinceModalVisible, setIsProvinceModalVisible] = useState(false);

  // Örnek mekanik verileri (100 tane)
  const sampleMechanics = Array.from({ length: 100 }, (_, index) => ({
    id: `id-${index}`,
    email: `mechanic${index + 1}@example.com`,
    point_M: Math.floor(Math.random() * 100),
  }));

  // Örnek verileri state'e ekle
  const loadSampleMechanics = () => {
    setMechanics(sampleMechanics);
  };

  const fetchAndSetData = async (url, setter, modalSetter) => {
    try {
      const response = await axios.get(url);
      setter(response.data);
      modalSetter(true);
    } catch (error) {
      Alert.alert("Hata", "Veri alınırken bir hata oluştu.");
    }
  };

  const handleSelect = (item, type) => {
    if (type === "skill") {
      setSelectedSkill(item);
      setIsSkillModalVisible(false);
    } else if (type === "province") {
      setSelectedProvince(item);
      setIsProvinceModalVisible(false);
    }
  };

  const handleSearch = async () => {
    if (!selectedSkill || !selectedProvince) {
      Alert.alert("Eksik Bilgi", "Lütfen beceri ve il seçiniz.");
      return;
    }

    try {
      const response = await axios.get(
        `${APIURL}/users/search/${selectedSkill.id}/${selectedProvince.id}`
      );
      setMechanics(response.data);
      Alert.alert("Başarılı", "Mekanikler başarıyla getirildi.");
    } catch (error) {
      Alert.alert("Hata", "Arama sırasında bir hata oluştu.");
    }
  };

  const handleMechanicPress = (id) => {
    // Navigasyonu `MechanicProfile` ekranına yap
    navigation.navigate("Mechanic Profile", { id });
  };

  const renderMechanic = ({ item }) => (
    <TouchableOpacity
      style={styles.mechanicItem}
      onPress={() => handleMechanicPress(item.id)} // id'yi gönder
    >
      <Text style={styles.mechanicText}>Email: {item.email}</Text>
      <Text style={styles.mechanicText}>Points: {item.point_M}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <View style={styles.buttonContainer}>
          <Button
            title={`Skill: ${
              selectedSkill ? selectedSkill.name : "Select Skill"
            }`}
            color="#800080"
            onPress={() =>
              fetchAndSetData(
                `${APIURL}/users/skills`,
                setSkills,
                setIsSkillModalVisible
              )
            }
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={`Province: ${
              selectedProvince ? selectedProvince.name : "Select Province"
            }`}
            color="#800080"
            onPress={() =>
              fetchAndSetData(
                `${APIURL}/users/provinces`,
                setProvinces,
                setIsProvinceModalVisible
              )
            }
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="SEARCH" color="#800080" onPress={handleSearch} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Load Sample Mechanics"
            color="#800080"
            onPress={loadSampleMechanics}
          />
        </View>
      </View>

      {/* Skill Modal */}
      <Modal
        visible={isSkillModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsSkillModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={skills}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => handleSelect(item, "skill")}
              >
                <Text style={styles.modalItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            numColumns={4}
          />
          <Button
            title="Close"
            onPress={() => setIsSkillModalVisible(false)}
            color="#800080"
          />
        </View>
      </Modal>

      {/* Province Modal */}
      <Modal
        visible={isProvinceModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsProvinceModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={provinces}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => handleSelect(item, "province")}
              >
                <Text style={styles.modalItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            numColumns={4}
          />
          <Button
            title="Close"
            onPress={() => setIsProvinceModalVisible(false)}
            color="#800080"
          />
        </View>
      </Modal>

      {/* Mechanics List */}
      <FlatList
        style={styles.mechanicsContainer}
        data={mechanics}
        renderItem={renderMechanic}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />

      <StickedBottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchSection: {
    padding: 20,
    borderWidth: 2,
    borderColor: "#800080",
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#800080",
    padding: 20,
  },
  modalItem: {
    padding: 15,
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 5,
    flex: 1,
    borderWidth: 1,
    borderColor: "#800080",
  },
  modalItemText: {
    fontSize: 18,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
  },
  mechanicsContainer: {
    flex: 1,
    padding: 10,
  },
  mechanicItem: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#800080",
  },
  mechanicText: {
    fontSize: 16,
  },
});
