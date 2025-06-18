import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { UserContext } from "../../context/userContext";
import { deleteStudent, updateStudent } from "../../requests/studentsRequests";
import Background from "../background";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export const ManageStudents = ({ navigation }) => {
  const { state, dispatch } = useContext(UserContext);
  const students = state.students;

  const [expandCards, setExpandCards] = useState({});
  const [updatedPhoneA, setUpdatedPhoneA] = useState({});
  const [updatedPhoneB, setUpdatedPhoneB] = useState({});

  const handleExpend = (studenID) => {
    setExpandCards((prev) => ({
      ...prev,
      [studenID]: !prev[studenID],
    }));
  };

  const handlePhoneChangeA = (phone, studenId) => {
    setUpdatedPhoneA((prev) => ({
      ...prev,
      [studenId]: phone,
    }));
  };

  const handlePhoneChangeB = (phone, studenId) => {
    setUpdatedPhoneB((prev) => ({
      ...prev,
      [studenId]: phone,
    }));
  };

  const handleSave = async (studenId) => {
    const form = {
      phoneA: updatedPhoneA[studenId],
      phoneB: updatedPhoneB[studenId],
    };
    const result = await updateStudent(dispatch, studenId, form);
    if (result.error) {
      Alert.alert("Error updating student", result.error);
    } else {
      Alert.alert(result);
    }
  };

  const handleAddStudents = () => {
    navigation.navigate("AddStudent");
  };

  const handleDelete = (student_id) => {
    Alert.alert("אישור מחיקה", "הינך בטוח ברצונך למחוק תלמיד זה?", [
      {
        text: "בטל",
      },
      {
        text: "מחק",
        onPress: () => deleteStudent(dispatch, student_id),
      },
    ]);
  };

  useEffect(() => {
    const initialPhonesA = {};
    const initialPhonesB = {};
    students.forEach((student) => {
      initialPhonesA[student._id.$oid] = student.phoneA || "";
      initialPhonesB[student._id.$oid] = student.phoneB || "";
    });
    setUpdatedPhoneA(initialPhonesA);
    setUpdatedPhoneB(initialPhonesB);
  }, [students]);

  return (

    <Background>
      <ScrollView style={style.scrollView}>
        {students &&
          students.map((student, index) =>
            expandCards[student._id.$oid] ? (
              <TouchableOpacity
                style={style.expandCard}
                onPress={() => handleExpend(student._id.$oid)}
                key={index}
              >
                <Text style={style.title}>פרטי תלמיד</Text>
                <View style={style.box}>
                  <MaterialIcons name="face" size={26} style={style.icon} />
                  <Text style={style.text}>
                    {student.name} {student.lName}
                  </Text>
                </View>
                
                <View style={style.box}>
                  <MaterialIcons name="person-2" size={28} style={style.icon} />
                  <Text style={style.text}>
                    {student.parentA} {student.lName}
                  </Text>

                </View>
                <View style={style.box}>
                  <MaterialIcons name="phone" size={24} style={style.icon} />
                  <TextInput
                    style={style.input}
                    value={updatedPhoneA[student._id.$oid]}
                    onChangeText={(text) =>
                      handlePhoneChangeA(
                        text.replace(/[^0-9]/g, ""),
                        student._id.$oid
                      )
                    }
                    keyboardType="phone-pad"
                    maxLength={11}
                  />

                </View>
                {student.parentB && student.phoneB && (
                  <>
                    <View style={style.box}>
                      <MaterialIcons
                        name="person-2"
                        size={28}
                        style={style.icon}
                      />
                      <Text style={style.text}>
                        {student.parentB} {student.lName}
                      </Text>
                    </View>
                    <View style={style.box}>
                      <MaterialIcons
                        name="phone"
                        size={24}
                        style={style.icon}
                      />
                      <TextInput
                        style={style.input}
                        value={updatedPhoneB[student._id.$oid]}
                        onChangeText={(text) =>
                          handlePhoneChangeB(
                            text.replace(/[^0-9]/g, ""),
                            student._id.$oid
                          )
                        }
                        keyboardType="phone-pad"
                        maxLength={11}
                      />

                    </View>
                  </>
                )}

                <View style={style.bottonsContainer}>
                  <TouchableOpacity style={style.fabButton} onPress={() => handleSave(student._id.$oid)}>
                    <FontAwesome name="save" size={24} color="white" />
                    <Text style={style.buttonText}>שמור</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.fabButton} onPress={() => handleDelete(student._id.$oid)}>
                    <FontAwesome name="trash" size={24} color="white" />
                    <Text style={style.buttonText}>מחק</Text>
                  </TouchableOpacity>
                  </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={style.card}
                onPress={() => handleExpend(student._id.$oid)}
                key={index}
              >
                <Text style={style.text}>
                  {student.name} {student.lName}
                </Text>
                <MaterialIcons name="expand-more" size={28} />
              </TouchableOpacity>
            )
          )}
      </ScrollView>
      <View style={style.fabContainer}>
        <TouchableOpacity style={style.fabButton} onPress={handleAddStudents}>  
          <AntDesign name="adduser" size={24} color="white" />
          <Text style={style.buttonText}>הוסף</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export const style = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginVertical: 20,
    marginHorizontal:20
  },
  card: {
    backgroundColor: "#ecf9f4",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 35,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  expandCard: {
    backgroundColor: "#e1f5e5",
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#10563b",
    marginBottom: 12,
    alignSelf: "center",
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  icon: {
    color: "#10563b",
    marginRight: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#10563b",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    minWidth: '45%',
    textAlign: 'right'
  },
  bottonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  fabContainer: {
    position: "absolute",
    bottom: 20,
    right: "41.5%",
    alignItems: "center",
    justifyContent: "center",
   
  },
  fabButton: {
    backgroundColor: "#10563b",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
