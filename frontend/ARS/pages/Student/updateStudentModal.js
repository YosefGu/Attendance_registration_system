import { Modal, View, TextInput } from "react-native"
import { useState, useEffect, useContext } from 'react'
import styles from "../../utils/globalStyles"
import { CustomButton } from "../../utils/customButton"
import { StudentContext } from "../../context/studentsRequests"


export const UpdateStudentModal = ({onClose, visible, student}) => {
    const [name, setName] = useState('')
    const [lName, setLName] = useState('')
    const [id, setId] = useState('')
    const [parentA, setParentA] = useState('')
    const [phoneA, setPhoneA] = useState('')
    const [parentB, setParentB] = useState('')
    const [phoneB, setPhoneB] = useState('')

    const { updateStudent } = useContext(StudentContext)

    const closeModal = () => {
        onClose()
    }

    const handleUpdate = async () => {
        const updatedStudent = {
            name, lName, id, parentA,
            phoneA, parentB, phoneB
        }
        await updateStudent(student._id.$oid, updatedStudent)
        closeModal()
    }

    useEffect(() => {
        if (student) {
            setName(student.name)
            setLName(student.lName)
            setId(student.id.toString() || student.id)
            setParentA(student.parentA)
            setPhoneA(student.phoneA)
            setParentB(student.parentB || '')
            setPhoneB(student.phoneB || '')
        }
    }, [visible])
    
return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={closeModal}
    >
        <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
                <TextInput 
                    style={[styles.input]}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput 
                    style={[styles.input]}
                    placeholder="Family name"
                    value={lName}
                    onChangeText={setLName}
                />
                 <TextInput 
                    style={[styles.input]}
                    placeholder="ID"
                    value={id}
                    onChangeText={setId}
                    keyboardType="numeric"
                />
                <TextInput 
                    style={[styles.input]}
                    placeholder="Parent A"
                    value={parentA}
                    onChangeText={setParentA}
                />
                <TextInput 
                style={[styles.input]}
                placeholder="Phone A"
                value={phoneA}
                onChangeText={setPhoneA}
                keyboardType="numeric"
                maxLength={10}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Parent B"
                    value={parentB}
                    onChangeText={setParentB}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Phone B"
                    value={phoneB}
                    onChangeText={setPhoneB}
                    keyboardType="numeric"
                    maxLength={10}
                />
                <View style={styles.buttonsContainer}>
                    <CustomButton 
                        title='בטל'
                        onPress={() => closeModal()}
                    />
                    <CustomButton 
                        title='עדכן'
                        onPress={() => handleUpdate()}
                    />
                </View>
            </View>
        </View>
    </Modal>
  )
}
