import axios from "axios";

const API_URL = "http://localhost:8000/api/v1";

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register/`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login/`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

// Request password reset
const requestPasswordReset = async (email) => {
  const response = await axios.post(`${API_URL}/password_reset/`, { email });
  return response.data;
};

// Confirm password reset
const confirmPasswordReset = async (token, password) => {
  const response = await axios.post(`${API_URL}/password_reset/confirm/`, {
    token,
    password,
  });
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  requestPasswordReset,
  confirmPasswordReset,
};

export default authService;

// import axios from "axios";

// const BACKEND_DOMAIN = "http://localhost:8000";

// const REGISTER_URL = `${BACKEND_DOMAIN}/api/v1/register/`;
// const LOGIN_URL = `${BACKEND_DOMAIN}/api/v1/login/`;
// const ACTIVATE_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/activation/`;
// const RESET_PASSWORD_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password/`;
// const RESET_PASSWORD_CONFIRM_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password_confirm/`;
// const GET_USER_INFO = `${BACKEND_DOMAIN}/api/v1/auth/users/me/`;
// const ACTIVE_LISTINGS = `${BACKEND_DOMAIN}/api/v1/`;

// // Register user

// const register = async (userData) => {
//   const config = {
//     headers: {
//       "Content-type": "application/json",
//     },
//   };

//   const response = await axios.post(REGISTER_URL, userData, config);

//   return response.data;
// };

// // Login user

// const login = async (userData) => {
//   const config = {
//     headers: {
//       "Content-type": "application/json",
//     },
//   };

//   const response = await axios.post(LOGIN_URL, userData, config);

//   if (response.data) {
//     localStorage.setItem("user", JSON.stringify(response.data));
//   }

//   return response.data;
// };

// // Logout

// const logout = () => {
//   return localStorage.removeItem("user");
// };

// // Activate user

// const activate = async (userData) => {
//   const config = {
//     headers: {
//       "Content-type": "application/json",
//     },
//   };

//   const response = await axios.post(ACTIVATE_URL, userData, config);

//   return response.data;
// };

// // Reset Password

// const resetPassword = async (userData) => {
//   const config = {
//     headers: {
//       "Content-type": "application/json",
//     },
//   };

//   const response = await axios.post(RESET_PASSWORD_URL, userData, config);

//   return response.data;
// };

// // Reset Password

// const resetPasswordConfirm = async (userData) => {
//   const config = {
//     headers: {
//       "Content-type": "application/json",
//     },
//   };

//   const response = await axios.post(
//     RESET_PASSWORD_CONFIRM_URL,
//     userData,
//     config
//   );

//   return response.data;
// };

// // Get User Info

// const getUserInfo = async (accessToken) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   };

//   const response = await axios.get(GET_USER_INFO, config);

//   return response.data;
// };

// // Get Active LIstings

// const activeListings = async () => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const response = await axios.get(ACTIVE_LISTINGS, config);

//   return response.data;
// };

// const authService = {
//   register,
//   login,
//   logout,
//   activate,
//   resetPassword,
//   resetPasswordConfirm,
//   getUserInfo,
//   activeListings,
// };

// export default authService;
