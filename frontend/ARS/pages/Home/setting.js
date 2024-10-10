import { View } from "react-native"
import styles from "../../utils/globalStyles"
import { CustomButton } from "../../utils/customButton"


export const Setting = ( {navigation} ) => {

    const handledProfile = () => {
        navigation.navigate('Profile')
    }

    const handledManageStudents = () => {
        navigation.navigate('ManageStudents')
    }

    const handledManagedTeam = () => {
        navigation.navigate('ManagedTeam')
    }


  return (
    <View style={styles.container}>
        <CustomButton title='Profile' onPress={handledProfile}/>
        <CustomButton title='Managed students' onPress={handledManageStudents}/>
        <CustomButton title='Managed team' onPress={handledManagedTeam}/>
    </View>
  )
}
