import { combineReducers } from '@reduxjs/toolkit';
import auctionsReducer from './auctionSlice.js'
const rootReducer = combineReducers({
  auctions: auctionsReducer,
  // Add other reducers as needed
});

export default rootReducer;