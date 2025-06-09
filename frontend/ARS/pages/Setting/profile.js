import {
  Text,
  View,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useContext, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { AuthContext } from "../../context/auth";
import { getUserID } from "../../utils/storID";
import { deleteUser, updateUser } from "../../requests/userRequests1";
import { UserContext } from "../../context/userContext";
import Background from "../background";

export const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const { logout } = useContext(AuthContext);

  const user = state.user;
  const [form, setForm] = useState({
    email: user.email,
    phone: user.phone,
  });

  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const hasNotChange = () => {
    return (
      user.email === form.email &&
      user.phone === form.phone &&
      password === ""
    )
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const delete_User = async () => {
    const id = await getUserID();
    await deleteUser(id);
    logout();
  };

  const handleUpdate = async () => {
    if (!form.email || !form.phone) {
      setError("כל השדות חייבים להיות מלאים.");
      return;
    } else if (password !== confirmPass) {
      setError("הסיסמאות אינן תואמות!");
      return;
    } else if (hasNotChange())
      return;


    const updatedForm = password ? { ...form, password } : form;
    const result = await updateUser(dispatch, updatedForm);

    if (result.error) {
      Alert.alert("שגיאה", result.error);
    } else {
      setConfirmPass("");
      setPassword("");
      Alert.alert("הפרטים עודכנו בהצלחה!");
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "אישור מחיקה",
      "האם את בטוחה שברצונך למחוק את החשבון? כל המידע יימחק לצמיתות.",
      [
        { text: "ביטול" },
        { text: "מחק", onPress: delete_User, style: "destructive" },
      ]
    );
  };

  return (
    <Background>
      <ScrollView style={style.container}>
        <Text style={style.title}>פרטי משתמש</Text>

        <View style={style.box}>
          <AntDesign name="user" size={24} style={style.icon} />
          <Text style={style.label}>
            {user.fName} {user.lName}
          </Text>
        </View>

        <View style={style.box}>
          <AntDesign name="phone" size={24} style={style.icon} />
          <TextInput
            style={style.input}
            value={form.phone}
            onChangeText={(text) => handleChange("phone", text.replace(/[^0-9]/g, ""))}
            keyboardType="phone-pad"
            maxLength={10}
            placeholder="מספר טלפון"
          />
        </View>

        <View style={style.box}>
          <AntDesign name="mail" size={24} style={style.icon} />
          <TextInput
            style={style.input}
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            placeholder="אימייל"
            maxLength={30}
          />
        </View>

        <Text style={style.sectionTitle}>עדכון סיסמה</Text>

        <View style={style.box}>
          <AntDesign name="lock" size={24} style={style.icon} />
          <TextInput
            style={style.input}
            value={password}
            onChangeText={setPassword}
            placeholder="סיסמה חדשה"
          />
        </View>

        <View style={style.box}>
          <AntDesign name="lock" size={24} style={style.icon} />
          <TextInput
            style={style.input}
            value={confirmPass}
            onChangeText={setConfirmPass}
            placeholder="אימות סיסמה"
          />
        </View>

        {error ? <Text style={style.error}>{error}</Text> : null}

        <View style={style.buttonContainer}>
          <TouchableOpacity 
            style={style.button} 
            onPress={handleUpdate}
            disabled={hasNotChange()}
            >
            <Text style={style.buttonText}>עדכן</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[style.button, style.deleteButton]} 
            onPress={handleDelete}
            >
            <Text style={style.buttonText}>מחק חשבון</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Background>
  );
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: "7%",
    paddingVertical: "10%",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#10563b",
    textAlign: "center",
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#10563b",
    marginTop: 30,
    marginBottom: 10,
    textAlign: "center",
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 5,
  },
  icon: {
    color: "#10563b",
    marginRight: 10,
  },
  label: {
    fontSize: 18,
    color: "#333",
  },
  input: {
    flex: 1,
    fontSize: 18,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#177d56",
    textAlign:'left'
  },
  error: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent:'space-around'
  },
  button: {
    backgroundColor: "#177d56",
    paddingVertical: 15,
    minWidth:'40%',
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
  },
  deleteButton: {
    backgroundColor: "#c0392b",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
