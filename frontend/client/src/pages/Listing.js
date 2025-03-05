import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAuctionListings, reset } from "../features/auction/auctionSlice";
import Spinner from "../components/Spinner";

export default function Listing() {
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const { listing, isLoading, isError, message } = useSelector(
    (state) => state.listing
  );

  useEffect(() => {
    // Fetch auction listing when the component mounts
    dispatch(getAuctionListings(listingId));

    // Cleanup function to reset the state when the component unmounts
    return () => {
      dispatch(reset());
    };
  }, [dispatch, listingId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error: {message}</div>;
  }

  if (!listing) {
    return <div>Listing not found.</div>;
  }

  return (
    <section className="bg-gray-100 text-gray-800">
      <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
        {/* Featured Auction Listing */}
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
              Listed by: {listing.owner.username}
            </span>
            <p>{listing.description}</p>
            <p className="font-semibold">Current Bid: ${listing.bid.bid}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
