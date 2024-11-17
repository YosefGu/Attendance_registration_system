import axios from "axios"
import { API_URL } from '@env'
import { getToken } from "../utils/tokenHandling"
import { getUserID } from "../utils/storID"


export const getAttendancList = async (dispatch) => {
    const token = await getToken()
    const id = await getUserID()
    try {
        const response = await axios.get(`${API_URL}/attendance-list/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }})
        // console.log(response.data)
        dispatch.attendance({type:'SET_ATTENDANCE_LIST', payload: {
            "checkedIDs": response.data.checkedIDs, 
            "uncheckedIDs": response.data.uncheckedIDs
        }})       
    } catch (error) {
        return error.response.data
    }
}


export const addAttendancList = async (dispatch, data) => {
    try {
        const token = await getToken()
        const response = await axios.post(`${API_URL}/attendance-list`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        
        dispatch.attendance({type:'SET_ATTENDANCE_LIST', payload: data}) 
        } catch (error) {
            return error.response.error
    }
}