import { useState } from "react";
import { View, Text, Platform, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Background from "./background";
import { createPeriodFile } from "../requests/periodRequests";

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const Documents = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  
  const [fileUri, setFileUri] = useState(null); 
  const [fileName, setFileName] = useState(""); 
  const [fileBase64, setFileBase64] = useState("");
  
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const dayMonthFormat = (date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    return `${day}.${month}`
  }

  // אישור יצירת קובץ במקרה שכבר נוצר אחד
  const confirmCreateNewFile = () => {
      Alert.alert(
        "שימי לב",
        "הקובץ שכבר נוצר לא יהיה זמין יותר לשיתוף והורדה.",
        [
          {
            text: "בטל",
            style: 'cancel',
          },
          {
            text: "אישור",
            onPress: () => handleCreate()
          }
        ]
      )
  };

  // יצירת הקובץ - קבלה מהשרת ושמירה בזיכרון האפ בתוספת קידוד
  const handleCreate = async () => {
    try {
      Alert.alert("מתחיל יצירת קובץ...");

      const data = {
        start_date: formatDate(startDate),  
        end_date: formatDate(endDate),
      };

      const base64 = await createPeriodFile(data);
      const fileName = `נוכחות ${dayMonthFormat(startDate)} - ${dayMonthFormat(endDate)}`;
      const fileUri = FileSystem.documentDirectory + fileName + '.xlsx';

      // שמירת הקובץ בזיכרון האפליקציה עם קידוד base64
      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setFileUri(fileUri);
      setFileName(fileName);
      setFileBase64(base64);

      Alert.alert("הקובץ נוצר בהצלחה!", "ניתן לשמור או לשתף את הקובץ.");

    } catch (error) {
      Alert.alert("אירעה שגיאה ביצירת הקובץ");
    }
  };

  // שמירת הקובץ בתיקיית ההורדות באנדרואיד בלבד
  const handleSaveToDevice = async () => {
    if (!fileUri) {
      Alert.alert("אין קובץ לשמירה");
      return;
    }
    try {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (!permissions.granted) {
        Alert.alert("לא ניתנה גישה לתיקייה");
        return;
      }
      
      const uri = await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        fileName + '.xlsx',
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      await FileSystem.writeAsStringAsync(uri, fileBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      Alert.alert("הקובץ נשמר בהצלחה!");
    } catch (e) {
      console.error(e);
      Alert.alert("אירעה שגיאה בשמירת הקובץ");
    }
  };


  // שיתוף הקובץ
  const handleShareFile = async () => {
    if (!fileUri) {
      Alert.alert("אין קובץ לשיתוף");
      return;
    }
    try {
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("שיתוף לא זמין במכשיר זה");
        return;
      }
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error("שגיאה בשיתוף הקובץ:", error);
      Alert.alert("אירעה שגיאה בשיתוף הקובץ");
    }
  };

  return (
    <Background>
      <View style={style.container}>
        <Text style={style.title}>יצירת מסמך Excel</Text>
        <Text style={style.subTitle}>
          הכולל נתוני הגעה עבור כלל התלמידים בטווח התאריכים הנבחר
        </Text>

        <View style={style.datePickerContainer}>
          <View style={style.section}>
            <Text style={style.label}>תאריך התחלה</Text>
            <TouchableOpacity
              style={style.dateButton}
              onPress={() => setShowStartPicker(true)}
            >
              <Text style={style.dateText}>{formatDate(startDate)}</Text>
            </TouchableOpacity>
          </View>

          <View style={style.section}>
            <Text style={style.label}>תאריך סיום</Text>
            <TouchableOpacity
              style={style.dateButton}
              onPress={() => setShowEndPicker(true)}
            >
              <Text style={style.dateText}>{formatDate(endDate)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* start picker */}
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => {
              setShowStartPicker(false);
              if (selectedDate) setStartDate(selectedDate);
            }}
            maximumDate={new Date()}
          />
        )}
        
        {/* end picker */}
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => {
              setShowEndPicker(false);
              if (selectedDate) setEndDate(selectedDate);
            }}
            minimumDate={startDate}
            maximumDate={new Date()}
          />
        )}

        <TouchableOpacity style={style.button} onPress={fileName ? confirmCreateNewFile : handleCreate}>
          <Text style={style.buttonText}>צור קובץ</Text>
        </TouchableOpacity>

        {/* מציג שם הקובץ אם קיים */}
        {fileName && (
          <View style={{ marginTop: 30, alignItems: "center" }}>
            <Text style={style.file}>
              {fileName}
            </Text>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <TouchableOpacity style={style.button} onPress={handleSaveToDevice}>
                <Text style={style.buttonText}>שמור במכשיר</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.button} onPress={handleShareFile}>
                <Text style={style.buttonText}>שתף קובץ</Text>
              </TouchableOpacity>
            </View>
          </View>
        )} 
      </View>
    </Background>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20%',
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: '#10563b',
  },
  subTitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: '#10563b',
  },
  datePickerContainer: {
    width:'100%',
    flexDirection: 'row',
    justifyContent:'space-around',
    // marginBottom: 25
  },
  section: {
    marginBottom: 25,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
    color: '#10563b',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#10563b",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  dateText: {
    fontSize: 18,
    color: "#333",
  },
  button: {
    backgroundColor: "#10563b",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop:15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  file: { 
    marginBottom: 20,
    fontWeight: "bold", 
    borderColor: '#10563b', 
    borderWidth: 1, 
    padding: 8, 
    borderRadius:10  
  }
});
