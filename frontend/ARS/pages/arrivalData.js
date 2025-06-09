import { useContext, useState } from "react";
import Background from "./background"
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { UserContext } from "../context/userContext";


export const ArrivalData = () => {
    const { state } = useContext(UserContext)
    const studentsDetails = state.students
    const studentsPeriodData = state.period.students
    const schollDays_ = state.period


    const [selectedFilter, setSelectedFilter] = useState('שבוע');
    const [selectedPeriod, setSelectedPeriod] = useState('week');

    const handleSelectFilter = async (period) => {
      const periodToEnglish = {
        "שבוע": "week",
        "שבועיים" : "twoWeeks",
        "חודש": "month" ,
        "רבעון": "quarter"
      }
        setSelectedFilter(period);
        setSelectedPeriod(periodToEnglish[period])
    }

    return (
      <Background>
        <View style={style.filters}>
          {["שבוע", "שבועיים", "חודש", "רבעון"].map((period, idx) => (
            <TouchableOpacity
              key={period}
              style={[
                style.filterButton,
                idx === 0 && style.startButton,
                idx === 3 && style.endButton,
                selectedFilter === period && style.selectedFilter,
              ]}
              onPress={() => handleSelectFilter(period)}
            >
              <Text style={style.filterText}>{period}</Text>
            </TouchableOpacity>   
          ))}
        </View>
        <ScrollView style={style.scrollView}>
          {studentsDetails && studentsDetails.map((student, index) => {
            const studentID = student['_id']['$oid'];
            const schollDays = schollDays_.scholl_days[selectedPeriod];
            const attended = studentsPeriodData[studentID]?.[selectedPeriod] || 0;
            const percent = Math.round((attended / schollDays) * 100);
          return (
            <View style={style.card} key={index}>
              <Text style={style.nameText}>{`${student.name} ${student.lName}`}</Text>
              <View style={style.progressBarContainer}>
                <Text style={style.percentText}>{percent}%</Text>
                <View style={style.progressLineWrapper}>
                  <Text style={style.edgeLabel}>0</Text>

                  <View style={style.progressLineWrapperInner}>
                    <View style={style.progressLineBackground}>
                      <View style={[style.progressLineFill, { width: `${percent}%` }]} />
                    </View>

                    <View style={[style.attendedContainer, { left: `${percent}%` }]}>
                      <Text style={style.attendedText}>{attended}</Text>
                    </View>
                  </View>

                  <Text style={style.edgeLabel}>{schollDays}</Text>
                </View>
              </View>
            </View>
          )})}
        </ScrollView>                    
      </Background>
    )
  };

const style = StyleSheet.create({
  filters: {
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginHorizontal: '10%',
    marginVertical:'5%',
  },
  filterButton: {
    flex:1,
    backgroundColor: '#C1F2DC',
    borderTopWidth:2,
    borderBottomWidth:2,
    borderStartWidth:2,
    borderColor: '#10563b',
    alignItems:'center',
    padding: 5,
  },
  startButton: {
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10
  },
  endButton: {
    borderEndWidth:2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  filterText: {
    color: '#10563b',
    fontWeight:'bold',
    fontSize:14,
  },
  selectedFilter: {
    backgroundColor: '#9eeac8',
  },
  scrollView: {
    marginBottom: 20,
    marginHorizontal:10
  },
  card: {
      borderWidth:1,
      borderColor: '#10563b',
  },
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#e8fff5",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#10563b",
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#10563b",
    marginBottom: 10,
  },
  progressBarContainer: {
    alignItems: "center",
  },
  percentText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#10563b",
  },
  progressLineWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  edgeLabel: {
    width: 25,
    textAlign: "center",
    fontSize: 12,
    color: "#10563b",
  },
  progressLineBackground: {
    flex: 1,
    height: 10,
    backgroundColor: "#d6f7e8",
    borderRadius: 5,
    overflow: "hidden",
    marginHorizontal: 5,
  },
  progressLineFill: {
    height: "100%",
    backgroundColor: "#00a870",
  },
  attendedContainer: {
    position: 'absolute',
    top: 5, 
    transform: [{ translateX: 10 }]
  },
  attendedText: {
    fontSize: 11,
    color: '#10563b',
    fontWeight: 'bold',
  },
  progressLineWrapperInner: {
    flex: 1,
    position: 'relative', 
    marginHorizontal: 5,
  },
  progressLineBackground: {
    height: 10,
    backgroundColor: "#d6f7e8",
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressLineFill: {
    height: "100%",
    backgroundColor: "#00a870",
  },
  attendedContainer: {
    position: 'absolute',
    top: 14,
    transform: [{ translateX: -10 }],
  },
  attendedText: {
    fontSize: 11,
    color: '#10563b',
    fontWeight: 'bold',
  },
})