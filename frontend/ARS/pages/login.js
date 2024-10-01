import axios from "axios"
import { useContext, useState } from "react"
import { Alert, Button, TextInput, View, Text } from "react-native"
import { API_URL } from '@env'
import { StyleSheet } from "react-native"
import { storeToken } from "../utils/tokenHandling"
import { AuthContext } from "../context/auth"


const Login = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { setIsAuthenticated } = useContext(AuthContext)

  const handleSignup = () => {
    navigation.navigate('Register')
  }
  const handleLogin = async () => {
    if( !email || !password){
      return Alert.alert('Please fill out all fields.')
    }
    setLoading(true)
    const data = {
      email: email,
      password: password
    };
      
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    setLoading(false);
    Alert.alert('Login successfull.')
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
            style={styles.input} 
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
        />
        <TextInput 
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
        />
        <View style={styles.buttonContainer}>
          <Button 
              title={loading ? 'Login...' : 'Login'}
              onPress={handleLogin}
              disabled={loading}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button 
              title= 'Signup'
              onPress={handleSignup}
          />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#fff'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center'
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginVertical: 10
    },
    buttonContainer: {
      marginBottom: 10
    }
  });
export default Login