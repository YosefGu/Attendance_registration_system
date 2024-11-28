import {
  Text,
  View,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useContext, useState } from "react";
import { CustomButton } from "../../utils/customButton";
import { AuthContext } from "../../context/auth";
import { getUserID } from "../../utils/storID";
import { deleteUser, updateUser } from "../../requests/userRequests1";
import { UserContext } from "../../context/userContext";
import AntDesign from "react-native-vector-icons/AntDesign";

export const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const user = state.user;
  const { logout } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: user.email,
    phone: user.phone,
  });
  const [error, setError] = useState("");

  const handleChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const delete_User = async () => {
    const id = await getUserID();
    await deleteUser(id);
    logout();
  };

  const handleUpdate = async () => {
    if (!form.email || !form.phone) {
      setError("The fields MUST be filled.");
      return;
    } else if (password != confirmPass) {
      setError("The password is not match.");
      return;
    } else if (
      user.email == form.email &&
      user.phone == form.phone &&
      password == ""
    ) {
      return;
    }
    const updatedForm = password !== "" ? { ...form, password } : form;
    const result = await updateUser(dispatch, updatedForm);
    if (result.error) {
      Alert.alert("Error updating user: ", result.error);
    } else {
      setConfirmPass("");
      setPassword("");
      Alert.alert(result);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete?\nAll data belonging to this account will also be deleted.",

      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          onPress: delete_User,
        },
      ]
    );
  };

  return (
    <ScrollView style={style.container}>
      <View style={style.topContainer}>
        <View style={style.box}>
          <Text style={style.name}>
            {user.fName} {user.lName}
          </Text>
          <AntDesign name="user" size={24} />
        </View>

        <View style={style.box}>
          <TextInput
            placeholder="Phone"
            value={form.phone}
            onChangeText={(text) =>
              handleChange("phone", text.replace(/[^0-9]/g, ""))
            }
            keyboardType="phone-pad"
            style={style.input}
            maxLength={10}
          />
          <AntDesign name="phone" size={20} />
        </View>

        <View style={style.box}>
          <TextInput
            placeholder="Mail"
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
            style={style.input}
            textContentType="emailAddress"
            maxLength={30}
          />
          <AntDesign name="mail" size={20} />
        </View>
      </View>

      <View style={style.paasContainer}>
        <Text style={style.text}>עדכון סיסמא</Text>
        <TextInput
          placeholder="New password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={style.input}
          maxLength={30}
          textContentType="password"
        />

        <TextInput
          placeholder="Confirme password"
          value={confirmPass}
          onChangeText={(text) => setConfirmPass(text)}
          style={style.input}
          maxLength={30}
          textContentType="password"
        />
        {error ? <Text>{error}</Text> : null}
      </View>

      <View style={style.buttonContainer}>
        <CustomButton title="Update" onPress={handleUpdate} />
        <CustomButton title="Delete Account" onPress={handleDelete} />
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f4fa",
    paddingBottom: 15,
  },
  topContainer: {
    padding: 10,
    margin: 10,
    marginTop: "30%",
    right: "20%",
  },
  paasContainer: {
    margin: 10,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "15%",
    margin: 10,
  },
  box: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 3,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    marginVertical: 5,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: "#095b80",
    borderRadius: 10,
    minWidth: 150,
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
});
