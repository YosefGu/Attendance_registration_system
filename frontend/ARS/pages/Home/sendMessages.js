import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from "react-native";
import { UserContext } from "../../context/userContext";
import * as Linking from "expo-linking";
import { FontAwesome } from "@expo/vector-icons";
import Background from "../background";

export const SendMessages = () => {
  const { state } = useContext(UserContext);
  const [everyonePresent, setEveryonePresent] = useState(false);
  const [haveRegistration, setHaveRegistration] = useState(false);

  const students = state.students;
  const uncheckedIDs = state.attendance.uncheckedIDs;
  const numbers = [];

  const sendSMS = (phoneNumber, message) => {
    const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    Linking.openURL(smsUrl);
  };

  const handleSendMessage = () => {
    const message = [
      "הורה יקר בוקר טוב!",
      "ברצוננו לדווח שילדכם לא נכח היום.",
      "המשך יום נעים, צוות הגן",
    ].join("\n");
    sendSMS(numbers, message);
  };

  useEffect(() => {
    if (
      state.attendance.checkedIDs.length > 0 &&
      state.attendance.uncheckedIDs.length > 0
    ) {
      setHaveRegistration(true);
    } else if (
      state.attendance.checkedIDs.length > 0 &&
      state.attendance.uncheckedIDs.length == 0
    ) {
      setEveryonePresent(true);
    }
  }, []);

  return (
    <Background>
      <View style={style.innerContainer}>
        <ScrollView>
          {students && uncheckedIDs && haveRegistration ? (
            students.map(
              (student, index) =>
                uncheckedIDs.some((item) => item.$oid === student._id.$oid) &&
                (numbers.push(student.phoneA),
                (
                  <View key={index} style={style.card}>
                    <Text style={style.text}>
                      {student.name} {student.lName}
                    </Text>
                  </View>
                ))
            )
          ) : everyonePresent ? (
            <Text style={style.message}>בוצע רישום מלא של כל התלמידים.</Text>
          ) : (
            <Text style={style.message}> לא בוצע רישום במערכת.</Text>
          )}
        </ScrollView>
      </View>
      <View style={style.buttonContainer}>
        <TouchableOpacity 
          style={style.button} 
          onPress={handleSendMessage}
          disabled={!uncheckedIDs || uncheckedIDs.length == 0}
          >  
          <FontAwesome name="envelope" size={24} color="white" />
          <Text style={{color:'white', fontWeight:'bold'}}>שלח הודעה</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const style = StyleSheet.create({
  innerContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: "#d5f3ec",
    marginVertical: 8,
    marginHorizontal: 70,
    paddingVertical: 14,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#10563b",
    fontWeight: "500",
  },
  message: {
    fontSize: 18,
    color: "#444",
    textAlign: "center",
    marginTop: 20,
  },
  sendButtonContainer: {
    marginVertical: 20,
    marginHorizontal: 60,
    alignSelf: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    right: 30,
    alignItems: "center",
    justifyContent: "center",
   
  },
  button: {
    backgroundColor: "#10563b",
    width: 120,
    height: 75,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

