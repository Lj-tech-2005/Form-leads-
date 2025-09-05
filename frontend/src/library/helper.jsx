import axios from "axios";
import { toast } from "react-toastify";

const axiosApiInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
});

const notify = (msg, flag) => toast(msg, { type: flag ? "success" : "error" });


export { axiosApiInstance,notify}