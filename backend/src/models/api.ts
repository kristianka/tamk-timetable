import axios from "axios";
import { CourseResponse, ClassResponse } from "../../types";

export const getByCourse = async (code: string) => {
  return await axios.post<CourseResponse>(
    "https://opendata.tamk.fi/r1/reservation/search",
    {
      realization: [code]
    },
    {
      auth: {
        username: process.env.TAMK_API_KEY || "",
        password: ""
      }
    }
  );
};

export const getByClass = async (code: string) => {
  return await axios.post<ClassResponse>(
    "https://opendata.tamk.fi/r1/reservation/search",
    {
      studentGroup: [code]
    },
    {
      auth: {
        username: process.env.TAMK_API_KEY || "",
        password: ""
      }
    }
  );
};
