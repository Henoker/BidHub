import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchListingById, reset } from "../features/auction/auctionSlice";
import { user } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

export default function Listing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: listingId } = useParams(); // Extract `listingId` from the URL
  const { listing, isLoading, isError, message } = useSelector(
    (state) => state.listing
  );
  const { user } = useSelector((state) => state.auth); // Get the signed-in user

  // Debugging: Log the listing owner and signed-in user
  useEffect(() => {
    if (listing) {
      console.log("Listing Owner:", listing.owner);
    }
    if (user) {
      console.log("Signed-in User:", user);
    }
  }, [listing, user]);

  // Fetch listing data when the component mounts
  useEffect(() => {
    dispatch(fetchListingById(listingId));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, listingId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error: {message || "Failed to fetch listing."}</div>;
  }

  if (!listing || Object.keys(listing).length === 0) {
    return <div>Loading...</div>;
  }

  // Check if the signed-in user is the owner of the listing
  const isOwner = user && listing.owner && user.user.id === listing.owner.id;

  const handleEdit = () => {
    navigate(`/edit-listing/${listingId}`); // Redirect to the EditListing component
  };

  const handleDelete = () => {
    // Implement delete functionality here
    console.log("Delete listing:", listingId);
    // You can dispatch a delete action here
  };

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
              Listed by: {listing.owner.username || "Unknown"}
            </span>
            <p>{listing.description}</p>
            <p className="font-semibold">
              Current Bid: ${listing.bid?.bid || "N/A"}
            </p>
            {/* Conditionally render buttons based on ownership */}
            {/* Conditionally render buttons based on ownership */}
            {/* Conditionally render buttons based on ownership */}
            {isOwner ? (
              // Show Edit and Delete buttons for the owner
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ) : (
              // Show Bid and Add to Watchlist buttons for non-owners
              <div className="flex space-x-4 mt-4">
                <Link to={`/listing/${listingId}/place-bid`}>
                  <button
                    // onClick={handleBid}
                    className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700"
                  >
                    Bid
                  </button>
                </Link>
                <button
                  // onClick={handleAddToWatchlist}
                  className="px-4 py-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700"
                >
                  Add to Watchlist
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md divide-gray-300 bg-gray-50 text-gray-800">
          <div className="flex justify-between p-4">
            <div className="flex space-x-4">
              <div>
                <img
                  src="https://source.unsplash.com/100x100/?portrait"
                  alt=""
                  className="object-cover w-12 h-12 rounded-full bg-gray-500"
                />
              </div>
              <div>
                <h4 className="font-bold">Leroy Jenkins</h4>
                <span className="text-xs text-gray-600">2 days ago</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 dark:text-yellow-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5 fill-current"
              >
                <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
              </svg>
              <span className="text-xl font-bold">4.5</span>
            </div>
          </div>
          <div className="p-4 space-y-2 text-sm text-gray-600">
            <p>
              Vivamus sit amet turpis leo. Praesent varius eleifend elit, eu
              dictum lectus consequat vitae. Etiam ut dolor id justo fringilla
              finibus.
            </p>
            <p>
              Donec eget ultricies diam, eu molestie arcu. Etiam nec lacus eu
              mauris cursus venenatis. Maecenas gravida urna vitae accumsan
              feugiat. Vestibulum commodo, ante sit urna purus rutrum sem.
            </p>
          </div>
          <div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12 bg-gray-50 text-gray-800">
            <div className="flex flex-col items-center ">
              <h2 className="text-3xl font-semibold text-center">
                Leave Your Comments!
              </h2>
              <div className="flex flex-col w-full">
                <textarea
                  rows="3"
                  placeholder="Message..."
                  className="p-4 rounded-md resize-none text-gray-800 bg-gray-50"
                ></textarea>
                <button
                  type="button"
                  className="py-4 my-8 font-semibold rounded-md text-gray-50 bg-violet-600"
                >
                  Leave feedback
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <a
                rel="noopener noreferrer"
                href="#1"
                className="text-sm text-gray-600"
              >
                Maybe later
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
