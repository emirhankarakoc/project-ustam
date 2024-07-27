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

export default function EditSkills() {
  const [skills, setSkills] = useState([]);
  const [mySkills, setMySkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [showRemoveSkillModal, setShowRemoveSkillModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await http.get(`${APIURL}/users/skills`);
        console.log("all", response.data);
        setSkills(response.data);
      } catch (error) {
        console.log(httpError);
      }
    };

    const fetchMySkills = async () => {
      try {
        const response = await http.get(`${APIURL}/mechanics/my-skills`);
        console.log("my skills", response.data);
        setMySkills(response.data);
        setSelectedIds(response.data.map((skill) => skill.id));
        setSelectedSkills(response.data);
      } catch (error) {
        console.log(httpError);
      }
    };

    fetchSkills();
    fetchMySkills();
  }, []);

  const navigation = useNavigation();

  const handleAddSkillsRequest = async () => {
    setLoading(true);
    try {
      await http.put(`${APIURL}/mechanics/add-skills`, selectedIds);
      setLoading(false);
      Alert.alert("Başarı", "Beceriler başarıyla eklendi!");
      setTimeout(() => {
        navigation.navigate("Profile Dashboard");
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.log(httpError(error));
      Alert.alert("Hata", "Beceri eklenirken bir hata oluştu.");
    }
  };

  const handleSelectSkill = (skill) => {
    if (selectedIds.includes(skill.id)) {
      // Remove skill from selected list
      setSelectedSkills((prev) => prev.filter((s) => s.id !== skill.id));
      setSelectedIds((prev) => prev.filter((id) => id !== skill.id));
    } else {
      // Add skill to selected list
      setSelectedSkills((prev) => [...prev, skill]);
      setSelectedIds((prev) => [...prev, skill.id]);
    }
  };

  const handleSkillAction = (action) => {
    if (action === "add" && selectedSkill) {
      handleSelectSkill(selectedSkill);
    } else if (action === "remove" && selectedSkill) {
      handleSelectSkill(selectedSkill);
    }
    setShowAddSkillModal(false);
    setShowRemoveSkillModal(false);
    setSelectedSkill(null);
  };

  return (
    <View style={styles.container}>
      {/* Add Skill Modal */}
      <Modal
        transparent={true}
        visible={showAddSkillModal}
        animationType="slide"
        onRequestClose={() => setShowAddSkillModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleSkillAction("add")}
            >
              <Text style={styles.modalButtonText}>Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowAddSkillModal(false)}>
              <Text style={styles.modalButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Remove Skill Modal */}
      <Modal
        transparent={true}
        visible={showRemoveSkillModal}
        animationType="slide"
        onRequestClose={() => setShowRemoveSkillModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleSkillAction("remove")}
            >
              <Text style={styles.modalButtonText}>Kaldır</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowRemoveSkillModal(false)}>
              <Text style={styles.modalButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.topHalf}>
        <Text style={styles.sectionTitle}>Tüm Beceriler</Text>
        <ScrollView contentContainerStyle={styles.skillsContainer}>
          {skills
            .filter((skill) => !selectedIds.includes(skill.id)) // Filter out selected skills
            .map((skill) => (
              <TouchableOpacity
                key={skill.id}
                style={[
                  styles.skillButton,
                  selectedIds.includes(skill.id) && styles.selectedSkill,
                ]}
                onPress={() => {
                  setSelectedSkill(skill);
                  setShowAddSkillModal(true);
                }}
              >
                <Text style={styles.skillText}>{skill.name}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
      <View style={styles.bottomHalf}>
        <Text style={styles.selectedTitle}>Seçilen</Text>
        <ScrollView contentContainerStyle={styles.selectedSkillsContainer}>
          {selectedSkills.map((skill) => (
            <TouchableOpacity
              key={skill.id}
              style={styles.selectedSkillItem}
              onPress={() => {
                setSelectedSkill(skill);
                setShowRemoveSkillModal(true);
              }}
            >
              <Text style={styles.selectedSkillText}>{skill.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.finalButton}
        onPress={() => {
          console.log(selectedIds);
          handleAddSkillsRequest();
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
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillButton: {
    width: "48%",
    margin: "1%",
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    alignItems: "center",
  },
  selectedSkill: {
    backgroundColor: "green",
  },
  skillText: {
    color: "#000",
  },
  selectedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  selectedSkillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectedSkillItem: {
    width: "48%",
    margin: "1%",
    padding: 10,
    backgroundColor: "#d0f0c0",
    borderRadius: 5,
    alignItems: "center",
  },
  selectedSkillText: {
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
