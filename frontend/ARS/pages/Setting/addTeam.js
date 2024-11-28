import React, { useContext, useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import * as Linking from "expo-linking";
import styles from "../../utils/globalStyles";
import { CustomButton } from "../../utils/customButton";
import { Picker } from "@react-native-picker/picker";
import { getUserID } from "../../utils/storID";
import { add_team_member } from "../../requests/teamRequests";
import { UserContext } from "../../context/userContext";

export const AddTeam = ({ navigation }) => {
  const { dispatch } = useContext(UserContext);
  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialForm = {
    fName: "",
    lName: "",
    phone: "",
    email: "",
    password: "12345678",
    title: "kindergartner",
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const sendSMS = (phoneNumber, message) => {
    const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    Linking.openURL(smsUrl);
  };

  const sendMessage = () => {
    const message = [
      `היי ${form.fName} ${form.lName}!`,
      "נוספת למערכת רישום נוכחות",
      `שם המשתמש- ${form.email}`,
      `סיסמתך- 12345678`,
      "בבקשה החליפו סיסמתכם עם הכניסה למערכת.",
      "בהצלחה",
    ].join("\n");
    sendSMS(form.phone, message);
  };

  const handleAdd = async () => {
    if (!form.fName || !form.lName || !form.phone || !form.email) {
      setIsClicked(true);
    } else {
      setLoading(true);
      const id = await getUserID();
      const updatedForm = {
        ...form,
        institutionNum: id,
      };

      const response = await add_team_member(dispatch, updatedForm);
      if (response.error) {
        Alert.alert("Error", response.error);
      } else {
        Alert.alert(
          response.message,
          "לשלוח הודעה למשתמש החדש עם פרטי הכניסה?",
          [
            {
              text: "בטל",
              style: "cancel",
            },
            {
              text: "שלח",
              onPress: sendMessage,
            },
          ]
        );
        setForm(initialForm);
        navigation.navigate("ManagedTeam");
      }
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={style.innerContainer}>
        <TextInput
          placeholder="First Name"
          onChangeText={(text) =>
            handleChange("fName", text.replace(/[^a-zA-Zא-ת\s]/g, ""))
          }
          value={form.fName}
          style={[
            styles.input,
            isClicked && !form.fName ? styles.inputError : null,
          ]}
          maxLength={20}
        />
        <TextInput
          placeholder="Last Name"
          value={form.lName}
          onChangeText={(text) =>
            handleChange("lName", text.replace(/[^a-zA-Zא-ת\s]/g, ""))
          }
          style={[
            styles.input,
            isClicked && !form.lName ? styles.inputError : null,
          ]}
          maxLength={20}
        />
        <TextInput
          placeholder="Phone"
          value={form.phone}
          onChangeText={(text) =>
            handleChange("phone", text.replace(/[^0-9]/g, ""))
          }
          style={[
            styles.input,
            isClicked && !form.phone ? styles.inputError : null,
          ]}
          maxLength={10}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Email"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
          style={[
            styles.input,
            isClicked && !form.email ? styles.inputError : null,
          ]}
          maxLength={40}
        />
        <View style={style.picker}>
          <Picker
            prompt="תפקיד"
            mode="dialog"
            selectedValue={form.title}
            onValueChange={(itemValue) => handleChange("title", itemValue)}
          >
            <Picker.Item label="גננת משלימה" value="kindergartner" />
            <Picker.Item label="סייעת" value="assistant" />
            <Picker.Item label="סייעת רפואית" value="medical_assistant" />
          </Picker>
        </View>
      </View>
      <View style={style.buttonContainer}>
        <CustomButton
          title={loading ? "יוצר משתמש חדש..." : "הוסף"}
          disabled={loading}
          onPress={handleAdd}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  innerContainer: {
    paddingHorizontal: 15,
    margin: 10,
  },
  buttonContainer: {
    paddingHorizontal: 5,
    paddingTop: 30,
    margin: 10,
  },
  picker: {
    borderWidth: 2,
    borderColor: "#095b80",
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: "#cce1e8",
  },
});
