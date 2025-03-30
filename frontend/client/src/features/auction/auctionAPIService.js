import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Set the base URL to the root of your API
const API_URL = "http://localhost:8000/api/v1/";

// Create an Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Function to get the token from local storage or Redux state
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Adjust this based on where you store the token
  return user?.token;
};

// Get all auction listings
const getAuctionListings = async () => {
  try {
    const token = getToken();
    const response = await axiosInstance.get("listing/", {
      // Use the correct endpoint
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching auction listings:", error);
    throw error;
  }
};

// Get a single listing by ID
const getListingById = async (listingId) => {
  try {
    const token = getToken();
    const response = await axiosInstance.get(`listing/${listingId}/`, {
      // Use the correct endpoint
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    console.log("API Response for Single Listing:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("Error fetching listing:", error);
    throw error;
  }
};

// Delete a listing by ID
const deleteListing = async (listingId) => {
  try {
    const token = getToken();
    const response = await axiosInstance.delete(`listing/${listingId}/`, {
      // Use the correct endpoint
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting listing:", error);
    throw error;
  }
};

// Create a new listing
const createListing = async (listingData) => {
  try {
    const token = getToken();
    const response = await axiosInstance.post("create-listing/", listingData, {
      // Use the correct endpoint
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json", // Ensure the content type is JSON
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
};

// Update a listing by ID
const updateListing = async ({ listingId, listingData }) => {
  try {
    const token = getToken();
    const response = await axiosInstance.put(
      `listing/${listingId}/`,
      listingData,
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating listing:", error);
    throw error;
  }
};

// place new bid
const placeBid = async (listingId, new_bid, userId) => {
  try {
    const token = getToken();

    const response = await axiosInstance.post(
      `new-bid/${listingId}/`, // ✅ Corrected URL
      { new_bid, userId },
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error placing bid:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchWatchlist = createAsyncThunk(
  "auctions/fetchWatchlist",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axiosInstance.get("watchlist/", {
        headers: { Authorization: `Token ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching watchlist"
      );
    }
  }
);

export const addToWatchlist = createAsyncThunk(
  "auctions/addToWatchlist",
  async (listingId, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axiosInstance.post(
        "watchlist/",
        { listing_id: listingId },
        { headers: { Authorization: `Token ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error adding to watchlist"
      );
    }
  }
);

export const removeFromWatchlist = createAsyncThunk(
  "auctions/removeFromWatchlist",
  async (listingId, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axiosInstance.delete("watchlist/", {
        headers: { Authorization: `Token ${token}` },
        data: { listing_id: listingId }, // DELETE requires `data`
      });
      return { listingId, message: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error removing from watchlist"
      );
    }
  }
);

// Close an auction by ID
const closeAuction = async (listingId) => {
  try {
    const token = getToken();
    const response = await axiosInstance.post(
      `close-auction/${listingId}/`,
      {}, // Empty body since we're just closing
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error closing auction:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Add it to your exports
export const closeAuctionThunk = createAsyncThunk(
  "auctions/closeAuction",
  async (listingId, { rejectWithValue }) => {
    try {
      const response = await closeAuction(listingId);
      return { listingId, ...response };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error closing auction");
    }
  }
);

// Add new comment
const addComment = async (listingId, commentText) => {
  try {
    const token = getToken();
    const response = await axiosInstance.post(
      `add-comment/${listingId}/`,
      { comment: commentText },
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding comment:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get comments for a listing
const getComments = async (listingId) => {
  try {
    const token = getToken();
    const response = await axiosInstance.get(`comments/${listingId}/`, {
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching comments:",
      error.response?.data || error.message
    );
    return [];
  }
};

// Create async thunks for Redux
export const addCommentThunk = createAsyncThunk(
  "auctions/addComment",
  async ({ listingId, commentText }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`add-comment/${listingId}/`, {
        comment: commentText,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding comment");
    }
  }
);

export const fetchCommentsThunk = createAsyncThunk(
  "auctions/fetchComments",
  async (listingId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`comments/${listingId}/`);
      return { listingId, comments: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching comments");
    }
  }
);

const auctionAPIService = {
  getAuctionListings,
  getListingById,
  deleteListing,
  createListing,
  updateListing,
  placeBid,
  fetchWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  closeAuctionThunk,
  closeAuction,
  addComment,
  getComments,
  addCommentThunk,
  fetchCommentsThunk,
};

export default auctionAPIService;
