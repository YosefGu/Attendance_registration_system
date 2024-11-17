import { useContext, useState } from "react";
import { Text, View, TextInput } from "react-native";
import styles from "../../utils/globalStyles";
import { CustemModal } from "./modal";
import { CustomButton } from "../../utils/customButton";
import { addStudent } from "../../requests/studentsRequests";
import { UserContext } from '../../context/userContext'
import { getUserID } from "../../utils/storID";

export const AddStudent = ({ navigation }) => {
    const { dispatch } = useContext(UserContext)
    const [form, setForm] = useState({
        name: '',
        lName: '',
        id: '',
        parentA: '',
        phoneA: '',
        parentB: '',
        phoneB: ''
    });
    const [error, setError] = useState('');
    const [isAddClicked, setIsAddClicked] = useState(false);
    const [modalVisible, setModalVisibal] = useState(false);

    const closeModal = () => {
        setModalVisibal(false);
    };

    const handleChange = (key, value) => {
        setForm({
            ...form,
            [key]: value
        });
    };

    const handleAdd = async () => {
        const { name, lName, id, parentA, phoneA } = form;
        if (!name || !lName || !id || !parentA || !phoneA) {
            setIsAddClicked(true);
            setError('The fields MUST be filled.');
            return;
        }
        const institutionNum = await getUserID()
        const newStudent = { ...form, institutionNum };
        console.log(newStudent)
        await addStudent(dispatch, newStudent); 

        setError('');
        setForm({
            name: '',
            lName: '',
            id: '',
            parentA: '',
            phoneA: '',
            parentB: '',
            phoneB: ''
        });
        navigation.navigate('ManageStudents');
    };

    return (
        <View style={styles.container}>
            <CustomButton title="Upload a file" onPress={() => setModalVisibal(true)} />
            <CustemModal 
                visible={modalVisible}
                onClose={closeModal}
                navigation={navigation}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <TextInput 
                style={[styles.input, isAddClicked && !form.name ? styles.inputError : null]}
                placeholder="Name"
                value={form.name}
                onChangeText={(text) => handleChange('name', text.replace(/[^a-zA-Zא-ת\s]/g, ''))}
            />
            <TextInput 
                style={[styles.input, isAddClicked && !form.lName ? styles.inputError : null]}
                placeholder="Family name"
                value={form.lName}
                onChangeText={(text) => handleChange('lName', text.replace(/[^a-zA-Zא-ת\s]/g, ''))}
            />
            <TextInput 
                style={[styles.input, isAddClicked && !form.id ? styles.inputError : null]}
                placeholder="ID"
                value={form.id}
                onChangeText={(text) => handleChange('id', text.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
                maxLength={10}
            />
            <TextInput 
                style={[styles.input, isAddClicked && !form.parentA ? styles.inputError : null]}
                placeholder="Parent A"
                value={form.parentA}
                onChangeText={(text) => handleChange('parentA', text.replace(/[^a-zA-Zא-ת\s]/g, ''))}
            />
            <TextInput 
                style={[styles.input, isAddClicked && !form.phoneA ? styles.inputError : null]}
                placeholder="Phone A"
                value={form.phoneA}
                onChangeText={(text) => handleChange('phoneA', text.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
                maxLength={10}
            />
            <TextInput 
                style={styles.input}
                placeholder="Parent B"
                value={form.parentB}
                onChangeText={(text) => handleChange('parentB', text.replace(/[^a-zA-Zא-ת\s]/g, ''))}
            />
            <TextInput 
                style={styles.input}
                placeholder="Phone B"
                value={form.phoneB}
                onChangeText={(text) => handleChange('phoneB', text.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
                maxLength={10}
            />
            <CustomButton title="Add" onPress={handleAdd} />
        </View>
    );
};
