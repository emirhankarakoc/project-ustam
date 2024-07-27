import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { APIURL, http, httpError } from "../assets/http";
import { useNavigation } from "@react-navigation/native";

export default function EditProvinces() {
  const [provinces, setProvinces] = useState([]);
  const [myProvinces, setMyProvinces] = useState([]);
  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showAddProvinceModal, setShowAddProvinceModal] = useState(false);
  const [showRemoveProvinceModal, setShowRemoveProvinceModal] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await http.get(`${APIURL}/users/provinces`);
        console.log("all", response.data);
        setProvinces(response.data);
      } catch (error) {
        console.log(httpError);
      }
    };

    const fetchMyProvinces = async () => {
      try {
        const response = await http.get(`${APIURL}/mechanics/my-provinces`);
        console.log("my provinces", response.data);
        setMyProvinces(response.data);
        setSelectedIds(response.data.map((province) => province.id));
        setSelectedProvinces(response.data);
      } catch (error) {
        console.log(httpError);
      }
    };

    fetchProvinces();
    fetchMyProvinces();
  }, []);

  const navigation = useNavigation();

  const handleAddProvincesRequest = async () => {
    setLoading(true);
    try {
      await http.put(`${APIURL}/mechanics/add-provinces`, selectedIds);
      setLoading(false);
      Alert.alert("Başarı", "İller başarıyla eklendi!");
      setTimeout(() => {
        navigation.navigate("Profile Dashboard");
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.log(httpError(error));
      Alert.alert("Hata", "İl eklenirken bir hata oluştu.");
    }
  };

  const handleSelectProvince = (province) => {
    if (selectedIds.includes(province.id)) {
      // Remove province from selected list
      setSelectedProvinces((prev) => prev.filter((p) => p.id !== province.id));
      setSelectedIds((prev) => prev.filter((id) => id !== province.id));
    } else {
      // Add province to selected list
      setSelectedProvinces((prev) => [...prev, province]);
      setSelectedIds((prev) => [...prev, province.id]);
    }
  };

  const handleProvinceAction = (action) => {
    if (action === "add" && selectedProvince) {
      handleSelectProvince(selectedProvince);
    } else if (action === "remove" && selectedProvince) {
      handleSelectProvince(selectedProvince);
    }
    setShowAddProvinceModal(false);
    setShowRemoveProvinceModal(false);
    setSelectedProvince(null);
  };

  return (
    <View style={styles.container}>
      {/* Add Province Modal */}
      <Modal
        transparent={true}
        visible={showAddProvinceModal}
        animationType="slide"
        onRequestClose={() => setShowAddProvinceModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleProvinceAction("add")}
            >
              <Text style={styles.modalButtonText}>Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowAddProvinceModal(false)}>
              <Text style={styles.modalButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Remove Province Modal */}
      <Modal
        transparent={true}
        visible={showRemoveProvinceModal}
        animationType="slide"
        onRequestClose={() => setShowRemoveProvinceModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleProvinceAction("remove")}
            >
              <Text style={styles.modalButtonText}>Kaldır</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowRemoveProvinceModal(false)}>
              <Text style={styles.modalButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.topHalf}>
        <Text style={styles.sectionTitle}>Tüm İller</Text>
        <ScrollView contentContainerStyle={styles.provincesContainer}>
          {provinces
            .filter((province) => !selectedIds.includes(province.id)) // Filter out selected provinces
            .map((province) => (
              <TouchableOpacity
                key={province.id}
                style={[
                  styles.provinceButton,
                  selectedIds.includes(province.id) && styles.selectedProvince,
                ]}
                onPress={() => {
                  setSelectedProvince(province);
                  setShowAddProvinceModal(true);
                }}
              >
                <Text style={styles.provinceText}>{province.name}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
      <View style={styles.bottomHalf}>
        <Text style={styles.selectedTitle}>Seçilen</Text>
        <ScrollView contentContainerStyle={styles.selectedProvincesContainer}>
          {selectedProvinces.map((province) => (
            <TouchableOpacity
              key={province.id}
              style={styles.selectedProvinceItem}
              onPress={() => {
                setSelectedProvince(province);
                setShowRemoveProvinceModal(true);
              }}
            >
              <Text style={styles.selectedProvinceText}>{province.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.finalButton}
        onPress={() => {
          console.log(selectedIds);
          handleAddProvincesRequest();
        }}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.finalButtonText}>KAYDET</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHalf: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  provincesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  provinceButton: {
    width: "48%",
    margin: "1%",
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    alignItems: "center",
  },
  selectedProvince: {
    backgroundColor: "green",
  },
  provinceText: {
    color: "#000",
  },
  selectedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  selectedProvincesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectedProvinceItem: {
    width: "48%",
    margin: "1%",
    padding: 10,
    backgroundColor: "#d0f0c0",
    borderRadius: 5,
    alignItems: "center",
  },
  selectedProvinceText: {
    color: "#000",
  },
  finalButton: {
    backgroundColor: "purple",
    padding: 15,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  finalButtonText: {
    color: "#fff",
    fontSize: 16,
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalButton: {
    margin: 10,
    padding: 10,
    backgroundColor: "purple",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
