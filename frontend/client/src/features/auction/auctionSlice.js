import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import auctionAPIService from "./auctionAPIService";

const initialState = {
  listings: [],
  listing: {}, // Single listing data
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Get all active auction listings
export const getAuctionListings = createAsyncThunk(
  "auction/listing",
  async (_, thunkAPI) => {
    try {
      const response = await auctionAPIService.getAuctionListings();
      console.log("API Response:", response);
      return response; // Ensure this is the array of listings
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

// Fetch a single listing by ID
export const fetchListingById = createAsyncThunk(
  "auction/fetchListingById",
  async (listingId, thunkAPI) => {
    try {
      const response = await auctionAPIService.getListingById(listingId);
      return response;
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

export const ActiveListingsSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Handle getAuctionListings
      .addCase(getAuctionListings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAuctionListings.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.listings = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAuctionListings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Handle fetchListingById
      .addCase(fetchListingById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchListingById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listing = action.payload; // Assign to `listing`
      })
      .addCase(fetchListingById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // Set the error message
      });
  },
});

export const { reset } = ActiveListingsSlice.actions;

export default ActiveListingsSlice.reducer;
