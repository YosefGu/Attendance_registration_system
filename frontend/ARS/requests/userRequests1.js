
import { getUserID } from "../utils/storID"
import { getToken } from "../utils/tokenHandling"
import { API_URL } from '@env'
import axios from 'axios';

export const getUserHook = (dispatch) => {
    const getUserDetails = async () => {
        const userID = await getUserID()
        const token = await getToken()
        try {
            const response = await axios.get(`${API_URL}/user/${userID}`, { 
                headers: {
                Authorization: `Bearer ${token}`,
            }})
            dispatch.user({ type: 'SET_USER_DETAILS', payload: response.data})
        } catch (error) {
            console.log("Error fetching user: ",error.data)
        }
    }
    return getUserDetails
    
}

export const updateUser = async (dispatch, user) => {  
    const update = async () => {
        const userID = await getUserID()
        const token = await getToken()
        try {
            const response = await axios.put(`${API_URL}/user/${userID}`, user, { 
                headers: {
                Authorization: `Bearer ${token}`,
            }})
            dispatch.user({ type: 'SET_USER_DETAILS', payload: response.data.details})
            } catch (error) {
                console.log("Error updating user: ", error.data)
        }
    }
    return update()
}


export const deleteUser = async (user_ID) => {
    const del = async () => {
        const token = await getToken()
        try {
            const response = await axios.delete(`${API_URL}/user/${user_ID}`, { 
                headers: {
                Authorization: `Bearer ${token}`,
            }})
            console.log(response.data)
            } catch (error) {
                console.log("Error deleting user: ", error.data)
        }
    }
    return del()
}