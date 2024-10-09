import axios from "axios"
import { useContext, useState } from "react"
import { Alert, TextInput, View, Text } from "react-native"
import { API_URL } from '@env'
import  styles  from '../utils/globalStyles'
import { storeToken } from "../utils/tokenHandling"
import { AuthContext } from "../context/auth"
import { CustomButton } from "../utils/customButton"


const Login = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { setIsAuthenticated } = useContext(AuthContext)
  const [isLoginClicked, setIsloginClicked] = useState(false)

  const handleSignup = () => {
    navigation.navigate('Register')
  }
  const handleLogin = async () => {
    if( !email || !password){
      return setIsloginClicked(true)
    }
    setLoading(true)
    const data = {
      email: email.trim(),
      password: password.trim()
    };

    try {
      const response = await axios.post(`${API_URL}/login`, data);
      setLoading(false);
      await storeToken(response.data.access_token);
      setIsAuthenticated(true)
      navigation.navigate('Home')
    } catch (error) {
      if (error.response) {
        Alert.alert('Something went wrong.', error.response.data.error )
      }
      setLoading(false)
      console.log(error)      
  }
}

return(
    <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
            style={[styles.input, isLoginClicked && !email ? styles.inputError : null]} 
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
        />
        <TextInput 
            style={[styles.input, isLoginClicked && !password ? styles.inputError : null]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
        />
        <CustomButton title={loading ? 'Login...' : 'Login'}  onPress={handleLogin} disabled={loading}/>
        <CustomButton title='Signup' onPress={handleSignup}/>
    </View>
  )
}

export default Login