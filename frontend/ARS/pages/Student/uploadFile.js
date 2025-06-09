import { useContext, useState } from "react";
import { StyleSheet, View, Text, Image, Alert, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { addStudentsExcelFile } from "../../requests/studentsRequests";
import { UserContext } from "../../context/userContext";

export const UploadFile = ({ closeModal, navigation }) => {
  const { dispatch } = useContext(UserContext);
  const [uploadingFile, setUploadingFile] = useState(false);
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
    setUploadingFile(true);
    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      type: file.mimeType || MIME[".xlsx"],
      name: file.name,
    });

    const result = await addStudentsExcelFile(dispatch, formData);
    setUploadingFile(false);
    setFile(null);
    if (result.students) {
      Alert.alert(result.title, result.message, [
        {
          text: "OK",
          onPress: () => navigation.navigate("ManageStudents"),
        },
      ]);
    } else if (result.message) {
      // Data exist
      Alert.alert(result.title, result.message);
    } else if (result.error) {
      // Error case - file content is not match
      Alert.alert(result.error, result.details);
    } else {
      // Fallback for unexpected results
      Alert.alert("Unexpected Error", "An unknown error occurred.");
    }
    closeModal();
  };

  return (
    <View style={style.container}>
      <Text style={style.title}> הוראות</Text>
      <Text style={style.subtitle}>בחר קובץ Excel כמו הדוגמא שלהלן</Text>
      <Image source={require("../../images/example.png")} style={style.image} />
      {file && (
        <View style={style.file}>
          <Text style={style.subtitle}>{file.name.replace('.xlsx', '')}</Text>
        </View>
      )}
      {uploadingFile && <Text style={style.subtitle}>מעלה את הקובץ המבוקש</Text>}
        <View style={style.bottonsContainer}>
          <TouchableOpacity 
            style={style.fabButton} 
            onPress={file ? () => setFile("") : () => closeModal()}
          >
            <Text style={style.buttonText}>{file ? "מחק" : "בטל"}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={style.fabButton} 
            onPress={file ? uploadFile : pickFile}
            disabled={uploadingFile}
          >
            <Text style={style.buttonText}>{file ? "העלה קובץ" : "בחר קובץ"}</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    width: "90%",
    padding: 20,
    backgroundColor: "#E4F9EF",
    top: "30%",
    left: "5%",
    zIndex: 3,
    borderRadius: 10,
  },
  file: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#10563b",
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignSelf: "center",
  },
  bottonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color:'#10563b'
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color:'#10563b',
    fontWeight: "bold",
  },
  image: {
    width: "auto",
    height: 100,
    marginVertical: 10,
    resizeMode: "contain",
  },
  bottonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  // fabContainer: {
  //   position: "absolute",
  //   bottom: 20,
  //   right: 20,
  //   alignItems: "center",
  //   justifyContent: "center",
   
  // },
  fabButton: {
    backgroundColor: "#10563b",
    width: '35%',
    height: 50,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
