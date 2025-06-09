import { useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { CustomHeader } from "../utils/customHeader";
import { SideBar } from "../utils/sideBar";
import Background from "./background";

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
    <Background>
      <View style={style.container}>
        <CustomHeader title="" icon="bars" onPress={openSidebar} />

        {isSidebarVisibale && (
          <>
            <TouchableWithoutFeedback onPress={closeSidebar}>
              <View style={style.backdrop} />
            </TouchableWithoutFeedback>

            <SideBar navigation={navigation} closeSidebar={closeSidebar} />
          </>
        )}
        <View style={style.content}>
          <Text style={style.title}>ברוכים הבאים!</Text>
          <Text style={style.subTitle}>במערכת זו תוכלו לבצע רישום נוכחות</Text>
          <Text style={style.subTitle}>כמו כן, שליחת הודעה להורים שילדם לא נכח.</Text>
          <View style={style.buttonsContainer}>
            <TouchableOpacity
              onPress={handleAttendance}
              style={style.button}
            >
              <Text style={style.buttonText}>רישום נוכחות</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSendMessages}
              style={style.button}
            >
              <Text style={style.buttonText}>הודעה להורים</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginHorizontal:20
  },
  title: {
    color: '#10563b',
    fontSize: 44,
    fontWeight: "bold",
    marginTop: '30%',
    marginBottom: '17%',
    textAlign: "center",
  },
  subTitle: {
    fontSize: 24,
    fontWeight:'bold',
    color:'#10563b',
    marginTop:10,
    textAlign:'center'
    
  },
  button: {
    width: '40%',
    backgroundColor: "#A0EACD",
    paddingVertical: 40,
    paddingHorizontal: 10,
    borderRadius: 75,
    marginHorizontal:10

    
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color:'#10563b',
  },
  buttonsContainer: {
    marginTop:'25%',
    flexDirection:'row',
    justifyContent:'center',
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
