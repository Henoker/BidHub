// src/pages/ActiveListings.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuctionListings, reset } from "../features/auction/auctionSlice";
import Spinner from "../components/Spinner";

export default function ActiveListings() {
  const dispatch = useDispatch();
  const { listings, isLoading, isError, message } = useSelector(
    (state) => state.listing
  );

  useEffect(() => {
    // Fetch auction listings when the component mounts
    dispatch(getAuctionListings());

    // Cleanup function to reset the state when the component unmounts
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    console.log("Fetched Listing:", listings);
  }, [listings]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error: {message}</div>;
  }

  // Check if listings is undefined or empty
  if (!listings || listings.length === 0) {
    return <div>No listings found.</div>;
  }

  return (
    <section className="bg-gray-100 text-gray-800">
      <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
        {/* Featured Auction Listing */}
        {listings.length > 0 && (
          <a
            rel="noopener noreferrer"
            href={`/listing/${listings[0].id}`} // Replace with your actual route
            className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 bg-gray-50"
          >
            <img
              src={
                listings[0].url || "https://source.unsplash.com/random/480x360"
              }
              alt={listings[0].name_of_item}
              className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 bg-gray-500"
            />
            <div className="p-6 space-y-2 lg:col-span-5">
              <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
                {listings[0].name_of_item}
              </h3>
              <span className="text-xs text-gray-600">
                Listed by: {listings[0].owner?.username || "Unknown"}
              </span>
              <p>{listings[0].description}</p>
              <p className="font-semibold">
                Current Bid: ${listings[0].bid?.bid || "N/A"}
              </p>
            </div>
          </a>
        )}

        {/* Grid of Auction Listings */}
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.slice(1).map((listing) => (
            <a
              key={listing.id}
              rel="noopener noreferrer"
              href={`/listing/${listing.id}`} // Replace with your actual route
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-50"
            >
              <img
                role="presentation"
                className="object-cover w-full rounded h-44 bg-gray-500"
                src={
                  listing.url || "https://source.unsplash.com/random/480x360"
                }
                alt={listing.name_of_item}
              />
              <div className="p-6 space-y-2">
                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
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
            </a>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center">
          <button
            type="button"
            className="px-6 py-3 text-sm rounded-md hover:underline bg-gray-50 text-gray-600"
          >
            Load more posts...
          </button>
        </div>
      </div>
    </section>
  );
}
