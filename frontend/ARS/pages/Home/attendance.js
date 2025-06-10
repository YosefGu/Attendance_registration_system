import { Text, View, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { addAttendancList } from "../../requests/attendanceRequests";
import { getUserID } from "../../utils/storID";
import { FontAwesome } from "@expo/vector-icons";
import Background from "../background";
import { getPeriodData } from "../../requests/periodRequests";


export const Attendance = () => {
  const { state, dispatch } = useContext(UserContext);
  const students = state.students;
  const [checkedIds, setCheckedIds] = useState(state.attendance.checkedIDs || []);

  const handleToggle = (studentID) => {
    if (checkedIds.some((item) => item.$oid === studentID.$oid)) {
      setCheckedIds(checkedIds.filter((_id) => _id.$oid !== studentID.$oid));
    } else {
      setCheckedIds([...checkedIds, studentID]);
    }
  };

  const handleSave = async () => {
    const id = await getUserID();
    const data = {
      institutionNum: id,
      checkedIDs: checkedIds,
      uncheckedIDs: students.reduce((result, student) => {
        if (!checkedIds.find((s) => s.$oid === student._id.$oid)) result.push(student._id);
        return result;
      }, []),
    };

    const result = await addAttendancList(dispatch, data);
    if (result.error) {
      Alert.alert("שגיאה", "ארעה שגיאה בעת שמירת הנתונים.")
    } else {
      //מעדכן את הנתונים מקומית בסטיטיקת הנתונים
      getPeriodData(dispatch)
      Alert.alert("הודעה", "הנתונים נשמרו בהצלחה!")
    }
  };

  return (
    <Background>
        <ScrollView style={style.scrollView}>
          {students.map((student, index) => {
            const isChecked = checkedIds.some((item) => item.$oid === student._id.$oid);
            return (
              <TouchableOpacity
                key={index}
                style={[style.card, isChecked ? style.cardChecked : style.cardUnchecked]}
                onPress={() => handleToggle(student._id)}
                activeOpacity={0.8}
              >
                <FontAwesome
                  name={isChecked ? "check-circle" : "circle-thin"}
                  size={24}
                  color={isChecked ? "#10563b" : "#666"}
                  style={style.icon}
                />
                <Text style={[style.cardText, isChecked && style.cardTextChecked]}>
                  {`${student.name} ${student.lName}`}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={style.fabContainer}>
          <TouchableOpacity 
            style={style.fabButton} 
            onPress={handleSave}
            disabled={checkedIds != null}
            >  
            <FontAwesome name="save" size={24} color="white" />
            <Text style={{color:'white', fontWeight:'bold'}}>שמור</Text>
          </TouchableOpacity>
        </View>
    </Background>
  );
};

const style = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardChecked: {
    backgroundColor: "#e1f5e5",
    borderLeftWidth: 5,
    borderLeftColor: "#10563b",
  },
  cardUnchecked: {
    backgroundColor: "#ecf9f4",
    borderLeftWidth: 5,
    borderLeftColor: "#ccc",
  },
  cardText: {
    fontSize: 18,
    color: "#333",
    textAlign: "right",
  },
  cardTextChecked: {
    color: "#10563b",
    fontWeight: "bold",
  },
  icon: {
    marginRight: 10,
  },
  buttonContainer: {
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  fabContainer: {
    position: "absolute",
    bottom: 30,
    right: 40,
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
