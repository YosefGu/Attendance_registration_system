import { Text, View, StyleSheet, ScrollView } from "react-native"
import { useContext, useState } from 'react'
import styles from "../../utils/globalStyles"
import { CustomButton } from "../../utils/customButton"
import { CheckBox } from "react-native-elements"
import { UserContext } from "../../context/userContext"
import { addAttendancList } from "../../requests/attendanceRequests"
import { getUserID } from "../../utils/storID"



export const Attendance = () => {
  const { state, dispatch } = useContext(UserContext)
  const students = state.students
  const [checkedIds, setCheckedIds] = useState(state.attendance.checkedIDs || [])


  const handleCheckbox = (studentID) => {
    if (checkedIds.some(item => item.$oid === studentID.$oid)) {
      setCheckedIds(checkedIds.filter(_id => _id.$oid !== studentID.$oid))
    } else {
      setCheckedIds([...checkedIds, studentID])
    }
  }


  const handleSave = async () => {
    const id = await getUserID()
    const data = {
      "institutionNum": id,
      "checkedIDs": checkedIds,
      "uncheckedIDs": students.reduce((result, student) => {
        if (!checkedIds.includes(student._id)) result.push(student._id)
          return result
      }, [])
    }
    await addAttendancList(dispatch, data)
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
              style={checkedIds.some(item => item.$oid === student._id.$oid) ? localStyle.checkedText : localStyle.uncheckedText}
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
