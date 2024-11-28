import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export const LoadingScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#abd8eb" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#095b80",
  },
});
