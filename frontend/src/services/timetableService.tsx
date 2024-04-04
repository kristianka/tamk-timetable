import axios from "axios";
import { ClassResponse, CourseResponse } from "../types";
import { toast } from "react-toastify";
const baseUrl = "/api/timetables";

export const getTimetableByCourse = async (id: string) => {
  try {
    const res = await axios.get<CourseResponse>(`${baseUrl}/course/`, {
      params: { code: id }
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
      params: { code: id }
    });
    return res.data;
  } catch (error) {
    console.log("An error occured:", error);
    toast.error("Sorry, something went wrong. Make sure the code is correct.");
  }
};
