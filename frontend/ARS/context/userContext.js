import { createContext, useEffect, useReducer } from "react";
import { userInitialState, userReducer } from "../reducers/userReducer";
import {
  studentsInitialState,
  studentsReducer,
} from "../reducers/studentsReducer";
import { getUserDetails } from "../requests/userRequests1";
import { getStudents } from "../requests/studentsRequests";
import { attendanceInitialState, attendanceReducer } from "../reducers/attendanceReducer";
import { getAttendancList } from "../requests/attendanceRequests";
import { teamInitialState, teamReducer } from "../reducers/teamReducer";
import { get_team_members } from "../requests/teamRequests";
import { periodReducer, periodInitialState } from "../reducers/periodReducer";
import { getPeriodData } from "../requests/periodRequests";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, userInitialState);
  const [studentsState, studentsDispatch] = useReducer(
    studentsReducer,
    studentsInitialState
  );
  const [attendanceState, attendanceDispatch] = useReducer(
    attendanceReducer,
    attendanceInitialState
  );
  const [teamState, teamDispatch] = useReducer(teamReducer, teamInitialState);

  const [periodState, periodDispatch] = useReducer(periodReducer, periodInitialState);

  const state = {
    user: userState.userDetails,
    students: studentsState.students,
    attendance: attendanceState.attendance,
    team: teamState.team,
    period: periodState.periodData
  };

  const dispatch = {
    user: userDispatch,
    students: studentsDispatch,
    attendance: attendanceDispatch,
    team: teamDispatch,
    period: periodDispatch
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUserDetails(dispatch);
      await getStudents(dispatch);
      await getAttendancList(dispatch);
      await get_team_members(dispatch);
      await getPeriodData(dispatch);
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
