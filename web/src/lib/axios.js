import axios from "axios"

const api = axios.create({
  baseURL: "https://memo-chat.onrender.com",
  withCredentials: true
});

export default api;