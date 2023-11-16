import axios from "axios";

const baseURL = 'http://localhost:8000/api/v1/';

const AxiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Enable sending cookies with requests
});

export default AxiosInstance;

// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import dayjs from "dayjs";

// // Get tokens from local storage
// let accessToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : "";
// let refreshToken = localStorage.getItem('refresh_token') ? JSON.parse(localStorage.getItem('refresh_token')) : "";

// const baseURL = 'http://localhost:8000/api/v1/';

// const AxiosInstance = axios.create({
//   baseURL: baseURL,
//   headers: {
//     'Content-type': 'application/json',
//     'Authorization': accessToken ? `Bearer ${accessToken}` : "",
//   },
// });

// AxiosInstance.interceptors.request.use(async (req) => {
//   // Check if both access token and refresh token exist
//   if (accessToken && refreshToken) {
//     req.headers.Authorization = `Bearer ${accessToken}`;

//     const user = jwtDecode(accessToken);
//     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

//     if (!isExpired) {
//       return req;
//     }

//     try {
//       // Attempt to refresh the access token
//       const response = await axios.post(`${baseURL}auth/token/refresh/`, {
//         refresh: refreshToken,
//       });

//       const newAccessToken = response.data.access;
//       console.log('New access token:', newAccessToken);
//       // Update access token in local storage
//       localStorage.setItem('token', JSON.stringify(newAccessToken));

//       // Update Authorization header in the request
//       req.headers.Authorization = `Bearer ${newAccessToken}`;

//       return req;
//     } catch (error) {
//       console.error('Token refresh failed:', error);

//       // Handle the case where token refresh fails (e.g., redirect to login page)
//       // You may also want to clear local storage or take other actions as needed

//       return Promise.reject(error);
//     }
//   } else {
//     // If tokens are missing, clear Authorization header
//     req.headers.Authorization = '';
//     return req;
//   }
// });

// export default AxiosInstance;
