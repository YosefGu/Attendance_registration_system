import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

export const CustomHeader = ({
  title,
  navigation,
  navigateTo = "Main",
  icon = "arrow-right-long",
  onPress = null,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>

        <TouchableOpacity
          style={styles.headerIcon}
          onPress={onPress ? onPress : () => navigation.navigate(navigateTo)}
        >
          <FontAwesome6 name={icon} size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#095b80",
    zIndex: 1,
  },
  headerContainer: {
    height: 60,
    backgroundColor: "#1c749c",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    position: "relative", // Ensures the icon can be absolutely positioned
  },
  titleContainer: {
    flex: 1, // Takes up available space to center the title
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerIcon: {
    position: "absolute",
    right: 15, // Aligns the icon to the right
  },
});
