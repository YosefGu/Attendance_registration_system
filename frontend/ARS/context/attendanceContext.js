import { createContext, useEffect, useState } from "react";
import axios from "axios"
import { API_URL } from '@env'
import { getToken } from "../utils/tokenHandling"


export const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {

    const [checkedIds, setCheckedIds] = useState([])

    const getAttendancList = async () => {
        try {
            const token = await getToken()
            const response = await axios.get(`${API_URL}/attendance-list`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if (response) {
                setCheckedIds(response.data["checkedIDs"])
                return 
            }
            
        } catch (error) {
            return () => console.log(error.response.data)
        }
    }

    const addAttendancList = async (data) => {
        try {
            const token = await getToken()
            const response = await axios.post(`${API_URL}/attendance-list`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            return () => console.log(response.data)
            } catch (error) {
                return error.response.error
        }
    }

    useEffect(() => {
        getAttendancList()
    }, [])


  return(
    <AttendanceContext.Provider
        value={{
            checkedIds,
            setCheckedIds,
            addAttendancList
        }}
    >
        {children}
    </AttendanceContext.Provider>
  )

}