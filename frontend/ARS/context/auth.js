import { createContext, useEffect, useState } from "react";
import { verifyToken } from "../utils/auth";
import { deleteToken } from "../utils/tokenHandling";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);


    const logout = async () => {
        await deleteToken();
        setIsAuthenticated(false)
    }


    useEffect(() => {
        const checkToken = async () => {
            const isValid = await verifyToken();
            setIsAuthenticated(isValid)
            setLoading(false)
        }
        checkToken();
    }, [])

    return(
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, loading, logout}}>
            {!loading && children }
        </AuthContext.Provider>
    )
}