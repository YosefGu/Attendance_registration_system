import { Modal, View, TextInput } from "react-native";
import { useState, useEffect, useContext } from "react";
import styles from "../../utils/globalStyles";
import { CustomButton } from "../../utils/customButton";
import { UserContext } from "../../context/userContext";
import { updateStudent } from "../../requests/studentsRequests";

export const UpdateStudentModal = ({ onClose, visible, student }) => {
    const { dispatch } = useContext(UserContext);
    const [form, setForm] = useState({
    name: '',
    lName: '',
    id: '',
    parentA: '',
    phoneA: '',
    parentB: '',
    phoneB: ''
  });

  const closeModal = () => {
    onClose();
  };

  const handleChange = (key, value) => {
    setForm({
      ...form,
      [key]: value
    });
  };

  const handleUpdate = async () => {
    const updatedStudent = { ...form }; 
    await updateStudent(dispatch, student._id.$oid, updatedStudent);
    closeModal();
  };


  useEffect(() => {
    if (student) {
      setForm({
        name: student.name || '',
        lName: student.lName || '',
        id: student.id.toString() || '',
        parentA: student.parentA || '',
        phoneA: student.phoneA || '',
        parentB: student.parentB || '',
        phoneB: student.phoneB || ''
      });
    }
  }, [visible]); 

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
            style={styles.input}
            placeholder="Name"
            value={form.name}
            onChangeText={(text) => handleChange('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Family name"
            value={form.lName}
            onChangeText={(text) => handleChange('lName', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="ID"
            value={form.id}
            onChangeText={(text) => handleChange('id', text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Parent A"
            value={form.parentA}
            onChangeText={(text) => handleChange('parentA', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone A"
            value={form.phoneA}
            onChangeText={(text) => handleChange('phoneA', text)}
            keyboardType="numeric"
            maxLength={10}
          />
          <TextInput
            style={styles.input}
            placeholder="Parent B"
            value={form.parentB}
            onChangeText={(text) => handleChange('parentB', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone B"
            value={form.phoneB}
            onChangeText={(text) => handleChange('phoneB', text)}
            keyboardType="numeric"
            maxLength={10}
          />
          <View style={styles.buttonsContainer}>
            <CustomButton title="Cancel" onPress={closeModal} />
            <CustomButton title="Update" onPress={handleUpdate} />
          </View>
        </View>
      </View>
    </Modal>
  );
};
