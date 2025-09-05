import axios from "axios";
import { toast } from "react-toastify";

const axiosApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

const notify = (msg, flag) => toast(msg, { type: flag ? "success" : "error" });

export { axiosApiInstance, notify };
