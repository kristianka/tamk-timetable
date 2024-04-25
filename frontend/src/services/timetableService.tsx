import axios from "axios";
import { ClassResponse, CourseResponse } from "../types";
import { toast } from "react-toastify";
const baseUrl = "/api/timetables";

let token = "";

export const setToken = (newToken: string) => {
  token = newToken;
};

export const getTimetableByCourse = async (id: string) => {
  try {
    const res = await axios.get<CourseResponse>(`${baseUrl}/course/`, {
      params: { code: id },
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (error) {
    console.log("An error occured:", error);
    toast.error("Sorry, something went wrong. Make sure the code is correct.");
  }
};

export const getTimetableByClass = async (id: string) => {
  try {
    const res = await axios.get<ClassResponse>(`${baseUrl}/class/`, {
      params: { code: id },
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (error) {
    console.log("An error occured:", error);
    toast.error("Sorry, something went wrong. Make sure the code is correct.");
  }
};

export const getUsersTimetable = async () => {
  try {
    const res = await axios.get(`${baseUrl}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (error) {
    console.log("An error occured:", error);
    toast.error("Sorry, something went wrong. Make sure the code is correct.");
  }
};

export const uploadTimetable = async (codes: string[]) => {
  try {
    const res = await axios.post(
      `${baseUrl}`,
      { codes },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return res.data;
  } catch (error) {
    console.log("An error occured:", error);
    toast.error("Sorry, something went wrong. Make sure the code is correct.");
  }
};
