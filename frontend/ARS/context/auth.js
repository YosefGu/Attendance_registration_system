import { createContext, useEffect, useState } from "react";
import { verifyToken } from "../utils/auth";
import { deleteToken } from "../utils/tokenHandling";
import { LoadingScreen } from "../pages/loadingScreen";
import { deleteUserID } from "../utils/storID";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await deleteToken();
    await deleteUserID();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkToken = async () => {
      const isValid = await verifyToken();
      setIsAuthenticated(isValid);
      setLoading(false);
    };
    checkToken();
  }, []);

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
