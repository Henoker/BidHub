import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import rootReducer from '../features/auction/rootReducer';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        reducer: rootReducer,
    },
})

