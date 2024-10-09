import { Text, View, Button } from "react-native"
import styles from "../../utils/globalStyles"
import { CustomButton } from "../../utils/customButton"


export const ManagedStudents = ( {navigation} ) => {

  const handleAddStudents = () => {
    navigation.navigate('AddStudent')
  }
  return (
    <View style={styles.container}>
      <CustomButton title={'Add students'} onPress={handleAddStudents}/>  
    </View>
  )
}
