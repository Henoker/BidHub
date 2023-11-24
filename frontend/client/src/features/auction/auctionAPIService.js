import axios from 'axios';

//Get Auction listings
const getAuctionListings = async () => {
    const response = await axios.get("/api/v1/");
    return response.data
} 

const auctionAPIService = getAuctionListings()

export default auctionAPIService