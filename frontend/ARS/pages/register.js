import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { AuthContext } from "../context/auth";
import { signup } from "../requests/userRequests1";
import { LoadingScreen } from "./loadingScreen";
import Background from "./background";

export const Register = ({ navigation }) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);

  const [form, setForm] = useState({
    fName: "",
    lName: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleBack = () => {
    navigation.navigate("Login")
  }
  const handleChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const trimForm = () => {
    const newForm = {};
    for (const key in form) {
      newForm[key] = form[key].replace(/\s+/g, " ").trim();
    }
    setForm(newForm);
    return newForm;
  };

  const handleRegister = async () => {
    const form = trimForm();
    if (!form.fName || !form.lName || !form.phone || !form.email || !form.password || !confirmPassword) {
      setIsRegisterClicked(true);
      return;
    }
    if (form.password !== confirmPassword) {
      setAlert("הסיסמאות אינן תואמות");
      return;
    }

    setLoading(true);
    const result = await signup(form);
    if (result.error) {
      Alert.alert(result.error);
      setLoading(false);
    } else {
      Alert.alert(result);
      setIsAuthenticated(true);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Background>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <ScrollView contentContainerStyle={style.scrollContainer}>
          <Text style={style.title}>הרשמה</Text>
          <Text style={style.subTitle}>שם פרטי</Text>
          <TextInput
            style={[style.input, isRegisterClicked && !form.fName && style.inputError]}
            value={form.fName}
            onChangeText={(text) => handleChange("fName", text)}
            keyboardType="default"
            autoCapitalize="words"
            maxLength={20}
          />

          <Text style={style.subTitle}>שם משפחה</Text>
          <TextInput
            style={[style.input, isRegisterClicked && !form.lName && style.inputError]}
            value={form.lName}
            onChangeText={(text) => handleChange("lName", text)}
            keyboardType="default"
            autoCapitalize="words"
            maxLength={20}
          />

          <Text style={style.subTitle}>מספר פלאפון</Text>
          <TextInput
            style={[style.input, isRegisterClicked && !form.phone && style.inputError]}
            value={form.phone}
            onChangeText={(text) => handleChange("phone", text)}
            keyboardType="number-pad"
            maxLength={10}
          />

          <Text style={style.subTitle}>אימייל</Text>
          <TextInput
            style={[style.input, isRegisterClicked && !form.email && style.inputError]}
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
            maxLength={30}
          />

          <Text style={style.subTitle}>סיסמה</Text>
          <TextInput
            style={[style.input, isRegisterClicked && !form.password && style.inputError]}
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry
            maxLength={30}
          />

          <Text style={style.subTitle}>אימות סיסמה</Text>
          <TextInput
            style={[style.input, isRegisterClicked && !confirmPassword && style.inputError]}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            maxLength={30}
          />
          <TouchableOpacity
          onPress={handleBack}>
            <Text style={style.text}>יש לך חשבון?</Text>
          </TouchableOpacity>
          {alert && <Text style={style.alert}>{alert}</Text>}

          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading}
            style={style.button}
          >
          
          <Text style={style.buttonText}>{loading ? "נרשם..." : "הרשמה"}</Text>
          </TouchableOpacity>
        </ScrollView>    
      </KeyboardAvoidingView>
    </Background>
  );
};

const style = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: '10%',
    paddingBottom: 40,
  },
  container: {
    flex: 1,
  },
  title: {
    color: '#10563b',
    fontSize: 44,
    fontWeight: "bold",
    marginTop: '20%',
    marginBottom: '10%',
    textAlign: "center",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10563b',
    marginTop: 10,
  },
  alert: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "red",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#A0EACD",
    marginVertical: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: '#10563b',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: "#177d56",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1.8,
  },
  text: {
    fontSize: 18,
    color:'#10563b',
    marginTop:10,
    textAlign:'center'
  },
});
