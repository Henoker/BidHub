import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auctionAPIService from './auctionAPIService';


const initialState = {
  listings: [],
  listing: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''

}

// Get all active auction listings

export const getAuctionListings = createAsyncThunk('auction/auctionlistings',
async (_, thunkAPI) => {
  try {
    const response = await auctionAPIService.getAuctionListings();
    console.log('API Response:', response);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }

}
)

export const ActiveListingsSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuctionListings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAuctionListings.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false
        state.listings = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAuctionListings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
      })
  },
});

export const { reset} = ActiveListingsSlice.actions;

export default ActiveListingsSlice.reducer;