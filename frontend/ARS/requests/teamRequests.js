import axios from "axios";
import { API_URL } from "@env";
import { getToken } from "../utils/tokenHandling";
import { getUserID } from "../utils/storID";

export const get_team_members = async (dispatch) => {
  try {
    const token = await getToken();
    const id = await getUserID();
    const response = await axios.get(`${API_URL}/get-team/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data.map((item) => ({
      ...item.details,
      id: item._id["$oid"],
    }));
    dispatch.team({ type: "SET_TEAM", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const add_team_member = async (dispatch, data) => {
  try {
    const token = await getToken();
    const response = await axios.post(`${API_URL}/add-team`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    data["id"] = response.data.user_id;
    dispatch.team({ type: "UPDATE_TEAM", payload: data });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
