import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, Image, Alert } from "react-native";
import styles from "../../utils/globalStyles";
import * as DocumentPicker from "expo-document-picker";
import { CustomButton } from "../../utils/customButton";
import { addStudentsExcelFile } from "../../requests/studentsRequests";
import { UserContext } from "../../context/userContext";

export const UploadFile = ({ closeModal }) => {
  const { dispatch } = useContext(UserContext);
  const [inProcess, setInProcess] = useState(false);
  const [file, setFile] = useState("");
  const MIME = {
    // Excel 2007 and later
    ".xlsx":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    // Older excel files
    ".xls": "application/vnd.ms-excel",
  };
  const pickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: [MIME[".xlsx"], MIME[".xls"]],
        copyToCacheDirectory: false,
        multiple: false,
      });
      if (!res.canceled && res.assets && res.assets.length > 0) {
        const file = res.assets[0];
        setFile(file);
      }
    } catch (err) {
      Alert.alert("Error:", err);
    }
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      type: file.mimeType || MIME[".xlsx"],
      name: file.name,
    });

    const result = await addStudentsExcelFile(dispatch, formData);
    setInProcess(true);
    closeModal();
    if (result.students) {
      // Success case
      navigation.navigate("ManageStudents");
      Alert.alert(result.title, result.message);
    } else if (result.message) {
      // Data error
      Alert.alert(result.title, result.message);
    } else if (result.error) {
      // Error case
      Alert.alert(result.error, result.details);
    } else {
      // Fallback for unexpected results
      Alert.alert("Unexpected Error", "An unknown error occurred.");
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.title}> הוראות</Text>
      <Text style={style.text}>בחר קובץ Excel כמו הדוגמא שלהלן</Text>
      <Image source={require("../../images/example.png")} style={style.image} />
      {file && (
        <View style={style.box}>
          <Text style={style.text}>{file.name}</Text>
        </View>
      )}
      <View style={style.buttonsContainer}>
        <CustomButton
          title={file ? "מחק" : "בטל"}
          onPress={file ? () => setFile("") : () => closeModal()}
        />
        <CustomButton
          title={file ? "העלה קובץ" : "בחר קובץ"}
          onPress={file ? uploadFile : pickFile}
          disabled={inProcess}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    width: "90%",
    padding: 20,
    backgroundColor: "#e6f4fa",
    top: "30%",
    left: "5%",
    zIndex: 3,
    borderRadius: 10,
  },
  box: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#095b80",
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignSelf: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  image: {
    width: "auto",
    height: 100,
    marginVertical: 10,
    resizeMode: "contain",
  },
});
