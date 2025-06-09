import { useContext, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { addStudent } from "../../requests/studentsRequests";
import { UserContext } from "../../context/userContext";
import { getUserID } from "../../utils/storID";
import { UploadFile } from "./uploadFile";
import Background from "../background";

export const AddStudent = ({ navigation }) => {
  const { dispatch } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState("");
  const [isAddClicked, setIsAddClicked] = useState(false);
  const initialForm = {
    name: "",
    lName: "",
    id: "",
    parentA: "",
    phoneA: "",
    parentB: "",
    phoneB: "",
  };
  const [form, setForm] = useState(initialForm);
  
  const closeModal = () => setModalVisible(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value.trim() });
  };

  const handleAdd = async () => {
    const { name, lName, id, parentA, phoneA } = form;
    if (!name || !lName || !id || !parentA || !phoneA) {
      setIsAddClicked(true);
      setError("יש למלא את כל השדות החיוניים");
      return;
    }
    const institutionNum = await getUserID();
    const newStudent = { ...form, institutionNum };
    await addStudent(dispatch, newStudent);
    setError("");
    setForm(initialForm);
    navigation.navigate("ManageStudents");
  };

  return (
    <Background>
      <ScrollView contentContainerStyle={style.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={style.modalBackdrop}>
            <UploadFile closeModal={closeModal} navigation={navigation} />
          </View>
        </Modal>
        <View style={style.form}>
          <LabelInput
            label="שם פרטי"
            value={form.name}
            onChangeText={(text) => handleChange("name", text.replace(/[^a-zA-Zא-ת\s]/g, ""))}
            error={isAddClicked && !form.name}
          />
          <LabelInput
            label="שם משפחה"
            value={form.lName}
            onChangeText={(text) => handleChange("lName", text.replace(/[^a-zA-Zא-ת\s]/g, ""))}
            error={isAddClicked && !form.lName}
          />
          <LabelInput
            label="תעודת זהות"
            value={form.id}
            onChangeText={(text) => handleChange("id", text.replace(/[^0-9]/g, ""))}
            error={isAddClicked && !form.id}
            keyboardType="numeric"
            maxLength={10}
          />
          <LabelInput
            label="הורה א'"
            value={form.parentA}
            onChangeText={(text) => handleChange("parentA", text.replace(/[^a-zA-Zא-ת\s]/g, ""))}
            error={isAddClicked && !form.parentA}
          />
          <LabelInput
            label="פלאפון הורה א'"
            value={form.phoneA}
            onChangeText={(text) => handleChange("phoneA", text.replace(/[^0-9]/g, ""))}
            error={isAddClicked && !form.phoneA}
            keyboardType="numeric"
            maxLength={10}
          />
          <LabelInput
            label="הורה ב'"
            value={form.parentB}
            onChangeText={(text) => handleChange("parentB", text.replace(/[^a-zA-Zא-ת\s]/g, ""))}
          />
          <LabelInput
            label="פלאפון הורה ב'"
            value={form.phoneB}
            onChangeText={(text) => handleChange("phoneB", text.replace(/[^0-9]/g, ""))}
            keyboardType="numeric"
            maxLength={10}
          />
          {error ? <Text style={style.errorText}>{error}</Text> : null}
        </View>

        <View style={style.bottonsContainer}>
          <TouchableOpacity style={style.fabButton} onPress={handleAdd}>
            <Text style={style.buttonText}>הוסף</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.fabButton} onPress={() => setModalVisible(true)}>
            <Text style={style.buttonText}>הוסף קובץ</Text>
          </TouchableOpacity>
          </View>
      </ScrollView>
    </Background>
  );
};

const LabelInput = ({ label, error, ...props }) => (
  <View style={style.inputGroup}>
    <Text style={style.label}>{label}</Text>
    <TextInput
      style={[style.input, error ? style.inputError : null]}
      {...props}
    />
  </View>
);

const style = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 30,
    alignItems: "stretch",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginBottom: 10,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  inputGroup: {
    marginHorizontal: 30
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10563b',
    marginTop: 5,
    marginHorizontal: 20
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: "#10563b",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  inputError: {
    borderColor: "red",
  },
  bottonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: '15%',
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  fabButton: {
    backgroundColor: "#10563b",
    width: '35%',
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
