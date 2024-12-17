import axios from "axios";
import { getToken } from "./tokenHandling";
import { API_URL } from "@env";

export const verifyToken = async () => {
  const token = await getToken();
  if (token) {
    try {
      const response = await axios.post(
        `${API_URL}/verify-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.isValid;
    } catch (error) {
      console.error("Token verfication failed:", error);
      return false;
    }
  }
  return false;
};
