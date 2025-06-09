import axios from "axios";
import { API_URL } from "@env";
import { getToken } from "../utils/tokenHandling";
import { getUserID } from "../utils/storID";
import { Buffer } from 'buffer'

export const getPeriodData = async (dispatch) => {
  const token = await getToken();
  const id = await getUserID();
  try {
    const response = await axios.get(`${API_URL}/period-data/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch.period({
      type: "SET_PERIOD_DATA",
      payload: response.data,
    })
  } catch (error) {
    return error.response;
  }
}

export const createPeriodFile = async (data) => {
  const token = await getToken();
  const id = await getUserID();
  try {
      const response = await axios.post(`${API_URL}/period-file/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'arraybuffer',
    });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    return base64;
  } catch (error) {
    throw new Error("לא ניתן ליצור את הקובץ");
  }
}