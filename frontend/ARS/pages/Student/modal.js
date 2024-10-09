import { View, Text, Modal, StyleSheet, Image, Alert} from 'react-native'
import { CustomButton } from '../../utils/customButton';
import DocumentPicker from 'react-native-document-picker'
import styles from '../../utils/globalStyles';

export const CustemModal = ({onClose, visible}) => {
  
  const selectFlie = async () => {
    onClose()
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.xlsx, DocumentPicker.types.xls]
      });
      console.log(res)
      const formData = new FormData()
      formData.append('file', {
        uri: res.uri,
        type: res.type,
        name: res.name
      })
      console.log(formData)
    } catch (err) {
      console.log(err)
    }

  }
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={modalStyles.title}> הוראות</Text>
          <Text>העלה קובץ Exel כמו הדוגמה להלן</Text>
          <Image 
            source={require('../../images/exemple.png')}
            style={styles.image}
          />
          <View style={styles.buttonsContainer}>
            <CustomButton title='בטל' onPress={onClose}/>
            <CustomButton title='העלה קובץ' onPress={selectFlie}/>
          </View>
        </View>
      </View>
      
    </Modal>
  )
}

const modalStyles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center'
  },
  
});
