import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

// Initial state
const initialState = {
  user: user ? user : null,
  userInfo: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  isPasswordResetRequested: false, // New state for password reset
  isPasswordResetConfirmed: false,
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const sendPasswordReset = createAsyncThunk(
  "auth/requestPasswordReset",
  async (email, thunkAPI) => {
    try {
      return await authService.requestPasswordReset(email);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Password reset confirmation
export const resetPasswordConfirm = createAsyncThunk(
  "auth/resetPasswordConfirm",
  async ({ token, password }, thunkAPI) => {
    try {
      return await authService.confirmPasswordReset(token, password);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Auth slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.isPasswordResetRequested = false;
      state.isPasswordResetConfirmed = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.userInfo = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.userInfo = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      // Password reset request
      .addCase(sendPasswordReset.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendPasswordReset.fulfilled, (state) => {
        state.isLoading = false;
        state.resetRequestSuccess = true;
        state.message = "Password reset email sent successfully.";
      })
      .addCase(sendPasswordReset.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Password reset confirmation
      .addCase(resetPasswordConfirm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPasswordConfirm.fulfilled, (state) => {
        state.isLoading = false;
        state.resetConfirmSuccess = true;
        state.message = "Password reset successful.";
      })
      .addCase(resetPasswordConfirm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import authService from "./authService";

// const user = JSON.parse(localStorage.getItem("user"))

// const initialState = {
//     user: user ? user : null,
//     userInfo: {},
//     isError: false,
//     isSuccess: false,
//     isLoading: false,
//     message: "",
// }

// export const register = createAsyncThunk(
//     "auth/register",
//     async (userData, thunkAPI) => {
//         try {
//             return await authService.register(userData)
//         } catch (error) {
//             const message = (error.response && error.response.data
//                 && error.response.data.message) ||
//                 error.message || error.toString()

//             return thunkAPI.rejectWithValue(message)
//         }
//     }
// )

// export const login = createAsyncThunk(
//     "auth/login",
//     async (userData, thunkAPI) => {
//         try {
//             return await authService.login(userData)
//         } catch (error) {
//             const message = (error.response && error.response.data
//                 && error.response.data.message) ||
//                 error.message || error.toString()

//             return thunkAPI.rejectWithValue(message)
//         }
//     }
// )

// export const logout = createAsyncThunk(
//     "auth/logout",
//     async () => {
//         authService.logout()
//     }
// )

// export const activate = createAsyncThunk(
//     "auth/activate",
//     async (userData, thunkAPI) => {
//         try {
//             return await authService.activate(userData)
//         } catch (error) {
//             const message = (error.response && error.response.data
//                 && error.response.data.message) ||
//                 error.message || error.toString()

//             return thunkAPI.rejectWithValue(message)
//         }
//     }
// )

// export const resetPassword = createAsyncThunk(
//     "auth/resetPassword",
//     async (userData, thunkAPI) => {
//         try {
//             return await authService.resetPassword(userData)
//         } catch (error) {
//             const message = (error.response && error.response.data
//                 && error.response.data.message) ||
//                 error.message || error.toString()

//             return thunkAPI.rejectWithValue(message)
//         }
//     }
// )

// export const resetPasswordConfirm = createAsyncThunk(
//     "auth/resetPasswordConfirm",
//     async (userData, thunkAPI) => {
//         try {
//             return await authService.resetPasswordConfirm(userData)
//         } catch (error) {
//             const message = (error.response && error.response.data
//                 && error.response.data.message) ||
//                 error.message || error.toString()

//             return thunkAPI.rejectWithValue(message)
//         }
//     }
// )

// export const getUserInfo = createAsyncThunk(
//     "auth/getUserInfo",
//     async (_, thunkAPI) => {
//         try {
//             const accessToken = thunkAPI.getState().auth.user.access
//             return await authService.getUserInfo(accessToken)
//         } catch (error) {
//             const message = (error.response && error.response.data
//                 && error.response.data.message) ||
//                 error.message || error.toString()

//             return thunkAPI.rejectWithValue(message)
//         }
//     }
// )

// export const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         reset: (state) => {
//             state.isLoading = false
//             state.isError = false
//             state.isSuccess = false
//             state.message = false
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(register.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(register.fulfilled, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = true
//                 state.user = action.payload
//             })
//             .addCase(register.rejected, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = false
//                 state.isError = true
//                 state.message = action.payload
//                 state.user = null
//             })
//             .addCase(login.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(login.fulfilled, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = true
//                 state.user = action.payload
//             })
//             .addCase(login.rejected, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = false
//                 state.isError = true
//                 state.message = action.payload
//                 state.user = null
//             })
//             .addCase(logout.fulfilled, (state) => {
//                 state.user = null
//             })
//             .addCase(activate.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(activate.fulfilled, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = true
//                 state.user = action.payload
//             })
//             .addCase(activate.rejected, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = false
//                 state.isError = true
//                 state.message = action.payload
//                 state.user = null
//             })
//             .addCase(resetPassword.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(resetPassword.fulfilled, (state) => {
//                 state.isLoading = false
//                 state.isSuccess = true
//             })
//             .addCase(resetPassword.rejected, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = false
//                 state.isError = true
//                 state.message = action.payload
//                 state.user = null
//             })
//             .addCase(resetPasswordConfirm.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(resetPasswordConfirm.fulfilled, (state) => {
//                 state.isLoading = false
//                 state.isSuccess = true
//             })
//             .addCase(resetPasswordConfirm.rejected, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = false
//                 state.isError = true
//                 state.message = action.payload
//                 state.user = null
//             })
//             .addCase(getUserInfo.fulfilled, (state, action) => {
//                 state.userInfo = action.payload
//             })
//     }
// })

// export const { reset } = authSlice.actions

// export default authSlice.reducer
