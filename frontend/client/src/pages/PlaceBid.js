import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeBid } from "../features/auction/auctionSlice";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PlaceBid() {
  const { id: listingId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [bidAmount, setBidAmount] = useState("");

  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bidAmount || isNaN(bidAmount)) {
      toast.error("Please enter a valid bid amount.");
      return;
    }

    try {
      await dispatch(
        placeBid({ listingId, bid: bidAmount, userId: user.user.id })
      ).unwrap();
      toast.success("Bid placed successfully!");
      navigate("/active-listings"); // ✅ Correct navigation
    } catch (error) {
      toast.error(error?.message || "Failed to place bid.");
    }

    setBidAmount(""); // Reset input after submitting
  };

  return (
    <div className="max-w-lg mx-auto mt-6 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Place a Bid</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter your bid"
          className="w-full p-2 border rounded-md"
          min="0"
          required
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Submit Bid
        </button>
      </form>
    </div>
  );
}
