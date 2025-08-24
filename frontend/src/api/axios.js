import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",  // change when deployed
  withCredentials: true, // to send httpOnly cookies
});

export default instance;
