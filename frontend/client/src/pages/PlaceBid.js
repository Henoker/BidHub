import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { placeNewBid } from "../features/auction/auctionSlice";

export default function PlaceBid({ listingId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { isLoading, isError, message } = useSelector((state) => state.listing);
  const [newBid, setNewBid] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newBid || isNaN(newBid)) {
      alert("Please enter a valid bid amount.");
      return;
    }

    // Dispatch the placeNewBid thunk
    dispatch(placeNewBid({ listingId, newBid: Number(newBid) }))
      .unwrap() // Unwrap the promise to handle success/error
      .then(() => {
        alert("Bid placed successfully!");
        setNewBid(""); // Reset the input field
        navigate("/active-listings");
      })
      .catch((error) => {
        alert(`Failed to place bid: ${error.message}`);
      });
  };

  return (
    <div className="flex flex-col w-full max-w-md p-12 space-y-4 text-center bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-semibold">Place your Bid</h1>
      <form noValidate="" onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="password" className="sr-only">
            New bid amount
          </label>
          <input
            type="number"
            value={newBid}
            onChange={(e) => setNewBid(e.target.value)}
            placeholder="Enter your bid"
            required
            className="rounded-t-md border-gray-400 bg-gray-50 text-gray-800 focus:ring-violet-600 focus:border-violet-600 focus:ring-2"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 space-x-2 font-semibold rounded bg-violet-600 text-gray-50"
        >
          {isLoading ? "Placing Bid..." : "Place Bid"}
        </button>
        {isError && <p style={{ color: "red" }}>{message}</p>}
      </form>
    </div>
  );
}
