import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/listing/";

// Get all auction listings
const getAuctionListings = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching auction listings:", error);
    throw error;
  }
};

const getListingById = async (listingId) => {
  try {
    const response = await axios.get(`${API_URL}/${listingId}/`);
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
