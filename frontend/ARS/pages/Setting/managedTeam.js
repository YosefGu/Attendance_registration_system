import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
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
    navigation.navigate('AddTeam');
  };

  const handlePress = async (id) => {
    if (!clickedList.some(_id => _id === id)) {
      setClickedList([...clickedList, id]);
    } else {
      setClickedList(clickedList.filter(_id => _id !== id));
    }
  };

  const handleDelete = async () => {
    for (const id of clickedList) {
      await deleteUser(id);
    }
    const updatedTeam = team.filter(item => !clickedList.includes(item.id));
    dispatch({ type: 'SET_TEAM', payload: updatedTeam });
    setClickedList([]);
  };

  return (
    <View style={teamStyle.container}>
      <Text style={styles.title}>Managed Team</Text>
      <ScrollView contentContainerStyle={teamStyle.scrollContainer}>
        {team && team.length > 0 ? (
          team.map((item, index) => (
            <TouchableOpacity
              style={[
                teamStyle.box,
                clickedList.some(id => id === item.id) ? teamStyle.clickedBox : teamStyle.unclickedBox,
              ]}
              onPress={() => handlePress(item.id)}
              key={index}
            >
              <View style={teamStyle.textContainer}>
                <Text style={teamStyle.nameText}>{item.fName} {item.lName}</Text>
                <Text style={teamStyle.titleText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={teamStyle.noTeamText}>No team members available.</Text>
        )}
      </ScrollView>
      <View style={teamStyle.buttonContainer}>
        <CustomButton
          title='מחק'
          onPress={handleDelete}
          disabled={clickedList.length < 1}
          style={clickedList.length < 1 ? teamStyle.disabledButton : teamStyle.deleteButton}
        />
        <CustomButton
          title='הוסף איש צוות'
          onPress={handle_add_team}
        />
      </View>
    </View>
  );
};

const teamStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  box: {
    width: "95%",
    height: 80,
    marginVertical: 8,
    padding: 15,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  clickedBox: {
    backgroundColor: '#449caa',
  },
  unclickedBox: {
    backgroundColor: '#229fff',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  titleText: {
    fontSize: 14,
    color: '#e0e0e0',
  },
  noTeamText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  deleteButton: {
    backgroundColor: '#d9534f',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
});
