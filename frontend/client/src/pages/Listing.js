import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchListingById, reset } from "../features/auction/auctionSlice";
import Spinner from "../components/Spinner";

export default function Listing() {
  const dispatch = useDispatch();
  const { id: listingId } = useParams(); // Extract `listingId` from the URL
  const { listing, isLoading, isError, message } = useSelector(
    (state) => state.listing
  );

  useEffect(() => {
    console.log("Listing ID:", listingId); // Debugging
    dispatch(fetchListingById(listingId));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, listingId]);

  useEffect(() => {
    console.log("Fetched Listing:", listing); // Debugging
  }, [listing]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error: {message || "Failed to fetch listing."}</div>;
  }

  if (!listing || Object.keys(listing).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-gray-100 text-gray-800">
      <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
        <div className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 bg-gray-50">
          <img
            src={listing.url || "https://source.unsplash.com/random/480x360"}
            alt={listing.name_of_item}
            className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 bg-gray-500"
          />
          <div className="p-6 space-y-2 lg:col-span-5">
            <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
              {listing.name_of_item}
            </h3>
            <span className="text-xs text-gray-600">
              Listed by: {listing.owner?.username || "Unknown"}
            </span>
            <p>{listing.description}</p>
            <p className="font-semibold">
              Current Bid: ${listing.bid?.bid || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
