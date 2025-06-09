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
    <SafeAreaView style={style.safeArea} edges={["top"]}>
      <View style={style.headerContainer}>
        <View style={style.sideContainer}>
          <TouchableOpacity
            onPress={onPress ? onPress : () => navigation.navigate(navigateTo)}
          >
            <FontAwesome6 name={icon} size={24} color="#10563b" />
          </TouchableOpacity>
        </View>

        <View style={style.titleContainer}>
          <Text style={style.headerTitle}>{title}</Text>
        </View>

        {/* ריק לצורך איזון */}
        <View style={style.sideContainer} /> 

      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeArea: {
    zIndex: 1,
  },
  headerTitle: {
    color: "#10563b",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerContainer: {
    backgroundColor: "#9adbc1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  sideContainer: {
    flex: 1,
    alignItems: "flex-start", 
  },
  titleContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
