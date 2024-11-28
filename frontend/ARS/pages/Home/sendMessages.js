import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import styles from "../../utils/globalStyles";
import { CustomButton } from "../../utils/customButton";
import { UserContext } from "../../context/userContext";
import * as Linking from "expo-linking";

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
    <View style={styles.container}>
      <View style={style.innerContainer}>
        <Text style={styles.title}>לא הגיעו היום</Text>
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
      <CustomButton
        title="שלח הודעה"
        onPress={handleSendMessage}
        disabled={!haveRegistration}
      />
    </View>
  );
};

const style = StyleSheet.create({
  innerContainer: {
    flex: 1,
    padding: 10,
  },
  card: {
    padding: 10,
    marginHorizontal: 50,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: "#095b80",
    backgroundColor: "#cce1e8",
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
  },
});
