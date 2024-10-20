import { View, Text, Modal, StyleSheet, Image, Alert} from 'react-native'
import { useState, useContext } from 'react'
import { CustomButton } from '../../utils/customButton';
import * as DocumentPicker from 'expo-document-picker'
import styles from '../../utils/globalStyles';
import { StudentContext } from '../../context/studentsRequests';


export const CustemModal = ({onClose, visible, navigation }) => {
  const [form, setForm] = useState('')
  const { addStudentsExcelFile } = useContext(StudentContext)

  const MIME = {
    // Excel 2007 and later
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    // Older excel files
    '.xls': 'application/vnd.ms-excel'
  }

  const closeModal = () => {
    onClose()
    setForm('')
  }

  const uploadFile = async () => {
    const formData = new FormData();

    formData.append('file', {
      uri: form.uri,
      type: form.mimeType || MIME['.xlsx'],
      name: form.name,
    });

    closeModal()
    result = await addStudentsExcelFile(formData)
    
    if (result.error) {
      Alert.alert(result.error, result.details)  
    } else {
      navigation.navigate('ManageStudents');
      Alert.alert(result.title, result.message)
    }
  }

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: [MIME['.xlsx'], MIME['.xls']],
        copyToCacheDirectory: false,
        multiple: false
      })
      if (!res.canceled && res.assets && res.assets.length > 0) {
        const file = res.assets[0]; 
        setForm(file);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error:', err)
  }

 
}
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={modalStyles.title}> הוראות</Text>
          <Text style={modalStyles.text}>בחר קובץ Excel כמו הדוגמא שלהלן</Text>
          <Image 
            source={require('../../images/example.png')}
            style={styles.image}
          />
          { 
            form ?  
              <View style={modalStyles.box}>
                <Text style={modalStyles.text}>{form.name}</Text>
              </View>
            : null
           }
          <View style={styles.buttonsContainer}>
            <CustomButton title='בטל' onPress={closeModal}/>
            { 
              form ?
                <CustomButton title='מחק' onPress={() => setForm('')}/>
              :
               null
             }
            <CustomButton title={form ? 'העלה קובץ' : 'בחר קובץ'} onPress={form ? uploadFile : pickFile}/>
          </View>
        </View>
      </View>
      
    </Modal>
  )
}

const modalStyles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  box: {
    borderWidth:1.3,
    borderRadius:5,
    borderColor:'#55a',
    paddingVertical:5,
    paddingHorizontal:15,
    alignSelf:'center'
  },
  text: {
    fontSize:16
  }
  
});
