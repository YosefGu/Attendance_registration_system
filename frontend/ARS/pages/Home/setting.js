import { Text, View, Button } from "react-native"
import styles from "../../utils/globalStyles"


export const Setting = ( {navigation} ) => {

    const handledProfile = () => {
        navigation.navigate('Profile')
    }

    const handledManageStudents = () => {
        navigation.navigate('ManagedStudents')
    }

    const handledManagedTeam = () => {
        navigation.navigate('ManagedTeam')
    }


  return (
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
              <Button 
                  title= 'Profile'
                  onPress={handledProfile}
              />
        </View> 
        <View style={styles.buttonContainer}>
              <Button 
                  title= 'Managed students'
                  onPress={handledManageStudents}
              />
        </View>
        <View style={styles.buttonContainer}>
              <Button 
                  title= 'Managed team'
                  onPress={handledManagedTeam}
              />
        </View>  
    </View>
  )
}
