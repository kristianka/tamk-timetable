import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = "/api/info";

export const pingServer = async () => {
  try {
    await axios.get(`${baseUrl}/health/`);
    toast.success("Server is up and running!");
  } catch (error) {
    toast.error("Server is down! :(");
  }
};
