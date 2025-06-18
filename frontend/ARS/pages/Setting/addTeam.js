import { useContext, useState } from "react";
import { Text, Alert, StyleSheet, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import * as Linking from "expo-linking";
import { Picker } from "@react-native-picker/picker";
import { getUserID } from "../../utils/storID";
import { add_team_member } from "../../requests/teamRequests";
import { UserContext } from "../../context/userContext";
import Background from "../background";

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
    title: "assistant",
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
      "נוספת למערכת נוכחות בקליק",
      `שם המשתמש- ${form.email}`,
      `סיסמתך- 12345678`,
      "בבקשה החליפי סיסמתך עם הכניסה למערכת.",
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
        ...Object.fromEntries(
          Object.entries(form).map(([key, value]) => [key, value.trim()])
        ),
        institutionNum: id,
      };

      const response = await add_team_member(dispatch, updatedForm);
      if (response.error) {
        Alert.alert("Error", response.error);
      } else {
        Alert.alert(
          response.message,
          "לשלוח הודעה למשתמשת החדשה עם פרטי הכניסה?",
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
    <Background>
        <ScrollView contentContainerStyle={style.scrollContainer}>
          <View style={style.innerContainer}>
            <View style={style.box}>
              <Text style={style.label}>שם פרטי</Text>
              <TextInput
                onChangeText={(text) =>
                  handleChange("fName", text.replace(/[^a-zA-Zא-ת\s]/g, ""))
                }
                value={form.fName}
                style={[
                  style.input,
                  isClicked && !form.fName ? style.inputError : null,
                ]}
                maxLength={20}
              />
            </View>
            <View style={style.box}>
            <Text style={style.label} >שם משפחה</Text>
            <TextInput
              value={form.lName}
              onChangeText={(text) =>
                handleChange("lName", text.replace(/[^a-zA-Zא-ת\s]/g, ""))
              }
              style={[
                style.input,
                isClicked && !form.lName ? style.inputError : null,
              ]}
              maxLength={20}
            />
            </View>
            <View style={style.box}>
            <Text style={style.label}>פלאפון</Text>
            <TextInput
              value={form.phone}
              onChangeText={(text) =>
                handleChange("phone", text.replace(/[^0-9]/g, ""))
              }
              style={[
                style.input,
                isClicked && !form.phone ? style.inputError : null,
              ]}
              maxLength={10}
              keyboardType="phone-pad"
            />
            </View>
            <View style={style.box}>
            <Text style={style.label}>אימייל</Text>
            <TextInput
              value={form.email}
              onChangeText={(text) => handleChange("email", text)}
              style={[
                style.input,
                isClicked && !form.email ? style.inputError : null,
              ]}
              maxLength={40}
            />
            </View>
            <View style={style.box}>
              <Text style={style.label}>תפקיד</Text>
            <View style={style.picker}>
              <Picker
                prompt="תפקיד"
                mode="dialog"
                selectedValue={form.title}
                onValueChange={(itemValue) => handleChange("title", itemValue)}
              >
              
                <Picker.Item label="סייעת" value="assistant"/>
                <Picker.Item label="סייעת רפואית" value="medical_assistant" />
              </Picker>
              </View>

            </View>
            <TouchableOpacity style={style.button} onPress={handleAdd} disabled={loading}>
              <Text style={style.buttonText}>{loading ? "יוצר משתמש חדש..." : "הוסף משתמש"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>    
    </Background>
  );
};

const style = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: '5%',
    paddingBottom: 20,
  },
  innerContainer: {
    flex: 1,
    marginTop: "20%",
    paddingHorizontal: 15,
    margin: 10,
  },
  buttonContainer: {
    paddingHorizontal: 5,
    paddingTop: 30,
    margin: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#10563b",
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: "white",
    paddingHorizontal:15
  },
  box: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 5,
    marginHorizontal: '5%',
  },
  input: {
  backgroundColor: 'white',
  borderWidth: 1,
  borderColor: "#10563b",
  borderRadius: 10,
  marginBottom: 2,
  marginTop:3,
  padding: 10,
  textAlign: 'right'
  },
  inputError: {
    borderColor: "red",
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10563b',
    marginTop: 10,
    marginHorizontal: 20
  },
  button: {
    backgroundColor: "#177d56",
    width: '50%',
    height: 70,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf:'center',
    marginTop:"10%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
