import { Text, View, Button } from "react-native"
import styles from "../../utils/globalStyles"


export const ManagedStudents = ( {navigation} ) => {

  const handleAddStudents = () => {
    navigation.navigate('AddStudent')
  }
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
          <Button 
            title= 'Add students'
            onPress={handleAddStudents}
          />
      </View>   
    </View>
  )
}
