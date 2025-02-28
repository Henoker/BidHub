import axios from "axios";

const BACKEND_DOMAIN = "http://localhost:8000";

// Use correct endpoints based on your Django urls.py
const REGISTER_URL = `${BACKEND_DOMAIN}/api/v1/register/`; // Assuming you have a user registration app.
const LOGIN_URL = `${BACKEND_DOMAIN}/api/v1/login/`; // Assuming you have a user registration app.
const LOGOUT_URL = `${BACKEND_DOMAIN}/api/v1/logout/`; // Add logout url
const ACTIVATE_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/activation/`; // If you are using this endpoint
const RESET_PASSWORD_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password/`; // If you are using this endpoint
const RESET_PASSWORD_CONFIRM_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password_confirm/`; // If you are using this endpoint
const GET_USER_INFO = `${BACKEND_DOMAIN}/api/v1/auth/users/me/`; // If you are using this endpoint
const ACTIVE_LISTINGS = `${BACKEND_DOMAIN}/auctions/listing/`; // Corrected endpoint to match your urls.py file
const CREATE_LISTING = `${BACKEND_DOMAIN}/auctions/create-listing/`;

// Helper function to get the token from local storage
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token || null; // Access the token directly
};

// Helper function to get the config
const getConfig = () => {
  const token = getAuthToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers.Authorization = `Token ${token}`; // Using Knox format (Token token)
  }
  return config;
};

// Register user
const register = async (userData) => {
  const config = getConfig();
  const response = await axios.post(REGISTER_URL, userData, config);
  return response.data;
};

// Login user
const login = async (userData) => {
  const config = getConfig();
  const response = await axios.post(LOGIN_URL, userData, config);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data)); // Store the entire response
  }
  return response.data;
};

// Logout
const logout = async () => {
  const config = getConfig();
  const response = await axios.post(LOGOUT_URL, {}, config);
  localStorage.removeItem("user");
  return response.data;
};

// Activate user
const activate = async (userData) => {
  const config = getConfig();
  const response = await axios.post(ACTIVATE_URL, userData, config);
  return response.data;
};

// Reset Password
const resetPassword = async (userData) => {
  const config = getConfig();
  const response = await axios.post(RESET_PASSWORD_URL, userData, config);
  return response.data;
};

// Reset Password Confirm
const resetPasswordConfirm = async (userData) => {
  const config = getConfig();
  const response = await axios.post(
    RESET_PASSWORD_CONFIRM_URL,
    userData,
    config
  );
  return response.data;
};

// Get User Info
const getUserInfo = async () => {
  const config = getConfig();
  const response = await axios.get(GET_USER_INFO, config);
  return response.data;
};

// Get Active Listings
const activeListings = async () => {
  const config = getConfig();
  const response = await axios.get(ACTIVE_LISTINGS, config);
  return response.data;
};

// Create listing
const createListing = async (listingData) => {
  const config = getConfig();
  const response = await axios.post(CREATE_LISTING, listingData, config);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  activate,
  resetPassword,
  resetPasswordConfirm,
  getUserInfo,
  activeListings,
  createListing,
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
