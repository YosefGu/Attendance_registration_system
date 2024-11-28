import { useContext, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import styles from "../../utils/globalStyles";
import { CustomButton } from "../../utils/customButton";
import { addStudent } from "../../requests/studentsRequests";
import { UserContext } from "../../context/userContext";
import { getUserID } from "../../utils/storID";
import { UploadFile } from "./uploadFile";

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

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleAdd = async () => {
    const { name, lName, id, parentA, phoneA } = form;
    if (!name || !lName || !id || !parentA || !phoneA) {
      setIsAddClicked(true);
      setError("The fields must be filled in.");
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
    <ScrollView style={style.container}>
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

      <Text style={styles.title}>הוספת תלמיד</Text>

      <View style={style.innerContainer}>
        {error && <Text style={style.text}>{error}</Text>}
        <TextInput
          style={[
            styles.input,
            isAddClicked && !form.name ? styles.inputError : null,
          ]}
          placeholder="Name"
          value={form.name}
          onChangeText={(text) =>
            handleChange("name", text.replace(/[^a-zA-Zא-ת\s]/g, ""))
          }
        />
        <TextInput
          style={[
            styles.input,
            isAddClicked && !form.lName ? styles.inputError : null,
          ]}
          placeholder="Family name"
          value={form.lName}
          onChangeText={(text) =>
            handleChange("lName", text.replace(/[^a-zA-Zא-ת\s]/g, ""))
          }
        />
        <TextInput
          style={[
            styles.input,
            isAddClicked && !form.id ? styles.inputError : null,
          ]}
          placeholder="ID"
          value={form.id}
          onChangeText={(text) =>
            handleChange("id", text.replace(/[^0-9]/g, ""))
          }
          keyboardType="numeric"
          maxLength={10}
        />
        <TextInput
          style={[
            styles.input,
            isAddClicked && !form.parentA ? styles.inputError : null,
          ]}
          placeholder="Parent A"
          value={form.parentA}
          onChangeText={(text) =>
            handleChange("parentA", text.replace(/[^a-zA-Zא-ת\s]/g, ""))
          }
        />
        <TextInput
          style={[
            styles.input,
            isAddClicked && !form.phoneA ? styles.inputError : null,
          ]}
          placeholder="Phone A"
          value={form.phoneA}
          onChangeText={(text) =>
            handleChange("phoneA", text.replace(/[^0-9]/g, ""))
          }
          keyboardType="numeric"
          maxLength={10}
        />
        <TextInput
          style={styles.input}
          placeholder="Parent B"
          value={form.parentB}
          onChangeText={(text) =>
            handleChange("parentB", text.replace(/[^a-zA-Zא-ת\s]/g, ""))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Phone B"
          value={form.phoneB}
          onChangeText={(text) =>
            handleChange("phoneB", text.replace(/[^0-9]/g, ""))
          }
          keyboardType="numeric"
          maxLength={10}
        />
      </View>
      <View style={style.button}>
        <CustomButton title="הוסף" onPress={handleAdd} />
      </View>
      <View style={style.button}>
        <CustomButton title="העלה קובץ" onPress={() => setModalVisible(true)} />
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "20%",
    backgroundColor: "#e6f4fa",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  innerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    justifyContent: "center",
  },
  button: {
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 10,
  },
});
