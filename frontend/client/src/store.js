import   { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user';

import { useSelector } from 'react-redux';


export const store = configureStore({
    reducer: {
        user: userReducer,
        devTools: process.env.NODE_ENV !== 'production'
    },
});

