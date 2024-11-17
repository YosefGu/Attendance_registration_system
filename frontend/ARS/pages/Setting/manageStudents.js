import {  View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView,Image} from "react-native"
import { useState, useContext } from 'react'
import styles from "../../utils/globalStyles"
import { CustomButton } from "../../utils/customButton"
import { UpdateStudentModal } from "../Student/updateStudentModal"
import { UserContext } from "../../context/userContext"
import { deleteStudent } from "../../requests/studentsRequests"

export const ManageStudents = ({ navigation }) => {
  const { state, dispatch } = useContext(UserContext)
  const [modalVisible, setModalVisibal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState('')
  
  const students = state.students

  const closeModal = () => {
    setModalVisibal(false)
  }

  const handleAddStudents = () => {
    navigation.navigate('AddStudent')
  }
  const handleDelete = (student_id) => {
    Alert.alert(
      "אישור מחיקה",
      "הינך בטוח ברצונך למחוק תלמיד זה?",
      [
        {
          text:'בטל',
        
        },
        {
          text:'מחק',
          onPress: () => deleteStudent(dispatch, student_id)
        }
    ])
  }
  const handleEdit = (student) => {
    setSelectedStudent(student)
    setModalVisibal(true)

  }



  return (
    <View style={[styles.container, studStyle.container]}>
      <UpdateStudentModal 
        visible={modalVisible}
        onClose={closeModal}
        student={selectedStudent}
      />

      <CustomButton title={'Add students'} onPress={handleAddStudents}/> 
      <ScrollView>
      { 
        students ? 
          students.map((student, index) => (
            <View style={studStyle.student} key={index}>
            <Text style={styles.text}>{student.name} {student.lName}</Text>

            <View style={studStyle.iconContainer}>
              <TouchableOpacity
                onPress={() => handleEdit(student)}
              >
                <Image 
                  source={require('../../icons/user_edit_icon.png')}
                  style={studStyle.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(student._id.$oid)}
              >
                <Image 
                  source={require('../../icons/delete_trash_icon.png')}
                  style={studStyle.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        )) : 
        null
      }
      </ScrollView>
      
    </View>
  )
}

export const studStyle = StyleSheet.create({
  container: {
    justifyContent:'flex-start'
  },
  student: {
    backgroundColor:'#7771',
    margin:2,
    padding:5,
    paddingHorizontal:10,
    flexDirection:'row-reverse',
    alignItems:'center',
    justifyContent:'space-between',
    borderRadius:10
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 35,
    height: 35,
    tintColor:'#068',
    marginHorizontal:5
  }
})


 