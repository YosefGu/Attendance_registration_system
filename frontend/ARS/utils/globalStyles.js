import { StyleSheet } from "react-native"


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
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
  inputError: {
    borderColor: 'red',
    borderWidth: 1.8
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 350,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {
    width: 'auto',
    height: 100,
    marginBottom: 10,
    resizeMode:'contain'
  },
  buttonsContainer: {
    flexDirection:'row',
    justifyContent: 'space-evenly',
    padding:10,
    // backgroundColor:'#7655',
  },
});

export default styles