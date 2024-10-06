import { Text, View, Button, TextInput } from "react-native"
import styles from "../../utils/globalStyles"
import { useState } from "react"


export const AddStudent = () => {
    const [name, setName] = useState('')
    const [lName, setLName] = useState('')
    const [parentA, setParentA] = useState('')
    const [phoneA, setPhoneA] = useState('')
    const [parentB, setParentB] = useState('')
    const [phoneB, setPhoneB] = useState('')
    
    const [error, setError] = useState('')
    const [isAddClicked, setIsAddClicked] = useState(false)

    const handleAdd = () => {

        if(!name || !lName || !parentA || !phoneA || !parentB || !phoneB){
            setIsAddClicked(true)
            setError('The fields MUST be filed.')
            return
        }
        setError('')

        setName('')
        setLName('')
        setParentA('')
        setPhoneA('')
        setParentB('')
        setPhoneB('')
    }

    return (
    <View style={styles.container}>
        {error ? <Text>{error}</Text> : null}
        <TextInput 
            style={[styles.input, isAddClicked && !name ? styles.inputError : null]}
            placeholder="Name"
            value={name}
            onChangeText={setName}
        />
        <TextInput 
            style={[styles.input, isAddClicked && !lName ? styles.inputError : null]}
            placeholder="Family name"
            value={lName}
            onChangeText={setLName}
        />
        <TextInput 
            style={[styles.input, isAddClicked && !parentA ? styles.inputError : null]}
            placeholder="Parent A"
            value={parentA}
            onChangeText={setParentA}
        />
        <TextInput 
        style={[styles.input, isAddClicked && !phoneA ? styles.inputError : null]}
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
        <View style={styles.buttonContainer}>
            <Button 
                title="Add"
                onPress={handleAdd}
            />
        </View>
    </View>
  )
}
