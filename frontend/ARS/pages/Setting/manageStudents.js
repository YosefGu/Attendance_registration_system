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
import styles from "../../utils/globalStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { CustomButton } from "../../utils/customButton";
import { UserContext } from "../../context/userContext";
import { deleteStudent, updateStudent } from "../../requests/studentsRequests";

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
    <View style={styles.container}>
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
                  <Text style={style.text}>
                    {student.name} {student.lName}
                  </Text>
                  <MaterialIcons name="face" size={26} style={style.icon} />
                </View>

                <View style={style.box}>
                  <Text style={style.text}>
                    {student.parentA} {student.lName}
                  </Text>
                  <MaterialIcons name="person-2" size={28} style={style.icon} />
                </View>
                <View style={style.box}>
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
                  <MaterialIcons name="phone" size={24} style={style.icon} />
                </View>
                {student.parentB && student.phoneB && (
                  <>
                    <View style={style.box}>
                      <Text style={style.text}>
                        {student.parentB} {student.lName}
                      </Text>
                      <MaterialIcons
                        name="person-2"
                        size={28}
                        style={style.icon}
                      />
                    </View>
                    <View style={style.box}>
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
                      <MaterialIcons
                        name="phone"
                        size={24}
                        style={style.icon}
                      />
                    </View>
                  </>
                )}

                <View style={style.bottomContainer}>
                  <View style={style.deleteButton}>
                    <TouchableOpacity
                      style={style.box}
                      onPress={() => handleDelete(student._id.$oid)}
                    >
                      <MaterialIcons
                        name="delete"
                        size={28}
                        style={style.icon}
                      />
                      <Text>Delete</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={style.button}
                      onPress={() => handleSave(student._id.$oid)}
                    >
                      <Text style={style.buttonText}>שמור</Text>
                    </TouchableOpacity>
                  </View>
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
      <View style={style.buttonContainer}>
        <CustomButton title={"Add students"} onPress={handleAddStudents} />
      </View>
    </View>
  );
};

export const style = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  card: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cce1e8",
    marginVertical: 5,
    padding: 2,
    paddingTop: 5,
    borderRadius: 10,
    borderColor: "#095b80",
    borderWidth: 2,
  },
  expandCard: {
    flexDirection: "column",
    alignItems: "flex-end",
    backgroundColor: "#cce1e8",
    marginVertical: 5,
    padding: 20,
    borderRadius: 10,
    borderColor: "#095b80",
    borderWidth: 2,
  },
  bottomContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 15,
  },
  text: {
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 5,
  },
  box: {
    flexDirection: "row",
    paddingVertical: 5,
    alignItems: "center",
  },
  icon: {
    color: "#095170",
    marginLeft: 10,
  },
  deleteButton: {
    alignSelf: "flex-start",
  },
  button: {
    backgroundColor: "#095b80",
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "#e0e0e0",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    paddingHorizontal: 10,
    minWidth: 120,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
