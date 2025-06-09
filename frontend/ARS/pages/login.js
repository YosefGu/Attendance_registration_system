import { useContext, useState } from "react";
import { Alert, TextInput, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { AuthContext } from "../context/auth";
import { login } from "../requests/userRequests1";
import { LoadingScreen } from "./loadingScreen";
import Background from "./background";


export const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);
  const [isLoginClicked, setIsloginClicked] = useState(false);
  const [secure, setSecure] = useState(true);

  const handleSignup = () => {
    navigation.navigate("Register");
  };

  const passVisibal = () => {
    setSecure(!secure);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      return setIsloginClicked(true);
    }

    const data = {
      email: email.trim(),
      password: password.trim(),
    };

    setLoading(true);
    try {
      const result = await login(data);
      if (result.error) {
        Alert.alert("משהו השתבש.", result.error);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      Alert.alert("שגיאה נוספת: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Background>
      <View style={style.container}>
        <Text style={style.title}>כניסה</Text>

        <Text style={style.subTitle}>אימייל</Text>
        <TextInput
          style={[
            style.input,
            isLoginClicked && !email ? style.inputError : null,
          ]}
          value={email}
          onChangeText={(text) => setEmail(text)}
          maxLength={45}
        />
        
        <Text style={style.subTitle}>סיסמה</Text>
        <View
          style={[
            style.input,
            style.passContainer,
            isLoginClicked && !password ? style.inputError : null,
          ]}
        >
          <TouchableOpacity onPress={passVisibal}>
            <Feather name={secure ? "eye-off" : "eye"} size={20} style={{color:'#10563b', marginHorizontal: 5}}/>
          </TouchableOpacity>
          <TextInput
            value={password}
            onChangeText={setPassword}
            maxLength={30}
            secureTextEntry={secure}
            style={style.passwordInput}
          />
        </View>

        <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            style={style.button}
          >
            <Text style={style.buttonText}>{loading ? "מתחבר..." : "כניסה"}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
        onPress={handleSignup}>
          <Text style={style.text}>לא נרשמת עדיין?</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const style = StyleSheet.create({
  container: {
  flex: 1,
  paddingHorizontal: '15%',
  },
  title: {
    color: '#10563b',
    fontSize: 44,
    fontWeight: "bold",
    marginTop: '56%',
    marginBottom: '17%',
    textAlign: "center",
  },
  subTitle: {
    fontSize: 18,
    fontWeight:'bold',
    color:'#10563b',
    marginTop:10
    
  },
  text: {
    fontSize: 18,
    color:'#10563b',
    marginTop:10,
    textAlign:'center'
  },

  button: {
    // backgroundColor: '#C1F2DC',
    backgroundColor: "#A0EACD",
    // backgroundColor: "#E4F9EF"
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop:30
    
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color:'#10563b',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: "#177d56",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    minHeight: 45
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1.8,
  },
  passContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
  },
});
