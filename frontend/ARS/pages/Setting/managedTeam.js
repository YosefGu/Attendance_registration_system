import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import styles from "../../utils/globalStyles";
import { useContext, useState } from "react";
import { CustomButton } from "../../utils/customButton";
import { UserContext } from "../../context/userContext";
import { deleteUser } from "../../requests/userRequests1";

export const ManagedTeam = ({ navigation }) => {
  const { state, dispatch } = useContext(UserContext);
  const [clickedList, setClickedList] = useState([]);

  const team = state.team;

  const handle_add_team = async () => {
    navigation.navigate("AddTeam");
  };

  const handlePress = (id) => {
    if (!clickedList.some((_id) => _id === id)) {
      setClickedList([...clickedList, id]);
    } else {
      setClickedList(clickedList.filter((_id) => _id !== id));
    }
  };

  const handleDelete = async () => {
    for (const id of clickedList) {
      await deleteUser(id);
    }
    Alert.alert("Deletion was successful");
    const updatedTeam = team.filter((item) => !clickedList.includes(item.id));
    dispatch.team({ type: "SET_TEAM", payload: updatedTeam });
    setClickedList([]);
  };

  return (
    <View style={styles.container}>
      <Text style={style.title}>צוות המוסד</Text>
      <ScrollView style={style.innerContainer}>
        {team && team.length > 0 ? (
          team.map((item, index) => (
            <TouchableOpacity
              style={[
                style.card,
                clickedList.some((_id) => _id === item.id)
                  ? style.clickedBox
                  : style.unclickedBox,
              ]}
              onPress={() => handlePress(item.id)}
              key={index}
            >
              <Text style={style.title2}>
                {item.fName} {item.lName}
              </Text>
              <Text style={style.text}>{item.title}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={style.noTeamText}>No team members available.</Text>
        )}
      </ScrollView>
      <View style={style.buttonContainer}>
        <CustomButton
          title="מחק"
          onPress={handleDelete}
          disabled={clickedList.length < 1}
        />
        <CustomButton title="הוסף איש צוות" onPress={handle_add_team} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  innerContainer: {
    margin: 10,
    padding: 5,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 5,
  },
  card: {
    width: "75%",
    height: 80,
    marginVertical: 8,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 10,
    borderColor: "#095b80",
    borderWidth: 2,
  },
  title2: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  },
  clickedBox: {
    backgroundColor: "#6093ab",
  },
  unclickedBox: {
    backgroundColor: "#cce1e8",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
});
