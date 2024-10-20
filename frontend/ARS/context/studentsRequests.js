import axios from 'axios';
import { createContext, useEffect, useReducer} from 'react'
import { API_URL } from '@env'
import { getToken } from '../utils/tokenHandling';
import { studentReducer } from './studentReducer';


export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const initialState = { students: []}

    const [state, dispatch] = useReducer(studentReducer, initialState)

    const getStudents = async () => {
        try {
            const token = await getToken()
            const response = await axios.get(`${API_URL}/students`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            dispatch({
                type: 'SET_STUDENTS',
                payload: response.data
            })
            } catch (error) {
                console.log("Error fetching students: ",error.data)
        }
    }

    const addStudent = async (student) => {
        try {
            const token = await getToken()
            const response = await axios.post(`${API_URL}/student`, student, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            dispatch({
                type: 'ADD_STUDENT',
                payload: response.data
            })
            } catch (error) {
                console.log("Error adding student: ", error.data)
        }
    }

    const updateStudent = async (student_id, student) => {
        try {
            const token = await getToken()
            const response = await axios.put(`${API_URL}/student/${student_id}`, student, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            dispatch({
                type: 'UPDATE_STUDENT',
                payload: response.data
            })
            } catch (error) {
                console.log("Error updating student: ", error.data)
        }
    }

    
    const deleteStudent = async (studentID) => {
        try {
            const token = await getToken()
            const response = await axios.delete(`${API_URL}/student/${studentID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            dispatch({
                type: 'DELETE_STUDENT',
                payload: response.data.id
            })
            } catch (error) {
                console.log("Error deleting student: ", error.data)
        }
    }

    const addStudentsExcelFile = async (form) => {
        try {
            const token = await getToken()
            const response = await axios.post(`${API_URL}/students-file`, form, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
              }
            })
            
            if (response.data.students) {
                dispatch({
                type: 'ADD_STUDENTS',
                payload: response.data.students
            })
                return response.data
            } else {
                return response.data
            }  
        } catch (error) {
            return error.response.data
        }
    }



    useEffect(() => {
        getStudents()
    }, [])


    return(
        <StudentContext.Provider 
        value={{
            students: state.students,
            addStudent,
            updateStudent,
            deleteStudent,
            addStudentsExcelFile
            }}>
            {children}
        </StudentContext.Provider>
    )
}