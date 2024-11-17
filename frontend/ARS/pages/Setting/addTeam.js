import React, { useContext, useState } from 'react'
import { Alert, TextInput, View} from 'react-native'
import styles from '../../utils/globalStyles'
import { CustomButton } from '../../utils/customButton'
import { Picker } from '@react-native-picker/picker'
import { getUserID } from '../../utils/storID'
import { add_team_member } from '../../requests/teamRequests'
import { UserContext } from '../../context/userContext'

export const AddTeam = ({ navigation }) => {
  const { dispatch } = useContext(UserContext)
  const [isClicked, setIsClicked] = useState(false)
  const [loading, setLoading] = useState(false)

  const initialForm = {
    fName:'',
    lName:'',
    phone:'',
    email:'',
    title:'kindergartner',
    password: "12345678"
  }

  const [form, setForm] = useState(initialForm)

  const handleChange = (key , value) => {
    setForm({
      ...form,
      [key]: value,
    })
  }

  const handleAdd = async () => {
    if (!form.fName || !form.lName || !form.phone || !form.email) {
      setIsClicked(true)
    } else {
      setLoading(true)
      const id = await getUserID()
      const updatedForm = {
        ...form,
        institutionNum: id
      }

      const response = await add_team_member(dispatch, updatedForm)
      if (response.error) {
        Alert.alert("Error", response.error)
      } else {
        Alert.alert("",response.message)
        setForm(initialForm)
        navigation.navigate('ManagedTeam')
      }
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder='First Name'
        onChangeText={(text) => handleChange('fName', text.replace(/[^a-zA-Zא-ת\s]/g, ''))}
        value={form.fName}
        style={[styles.input, isClicked && !form.fName ? styles.inputError : null]}
        maxLength={20}
      />
      <TextInput 
        placeholder="Last Name"
        value={form.lName}
        onChangeText={(text) => handleChange('lName', text.replace(/[^a-zA-Zא-ת\s]/g, ''))}
        style={[styles.input, isClicked && !form.lName ? styles.inputError : null]}
        maxLength={20}
      />
      <TextInput 
        placeholder="Phone"
        value={form.phone}
        onChangeText={(text) => handleChange('phone', text.replace(/[^0-9]/g, ''))}
        style={[styles.input, isClicked && !form.phone ? styles.inputError : null]}
        maxLength={10}
        keyboardType="phone-pad"
      />
      <TextInput 
        placeholder='Email'
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
        style={[styles.input, isClicked && !form.email ? styles.inputError : null]}
        maxLength={40}
      />
      <Picker
        prompt='תפקיד'
        mode='dialog'
        selectedValue={form.title}
        onValueChange={(itemValue) => handleChange('title', itemValue)}
      >
        <Picker.Item label='גננת משלימה' value='kindergartner'/>
        <Picker.Item label='סייעת' value='assistant'/>
        <Picker.Item label='סייעת רפואית' value='medical_assistant'/>
      </Picker>
      <CustomButton 
        title={loading ? 'יוצר משתמש חדש...' :'הוסף'}
        disabled={loading}
        onPress={handleAdd}
      />
    </View>
  )
}
