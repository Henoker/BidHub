import axios from "axios";

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

const auctionAPIService = {
  getAuctionListings,
  getListingById,
  deleteListing,
  createListing,
  updateListing,
};

export default auctionAPIService;
