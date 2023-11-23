// auctionsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAuctionListings = createAsyncThunk('auctions/fetchAuctionListings', async () => {
  const response = await axios.get('/http://localhost:8000/api/v1/');
  return response.data;
});

const auctionsSlice = createSlice({
  name: 'auctions',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuctionListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuctionListings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAuctionListings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default auctionsSlice.reducer;
