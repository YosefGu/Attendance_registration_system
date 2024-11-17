import { getToken } from "../utils/tokenHandling"
import { API_URL } from '@env'
import axios from 'axios';
import { getUserID } from "../utils/storID";


export const getStudentsHook = (dispatch) => {
    const getStudents = async () => {
        const token = await getToken()
        const userID = await getUserID()
        try {
            const response = await axios.get(`${API_URL}/students/${userID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            dispatch.students({ type: 'SET_STUDENTS', payload: response.data})
        } catch (error) {
            console.log("Error fetching students: ",error.data)  
        }
    }
    return getStudents
}

export const addStudent = async (dispatch, student) => {
    const add = async () => {
        const token = await getToken()
        try {
            const response = await axios.post(`${API_URL}/student`, student, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            dispatch.students({type: 'ADD_STUDENT',payload: response.data})
            } catch (error) {
                console.log("Error adding student: ", error.data)
        }
    }
   return add()
}

export const updateStudent = async (dispatch, student_id, student) => {
    const update = async () => {
        const token = await getToken()
        try {
            const response = await axios.put(`${API_URL}/student/${student_id}`, student, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            dispatch.students({type: 'UPDATE_STUDENT', payload: response.data })   
            } catch (error) {
                console.log("Error updating student: ", error.data)
        }
    }
    return update()
}


export const deleteStudent = async (dispatch, studentID) => {
    const del = async () => {
        const token = await getToken()
        try {
            const response = await axios.delete(`${API_URL}/student/${studentID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            dispatch.students({ type: 'DELETE_STUDENT',payload: response.data.id})
            } catch (error) {
                console.log("Error deleting student: ", error.data)
        }
    }
    return del()
}
   

export const addStudentsExcelFile = async (dispatch, form) => {
    const addFile = async () => {
        const token = await getToken()
        const userID = await getUserID()
        try {
            const response = await axios.post(`${API_URL}/students-file`, form, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
                'User-ID': userID
              }
            })
            
            if (response.data.students) {dispatch.students({type: 'ADD_STUDENTS',payload: response.data.students})
                return response.data
            } else {
                return response.data
            }  
        } catch (error) {
            return error.response.data
        }
    }
   return addFile()
}