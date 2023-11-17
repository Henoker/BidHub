import axios from "axios";

const API_URL = 'http://localhost:8000/api/v1/';

export const AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Enable sending cookies with requests
  headers: {
    "Content-Type": "application/json"
}

});

export const axiosPrivateInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
      "Content-Type": "application/json"
  }
})