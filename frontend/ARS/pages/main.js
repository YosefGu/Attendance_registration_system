import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { CustomButton } from "../utils/customButton";
import { CustomHeader } from "../utils/customHeader";
import { SideBar } from "../utils/sideBar";

export const Main = ({ navigation }) => {
  const [isSidebarVisibale, setIsSidebarVisible] = useState(false);

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  const openSidebar = () => {
    setIsSidebarVisible(!isSidebarVisibale);
  };

  const handleAttendance = () => {
    navigation.navigate("Attendance");
  };

  const handleSendMessages = () => {
    navigation.navigate("SendMessages");
  };
  return (
    <View style={style.container}>
      <CustomHeader title="Main" icon="bars" onPress={openSidebar} />

      {isSidebarVisibale && (
        <>
          <TouchableWithoutFeedback onPress={closeSidebar}>
            <View style={style.backdrop} />
          </TouchableWithoutFeedback>

          <SideBar navigation={navigation} closeSidebar={closeSidebar} />
        </>
      )}
      <View style={style.innerContainer}>
        <Text style={style.title}>ברוכים הבאים!</Text>
        <Text style={style.subTitle}>
          במערכת זו תוכלו לבצע רישום נוכחות וכן שליחת הודעה להורים שילדם לא נכח.
        </Text>
        <View style={style.buttonContainer}>
          <CustomButton title="רישום נוכחות" onPress={handleAttendance} />
        </View>
        <View style={style.buttonContainer}>
          <CustomButton title="הודעה להורים" onPress={handleSendMessages} />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f4fa",
  },
  innerContainer: {
    flex: 1,
    marginTop: "20%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "20%",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: "10%",
    marginVertical: "10%",
  },
  buttonContainer: {
    paddingHorizontal: "20%",
    paddingVertical: 10,
    marginBottom: 5,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent backdrop
    zIndex: 2, // Layer the backdrop above other content
  },
});
