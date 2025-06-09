import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export const LoadingScreen = () => (
  <View style={style.container}>
    <Text style={style.text}>בבקשה המתן</Text>
    <Text style={style.text}>בזמן שאנחנו טוענים...</Text>
    <ActivityIndicator size="large" color="#A0EACD" />
  </View>
);

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C1F2DC",
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color:'#10563b',
    textAlign:'center',
    marginBottom: 20
  }
});
