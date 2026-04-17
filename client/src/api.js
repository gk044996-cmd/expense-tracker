import axios from "axios";

const API = axios.create({
    baseURL: "https://expense-tracker-backend-egiz.onrender.com/api"
});

export default API;