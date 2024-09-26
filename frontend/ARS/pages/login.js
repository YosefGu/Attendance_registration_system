import axios from "axios"
import { useState } from "react"
import { Alert, Button, TextInput, View, Text } from "react-native"
import { API_URL } from '@env'
import { StyleSheet } from "react-native"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        if( !email || !password){
            Alert.alert('Please fill out all fields.')
            return
        }
        
        setLoading(true)

        const data = {
            email: email,
            password: password
          };
        
        axios.post(`${API_URL}/login`, data)
        .then(response => {
            setLoading(false)
            console.log(response.data)
            Alert.alert('Login successfull.' )
        })
        .catch(error => {
            setLoading(false)
            // console.log(error.response.data.error)
            Alert.alert('Something went wrong.', error.response.data.error )
        })
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
            <Button 
                style={styles.button}
                title={loading ? 'Login...' : 'Login'}
                onPress={handleLogin}
                disabled={loading}
            />
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
    button: {
      marginTop: 20,
    },
  });
export default Login