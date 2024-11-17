import { Text, View, TextInput, Alert } from "react-native"
import styles from "../../utils/globalStyles"
import { useContext, useState } from "react"
import { CustomButton } from "../../utils/customButton"
import { AuthContext } from "../../context/auth"
import { getUserID } from "../../utils/storID"
import { deleteUser, updateUser } from "../../requests/userRequests1"
import { UserContext } from "../../context/userContext"


export const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const user = state.user
  const { logout } = useContext(AuthContext);

  const [form, setForm] = useState({
    fName: user.fName,
    lName: user.lName,
    phone: user.phone,
    institutionName: user.institutionName,
    city: user.city
  })
  const [error, setError] = useState('')

  const handleChange = (key , value) => {
    setForm({
      ...form,
      [key]: value,
    })
  }

  const delete_User = async () => {
    const id = await getUserID()
    await deleteUser(id)
    logout()
  }

  const handleUpdate = async () => {
    if (!form.fName || !form.lName || !form.phone || !form.institutionName || !form.city) {
      setError('The fields MUST be filed.')
    } else {
      await updateUser(dispatch, form)
    }
  }

  const handleDelete = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete?\nAll data belonging to this account will also be deleted.", 
      
      [
        {
          text: "Cancel"
        },
        {
          text: "Delete",
          onPress: delete_User
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      
      <TextInput 
            placeholder="First Name"
            onChangeText={(text) => handleChange('fName', text.replace(/[^a-zA-Zא-ת\s]/g, ''))}
            value={form.fName}
            style={styles.input}
            maxLength={20}
      />

      <TextInput 
        placeholder="Last Name"
        value={form.lName}
        onChangeText={(text) => handleChange('lName', text.replace(/[^a-zA-Zא-ת\s]/g, ''))}
        style={styles.input}
        maxLength={20}
      />

      <TextInput 
        placeholder="Phone"
        value={form.phone}
        onChangeText={(text) => handleChange('phone', text.replace(/[^0-9]/g, ''))}
        keyboardType="phone-pad"
        style={styles.input}
        maxLength={10}
      />
      <TextInput 
        placeholder="Institution Name"
        value={form.institutionName}
        onChangeText={(text) => handleChange('institutionName', text.replace(/[^a-zA-Zא-ת\s]/g, ''))}
        style={styles.input}
        maxLength={30}
      />

      <TextInput 
        placeholder="City"
        value={form.city}
        onChangeText={(text) => handleChange('city', text.replace(/[^a-zA-Zא-ת\s]/g, ''))}
        style={styles.input}
        maxLength={15}
      />
      {error ? <Text>{error}</Text> : null}
      <CustomButton 
        title='Update'
        onPress={handleUpdate}
      />
      <CustomButton 
        title='Delete Account'
        onPress={handleDelete}
      />
    </View>
  )
}
