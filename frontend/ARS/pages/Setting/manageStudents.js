import { View} from "react-native"
import styles from "../../utils/globalStyles"
import { CustomButton } from "../../utils/customButton"

export const ManageStudents = ({ navigation }) => {
    const handleAddStudents = () => {
        navigation.navigate('AddStudent')
    }
  return (
    <View style={styles.container}>
      <CustomButton title={'Add students'} onPress={handleAddStudents}/>  
    </View>
  )
}
