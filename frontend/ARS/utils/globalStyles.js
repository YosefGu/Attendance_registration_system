import { StyleSheet } from "react-native"


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
    description: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
  } ,
    buttonContainer: {
      marginBottom: 10
    },
    inputError: {
      borderColor: 'red',
      borderWidth: 1.8
    },
  });

  export default styles