import { getUserID, storeUserID } from "../utils/storID";
import { getToken, storeToken } from "../utils/tokenHandling";
import { API_URL } from "@env";
import axios from "axios";

export const signup = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, data);
    await storeToken(response.data.access_token);
    await storeUserID(response.data.user_id);
    return "Registration was successfully completed";
  } catch (error) {
    return error.response.data;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    await storeToken(response.data.access_token);
    await storeUserID(response.data.user_id);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserDetails = async (dispatch) => {
  const userID = await getUserID();
  const token = await getToken();
  try {
    const response = await axios.get(`${API_URL}/user/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch.user({ type: "SET_USER_DETAILS", payload: response.data });
  } catch (error) {
    return
  }
};

export const updateUser = async (dispatch, user) => {
  const update = async () => {
    const userID = await getUserID();
    const token = await getToken();
    try {
      const response = await axios.put(`${API_URL}/user/${userID}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch.user({
        type: "SET_USER_DETAILS",
        payload: response.data.details,
      });
      return "User updated successfuly";
    } catch (error) {
      return error.response.data;
    }
  };
  return update();
};

export const deleteUser = async (user_ID) => {
  const del = async () => {
    const token = await getToken();
    try {
      const response = await axios.delete(`${API_URL}/user/${user_ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
    }
  };
  return del();
};
