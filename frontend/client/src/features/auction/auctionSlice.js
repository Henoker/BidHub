import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import auctionAPIService from "./auctionAPIService";
import {
  fetchWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "./auctionAPIService";

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

export const deleteListing = createAsyncThunk(
  "auction/deleteListing",
  async (listingId, thunkAPI) => {
    try {
      const response = await auctionAPIService.deleteListing(listingId);
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

// Create a new listing
export const createListing = createAsyncThunk(
  "auction/createListing",
  async (listingData, thunkAPI) => {
    try {
      const response = await auctionAPIService.createListing(listingData);
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

// Update a listing by ID
export const updateListing = createAsyncThunk(
  "auction/updateListing",
  async ({ listingId, listingData }, thunkAPI) => {
    try {
      const response = await auctionAPIService.updateListing({
        listingId,
        listingData,
      });
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

// Place bid action
export const placeBid = createAsyncThunk(
  "auction/placeBid",
  async ({ listingId, bid, userId }, thunkAPI) => {
    try {
      return await auctionAPIService.placeBid(listingId, bid, userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const ActiveListingsSlice = createSlice({
  name: "listing",
  initialState: {
    listing: [],
    watchlist: [],
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    reset: (state) => initialState,
    clearWatchlist(state) {
      state.watchlist = [];
    },
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
        state.listing = action.payload.listing || action.payload; // Assign to `listing`
      })
      .addCase(fetchListingById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // Set the error message
      })
      // Handle deleteListing
      .addCase(deleteListing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Remove the deleted listing from the listings array
        state.listings = state.listings.filter(
          (listing) => listing.id !== action.payload.id
        );
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Handle createListing
      .addCase(createListing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listings.push(action.payload); // Add the new listing to the listings array
      })
      .addCase(createListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Handle updateListing
      .addCase(updateListing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Update the listing in the listings array
        state.listings = state.listings.map((listing) =>
          listing.id === action.payload.id ? action.payload : listing
        );
      })
      .addCase(updateListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Handle placeNewBid
      .addCase(placeBid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(placeBid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listing = {
          ...state.listing,
          bid: action.payload,
        };
      })
      .addCase(placeBid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchWatchlist.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.watchlist = action.payload;
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Handle adding to watchlist
      .addCase(addToWatchlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.watchlist = [];
        state.watchlist.push(action.payload); // Add new item to the array
      })
      .addCase(addToWatchlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Handle removing from watchlist
      .addCase(removeFromWatchlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.watchlist = state.watchlist.filter(
          (item) => item.id !== action.payload.listingId
        );
      })
      .addCase(removeFromWatchlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, clearWatchlist } = ActiveListingsSlice.actions;

export default ActiveListingsSlice.reducer;
