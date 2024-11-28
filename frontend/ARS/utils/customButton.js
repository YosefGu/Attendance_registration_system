import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const CustomButton = ({ title, onPress, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#095b80",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    minWidth: 150,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
    opacity: 0.7,
  },
});
