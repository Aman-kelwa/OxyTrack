import axios from "axios";

const API = axios.create({
  baseURL: "https://oxytrack.onrender.com/api",
});

export default API;
