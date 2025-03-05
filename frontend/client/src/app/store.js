import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import activeListingsReducer from "../features/auction/auctionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listing: activeListingsReducer,
  },
});
