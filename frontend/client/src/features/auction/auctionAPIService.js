import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/listing/";

// Get all auction listings
const getAuctionListings = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching auction listings:", error);
    throw error;
  }
};

// Get a single listing by ID
const getListingById = async (listingId) => {
  try {
    const response = await axios.get(`${API_URL}${listingId}/`); // Ensure no extra `/`
    console.log("API Response for Single Listing:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("Error fetching listing:", error);
    throw error;
  }
};

const auctionAPIService = {
  getAuctionListings,
  getListingById,
};

export default auctionAPIService;
