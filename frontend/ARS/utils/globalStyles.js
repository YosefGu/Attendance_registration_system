import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#e6f4fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  title2: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f1f1f",
  },
  text: {
    fontSize: 14,
    color: "#e0e0e0",
  },
  input: {
    borderWidth: 2,
    borderColor: "#095b80",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#cce1e8",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1.8,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    // position:'absolute',
    width: "85%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignContent: "center",
  },
});

export default styles;
