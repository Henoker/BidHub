import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchWatchlist,
  removeFromWatchlist,
} from "../features/auction/auctionAPIService";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

export default function Watchlists() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { watchlist, isLoading, isError, message } = useSelector(
    (state) => state.listing
  );

  useEffect(() => {
    dispatch(fetchWatchlist());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error: {message || "Failed to fetch watchlist."}</div>;
  }

  if (!watchlist || watchlist.length === 0) {
    return (
      <div className="text-center text-gray-600">No items in watchlist.</div>
    );
  }

  return (
    <section className="bg-gray-100 text-gray-800">
      <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
        {watchlist.map((item) => (
          <div
            key={item.id}
            className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 bg-gray-50"
          >
            <img
              src={item.url || "https://source.unsplash.com/random/480x360"}
              alt={item.name_of_item}
              className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 bg-gray-500"
            />
            <div className="p-6 space-y-2 lg:col-span-5">
              <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
                {item.name_of_item}
              </h3>
              <span className="text-xs text-gray-600">
                Listed by: {item.owner.username || "Unknown"}
              </span>
              <p>{item.description}</p>
              <p className="font-semibold">
                Current Bid: ${item.bid?.bid || "N/A"}
              </p>
              <div className="flex space-x-4 mt-4">
                <Link to={`/listing/${item.id}`}>
                  <button className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    View Listing
                  </button>
                </Link>
                <button
                  onClick={() => dispatch(removeFromWatchlist(item.id))}
                  className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Remove from Watchlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
