import { useContext, useEffect, useState } from "react";
import { Alert, TextInput, View, Text, TouchableOpacity } from "react-native";
import styles from "../utils/globalStyles";
import { AuthContext } from "../context/auth";
import { CustomButton } from "../utils/customButton";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { login } from "../requests/userRequests1";
import { LoadingScreen } from "./loadingScreen";

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
    const result = await login(data);
    if (result.error) {
      Alert.alert("Something went wrong.", result.error);
      setLoading(false);
    } else {
      setLoading(false);
      setIsAuthenticated(true);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <SafeAreaView style={style.safeArea}>
        <View style={style.headerContainer}>
          <Text style={style.headerTitle}>Login</Text>
        </View>
      </SafeAreaView>

      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={style.innerContainer}>
          <TextInput
            style={[
              style.input,
              isLoginClicked && !email ? styles.inputError : null,
            ]}
            placeholder="Email"
            value={email}
            onChangeText={(text) =>
              setEmail(text.replace(/[^a-zA-Z@.0-9]/g, ""))
            }
            maxLength={30}
          />
          <View
            style={[
              style.passContainer,
              isLoginClicked && !password ? styles.inputError : null,
            ]}
          >
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              maxLength={30}
              secureTextEntry={secure}
              style={style.innerInput}
            />
            <TouchableOpacity onPress={passVisibal}>
              <Feather name={secure ? "eye-off" : "eye"} size={24} />
            </TouchableOpacity>
          </View>
          <CustomButton
            title={loading ? "Login..." : "Login"}
            onPress={handleLogin}
            disabled={loading}
          />
          <CustomButton title="Signup" onPress={handleSignup} />
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  safeArea: {
    backgroundColor: "#095b80",
  },
  headerContainer: {
    height: 60,
    backgroundColor: "#1c749c",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  innerContainer: {
    paddingHorizontal: 15,
  },
  passContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#095b80",
    borderRadius: 5,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    marginBottom: 10,
    paddingRight: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: "#095b80",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  innerInput: {
    width: "90%",
  },
});
