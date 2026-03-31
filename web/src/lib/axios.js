import axios from "axios"

const api = axios.create({
  baseURL: "https://memo-chat.onrender.com/api",
  withCredentials: true
});

export default api;