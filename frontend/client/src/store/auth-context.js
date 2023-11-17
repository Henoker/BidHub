import React, { createContext, useContext, useReducer } from 'react';

// Define actions
const SET_USER = 'SET_USER';
const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
const SET_CSRF_TOKEN = 'SET_CSRF_TOKEN';

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_ACCESS_TOKEN:
      return { ...state, accessToken: action.payload };
    case SET_REFRESH_TOKEN:
      return { ...state, refreshToken: action.payload };
    case SET_CSRF_TOKEN:
      return { ...state, csrftoken: action.payload };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  user: {},
  accessToken: null,
  refreshToken: null,
  csrftoken: null,
};

// Create context
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const setUserData = (user) => {
    dispatch({ type: SET_USER, payload: user });
  };

  const setAccessToken = (token) => {
    dispatch({ type: SET_ACCESS_TOKEN, payload: token });
  };

  const setRefreshToken = (token) => {
    dispatch({ type: SET_REFRESH_TOKEN, payload: token });
  };

  const setCSRFToken = (token) => {
    dispatch({ type: SET_CSRF_TOKEN, payload: token });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setUser: setUserData,
        setAccessToken,
        setRefreshToken,
        setCSRFToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
