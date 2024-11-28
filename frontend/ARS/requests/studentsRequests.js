import { getToken } from "../utils/tokenHandling";
import { API_URL } from "@env";
import axios from "axios";
import { getUserID } from "../utils/storID";

export const getStudents = async (dispatch) => {
  const token = await getToken();
  const userID = await getUserID();
  try {
    const response = await axios.get(`${API_URL}/students/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch.students({ type: "SET_STUDENTS", payload: response.data });
  } catch (error) {
    // console.log("Error fetching students: ", error.data);
  }
};

export const addStudent = async (dispatch, student) => {
  const token = await getToken();
  try {
    const response = await axios.post(`${API_URL}/student`, student, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch.students({ type: "ADD_STUDENT", payload: response.data });
    dispatch.attendance({
      type: "ADD_TO_UNCHECKED_IDS",
      payload: response.data._id,
    });
  } catch (error) {
    // console.log("Error adding student: ", error.data);
  }
};

export const updateStudent = async (dispatch, student_id, student) => {
  const token = await getToken();
  try {
    const response = await axios.put(
      `${API_URL}/student/${student_id}`,
      student,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch.students({ type: "UPDATE_STUDENT", payload: response.data });
    return "Student updated seccessfully.";
  } catch (error) {
    return error;
  }
};

export const deleteStudent = async (dispatch, studentID) => {
  const token = await getToken();
  try {
    const response = await axios.delete(`${API_URL}/student/${studentID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch.students({ type: "DELETE_STUDENT", payload: response.data.id });
  } catch (error) {
    console.log("Error deleting student: ", error.data);
  }
};

export const addStudentsExcelFile = async (dispatch, form) => {
  const token = await getToken();
  const userID = await getUserID();
  try {
    const response = await axios.post(`${API_URL}/students-file`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
        "User-ID": userID,
      },
    });

    if (response.data.students) {
      dispatch.students({
        type: "ADD_STUDENTS",
        payload: response.data.students,
      });
      const idsList = response.data.students.map((student) => student._id);
      dispatch.attendance({
        type: "ADD_LIST_TO_UNCHECKED_IDS",
        payload: idsList,
      });
    }
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
