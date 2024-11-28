import { Text, View, StyleSheet, ScrollView, Alert } from "react-native";
import { useContext, useState } from "react";
import styles from "../../utils/globalStyles";
import { CustomButton } from "../../utils/customButton";
import { CheckBox } from "react-native-elements";
import { UserContext } from "../../context/userContext";
import { addAttendancList } from "../../requests/attendanceRequests";
import { getUserID } from "../../utils/storID";

export const Attendance = () => {
  const { state, dispatch } = useContext(UserContext);
  const students = state.students;
  const [checkedIds, setCheckedIds] = useState(
    state.attendance.checkedIDs || []
  );
  const handleCheckbox = (studentID) => {
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
        if (!checkedIds.includes(student._id)) result.push(student._id);
        return result;
      }, []),
    };

    const result = await addAttendancList(dispatch, data);
    if (result.error) {
      Alert.alert(result.error);
    } else {
      Alert.alert(result);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>רישום נוכחות</Text>
      <ScrollView style={style.scrollView}>
        {students &&
          students.map((student, index) => (
            <View style={style.personCard} key={index}>
              <CheckBox
                checked={checkedIds.some(
                  (item) => item.$oid === student._id.$oid
                )}
                onPress={() => handleCheckbox(student._id)}
              />
              <Text
                style={[
                  checkedIds.some((item) => item.$oid === student._id.$oid)
                    ? style.checkedText
                    : style.uncheckedText,
                  styles.title2,
                ]}
              >
                {" "}
                {`${student.name} ${student.lName}`}
              </Text>
            </View>
          ))}
      </ScrollView>
      <View style={style.buttonContainer}>
        <CustomButton title="שמור" onPress={handleSave} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  personCard: {
    backgroundColor: "#cce1e8",
    margin: 5,
    flexDirection: "row-reverse",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#095b80",
    borderWidth: 2,
  },
  checkedText: {
    textDecorationLine: "line-through",
    color: "gray",
    textAlign: "right",
  },
  uncheckedText: {
    color: "black",
    textAlign: "right",
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
