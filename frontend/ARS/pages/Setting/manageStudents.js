import { TouchableOpacity, View, Image, StyleSheet, Text, Alert} from "react-native"
import { useState, useContext, useEffect } from 'react'
import styles from "../../utils/globalStyles"
import { CustomButton } from "../../utils/customButton"
import { UpdateStudentModal } from "../Student/updateStudentModal"
import { StudentContext } from "../../context/studentsRequests"

export const ManageStudents = ({ navigation }) => {
  const [modalVisible, setModalVisibal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState('')

  const { students, deleteStudent } = useContext(StudentContext)

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
          onPress: () => deleteStudent(student_id)
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
      {/* {students ? students.map((student, index) => console.log(student)) : null} */}
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
      
    </View>
  )
}

export const studStyle = StyleSheet.create({
  container: {
    justifyContent:'flex-start'
  },
  student: {
    flexDirection: 'row-reverse',
    alignItems:'center',
    justifyContent: 'space-between',
    paddingRight:5,
    marginBottom:5,
    borderRadius:10,
    borderBottomWidth:4,
    borderRightWidth:4
    
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 35,
    height: 35,
    tintColor:'#0f5168',
    marginHorizontal:5
  }
})


 