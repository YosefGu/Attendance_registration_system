import React, { useContext, useState } from "react";
import { View, TextInput, Text, Alert, StyleSheet } from "react-native";
import { AuthContext } from "../context/auth";
import styles from "../utils/globalStyles";
import { CustomButton } from "../utils/customButton";
import { signup } from "../requests/userRequests1";
import { LoadingScreen } from "./loadingScreen";

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
    if (
      !form.fName ||
      !form.lName ||
      !form.phone ||
      !form.email ||
      !form.password ||
      !confirmPassword
    ) {
      setIsRegisterClicked(true);
      return;
    }
    if (form.password !== confirmPassword) {
      setAlert("Passwords do not match.");
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
    return;
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={style.innerContainer}>
        <TextInput
          style={[
            styles.input,
            isRegisterClicked && !form.fName ? styles.inputError : null,
          ]}
          placeholder="First Name"
          value={form.fName}
          onChangeText={(text) =>
            handleChange("fName", text.replace(/[^a-zA-Zא-ת\s]/g, ""))
          }
          keyboardType="default"
          autoCapitalize="words"
          maxLength={20}
        />
        <TextInput
          style={[
            styles.input,
            isRegisterClicked && !form.lName ? styles.inputError : null,
          ]}
          placeholder="Last Name"
          value={form.lName}
          onChangeText={(text) =>
            handleChange("lName", text.replace(/[^a-zA-Zא-ת\s]/g, ""))
          }
          keyboardType="default"
          autoCapitalize="words"
          maxLength={20}
        />
        <TextInput
          style={[
            styles.input,
            isRegisterClicked && !form.phone ? styles.inputError : null,
          ]}
          placeholder="Phone"
          value={form.phone}
          onChangeText={(text) =>
            handleChange("phone", text.replace(/[^0-9]/g, ""))
          }
          keyboardType="number-pad"
          maxLength={10}
        />
        <TextInput
          style={[
            styles.input,
            isRegisterClicked && !form.email ? styles.inputError : null,
          ]}
          placeholder="Email"
          value={form.email}
          onChangeText={(text) =>
            handleChange("email", text.replace(/[^a-zA-Z@.0-9]/g, ""))
          }
          maxLength={30}
        />

        <TextInput
          style={[
            styles.input,
            isRegisterClicked && !form.password ? styles.inputError : null,
          ]}
          placeholder="Password"
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
          maxLength={30}
        />

        <TextInput
          style={[
            styles.input,
            isRegisterClicked && !confirmPassword ? styles.inputError : null,
          ]}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          maxLength={30}
        />
        {alert && <Text style={style.alert}>{alert}</Text>}
      </View>

      <View style={style.buttonContainer}>
        <CustomButton
          title={loading ? "Registering..." : "Register"}
          onPress={handleRegister}
          disabled={loading}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  innerContainer: {
    paddingHorizontal: 20,
  },
  buttonContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  alert: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
