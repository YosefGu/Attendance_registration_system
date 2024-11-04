import { Text, View, StyleSheet, ScrollView } from "react-native"
import { StudentContext } from "../../context/studentsRequests"
import { useContext } from 'react'
import styles from "../../utils/globalStyles"
import { CustomButton } from "../../utils/customButton"
import { CheckBox } from "react-native-elements"
import { AttendanceContext } from "../../context/attendanceContext"



export const Attendance = () => {

  const { students } = useContext(StudentContext)
  const { checkedIds, setCheckedIds, addAttendancList } = useContext(AttendanceContext)

  const handleCheckbox = (studentID) => {
    if (checkedIds.includes(studentID)) {
      setCheckedIds(checkedIds.filter(_id => _id !== studentID))
    } else {
      setCheckedIds([...checkedIds, studentID])
    }
  }


  const handleSave = async () => {
    data = {
      "checkedIDs": checkedIds,
      "uncheckedIDs": students.reduce((result, student) => {
        if (!checkedIds.includes(student._id)) result.push(student._id)
          return result
      }, [])
    }
    await addAttendancList(data)
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      { 
        students ? 
        students.map((student, index) => (        
          <View 
            style={localStyle.student}
            key={index}
          >
            <CheckBox  
            checked={checkedIds.some(item => item.$oid === student._id.$oid)}
            onPress={() => handleCheckbox(student._id)}
            />
            <Text
              style={checkedIds.includes(student._id) ? localStyle.checkedText : localStyle.uncheckedText}
            > {`${student.name} ${student.lName}`}
            </Text>
          </View>
         
        ))
        : null
      }
      </ScrollView>
      <CustomButton 
        title='שמור'
        onPress={handleSave}
      />
   </View>
  )
}

const localStyle = StyleSheet.create({
  student: {
    backgroundColor:'#7771',
    margin:2,
    flexDirection:'row-reverse',
    alignItems:'center'
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
    textAlign: 'right',
  },
  uncheckedText: {
    color: 'black',
    textAlign: 'right',
  },
})
