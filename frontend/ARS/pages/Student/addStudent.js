import { useState, useContext } from "react"
import { Text, View, TextInput } from "react-native"
import styles from "../../utils/globalStyles"
import { CustemModal } from "./modal"
import { CustomButton } from "../../utils/customButton"
import { StudentContext } from "../../context/studentsRequests"



export const AddStudent = ({ navigation }) => {
    const [name, setName] = useState('')
    const [lName, setLName] = useState('')
    const [id, setId] = useState('')
    const [parentA, setParentA] = useState('')
    const [phoneA, setPhoneA] = useState('')
    const [parentB, setParentB] = useState('')
    const [phoneB, setPhoneB] = useState('') 

    const [error, setError] = useState('')

    const [isAddClicked, setIsAddClicked] = useState(false)
    const [modalVisible, setModalVisibal] = useState(false)

    const { addStudent } = useContext(StudentContext)

    const closeModal = () => {
        setModalVisibal(false)
    }

    const handleAdd = async () => {
        if(!name || !lName || !id || !parentA || !phoneA){
            setIsAddClicked(true)
            setError('The fields MUST be filed.')
            return
        }
        const newStudent = {
            name, lName, id,
            parentA, phoneA,
            parentB, phoneB
        }

        await addStudent(newStudent)
        setError('')

        setName('')
        setLName('')
        setId('')
        setParentA('')
        setPhoneA('')
        setParentB('')
        setPhoneB('')
        navigation.navigate('ManageStudents')
    }

    return (
    <View style={styles.container}>
        <CustomButton title='Upload a file' onPress={() => setModalVisibal(true)}/>
        <CustemModal 
            visible={modalVisible}
            onClose={closeModal}
            navigation={navigation}
        />
        {error ? <Text>{error}</Text> : null}
        <TextInput 
            style={[styles.input, isAddClicked && !name ? styles.inputError : null]}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text.replace(/[^a-zA-Zא-ת\s]/g, ''))}
        />
        <TextInput 
            style={[styles.input, isAddClicked && !lName ? styles.inputError : null]}
            placeholder="Family name"
            value={lName}
            onChangeText={(text) => setLName(text.replace(/[^a-zA-Zא-ת\s]/g, ''))}
        />
         <TextInput 
            style={[styles.input, isAddClicked && !id ? styles.inputError : null]}
            placeholder="ID"
            value={id}
            onChangeText={(text) => setId(text.replace(/[^0-9]\s]/g, ''))}
            keyboardType="numeric"
            maxLength={10}
        />
        <TextInput 
            style={[styles.input, isAddClicked && !parentA ? styles.inputError : null]}
            placeholder="Parent A"
            value={parentA}
            onChangeText={(text) => setParentA(text.replace(/[^a-zA-Zא-ת\s]/g, ''))}
        />
        <TextInput 
        style={[styles.input, isAddClicked && !phoneA ? styles.inputError : null]}
        placeholder="Phone A"
        value={phoneA}
        onChangeText={(text) => setPhoneA(text.replace(/[^0-9]\s]/g, ''))}
        keyboardType="numeric"
        maxLength={10}
        />
        <TextInput 
            style={styles.input}
            placeholder="Parent B"
            value={parentB}
            onChangeText={(text) => setParentB(text.replace(/[^a-zA-Zא-ת\s]/g, ''))}
        />
        <TextInput 
            style={styles.input}
            placeholder="Phone B"
            value={phoneB}
            onChangeText={(text) => setPhoneB(text.replace(/[^0-9]\s]/g, ''))}
            keyboardType="numeric"
            maxLength={10}
        />
        <CustomButton title='Add' onPress={handleAdd}/>
    </View>
  )
}
