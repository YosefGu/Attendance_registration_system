import { createContext, useEffect, useReducer } from "react";
import { userInitialState, userReducer } from "../reducers/userReducer";
import { studentsInitialState, studentsReducer } from "../reducers/studentsReducer";
import { getUserHook } from '../requests/userRequests1'
import { getStudentsHook } from '../requests/studentsRequests'
import { attendanceInitialState, attendanceReducer } from "../reducers/attendanceReducer";
import { getAttendancList } from "../requests/attendanceRequests";
import { teamInitialState, teamReducer } from "../reducers/teamReducer";
import { get_team_members } from "../requests/teamRequests";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userState, userDispatch] = useReducer(userReducer, userInitialState)
    const [studentsState, studentsDispatch] = useReducer(studentsReducer, studentsInitialState)
    const [attendanceState, attendanceDispatch] = useReducer(attendanceReducer, attendanceInitialState)
    const [teamState, teamDispatch] = useReducer(teamReducer, teamInitialState)


    const state = {
        user: userState.userDetails,
        students: studentsState.students,
        attendance: attendanceState.attendance,
        team: teamState.team

    }

    const dispatch = {
        user: userDispatch,
        students: studentsDispatch,
        attendance: attendanceDispatch,
        team: teamDispatch

    }

    useEffect(() => {
        const fetchData = async () => {
            const getUser = getUserHook(dispatch)
            await getUser()
            const getStudents = getStudentsHook(dispatch)
            await getStudents()
            await getAttendancList(dispatch)
            await get_team_members(dispatch)
        }
        fetchData()
    },[])


    return(
        <UserContext.Provider
            value={{state, dispatch}}
        >
            { children }
        </UserContext.Provider>
    )
}

