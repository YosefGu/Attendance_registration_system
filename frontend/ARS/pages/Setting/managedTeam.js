import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { deleteUser } from "../../requests/userRequests1";
import Background from "../background";
import { AntDesign, FontAwesome, FontAwesome6} from "@expo/vector-icons";


export const ManagedTeam = ({ navigation }) => {
  const { state, dispatch } = useContext(UserContext);
  const [clickedList, setClickedList] = useState([]);

  const title_ = {"assistant": "סייעת", "medical_assistant": "סייעת רפואית"}
  const team = state.team;

  const handleAddTeam = async () => {
    navigation.navigate("AddTeam");
  };

  const handlePress = (id) => {
    if (!clickedList.includes(id)) {
      setClickedList([...clickedList, id]);
    } else {
      setClickedList(clickedList.filter((_id) => _id !== id));
    }
  };

  const handleDelete = async () => {
    for (const id of clickedList) {
      await deleteUser(id);
    }
    Alert.alert("המחיקה בוצעה בהצלחה");
    const updatedTeam = team.filter((item) => !clickedList.includes(item.id));
    dispatch.team({ type: "SET_TEAM", payload: updatedTeam });
    setClickedList([]);
  };

  return (
    <Background>
        <ScrollView style={style.innerContainer}>
          {team && team.length > 0 ? (
            team.map((item, index) => (
              <TouchableOpacity
                style={[
                  style.card,
                  clickedList.includes(item.id)
                    ? style.cardChecked
                    : style.cardUnchecked,
                ]}
                onPress={() => handlePress(item.id)}
                key={index}
              >
                <View style={style.cardContent}>
                  <View style={style.cardText}>
                    <Text style={style.title}>
                      {item.fName} {item.lName}
                    </Text>
                    <Text style={style.subTitle}>{title_[item.title]}</Text>
                  </View>
                  <FontAwesome6 name="user-tie" size={24} style={style.icon} />
                </View>
              </TouchableOpacity>
              
            ))
          ) : (
            <Text style={style.noTeamText}>אין אנשי צוות כרגע.</Text>
          )}
        </ScrollView>
        <View style={style.bottonsContainer}>
          <TouchableOpacity style={style.fabButton} onPress={handleAddTeam}>  
            <FontAwesome name="user-plus" size={24} color="white" />
            <Text style={style.buttonText}>הוסף</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={style.fabButton} 
            onPress={handleDelete}
            disabled={clickedList.length < 1}
            >  
            <AntDesign name="deleteusergroup" size={24} color="white" />
            <Text style={style.buttonText}>מחק</Text>
          </TouchableOpacity>
            </View>
    </Background>
  );
};

const style = StyleSheet.create({
  innerContainer: {
    margin: 10,
    padding: 15,
    paddingTop:20,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal:10
  },
  cardText: {
    flex:1,
    justifyContent:'space-between'
  },
  icon: {
    color: "#10563b",
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#10563b",
  },
  subTitle: {
    fontSize: 15,
    color: "#333",
    fontWeight: 500,
  },

  noTeamText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: "#666",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardChecked: {
    backgroundColor: "#e1f5e5",
    borderLeftWidth: 5,
    borderLeftColor: "#10563b",
  },
  cardUnchecked: {
    backgroundColor: "#ecf9f4",
    borderLeftWidth: 5,
    borderLeftColor: "#ccc",
  },

  bottonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  fabButton: {
    backgroundColor: "#10563b",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
