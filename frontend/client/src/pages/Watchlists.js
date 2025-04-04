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
      // <div className="text-center text-gray-600">No items in watchlist.</div>
      <section className="flex items-center h-full sm:p-16 bg-gray-50 text-gray-800">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-40 h-40 text-gray-400"
          >
            <path
              fill="currentColor"
              d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
            ></path>
            <rect
              width="176"
              height="32"
              x="168"
              y="320"
              fill="currentColor"
            ></rect>
            <polygon
              fill="currentColor"
              points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
            ></polygon>
            <polygon
              fill="currentColor"
              points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
            ></polygon>
          </svg>
          <p className="text-3xl">Looks like There are no items in watchlist</p>
          {/* <a rel="noopener noreferrer" href="#" className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50">Back to homepage</a> */}
        </div>
      </section>
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
                Listed by: {item.owner?.username || "Unknown"}
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
