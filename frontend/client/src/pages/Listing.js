import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  fetchListingById,
  reset,
  resetCommentStatus,
  selectCommentError,
  selectCommentStatus,
  selectCommentsByListingId,
} from "../features/auction/auctionSlice";
import Spinner from "../components/Spinner";
import {
  addToWatchlist,
  closeAuctionThunk,
  fetchCommentsThunk,
  addCommentThunk,
} from "../features/auction/auctionAPIService";

export default function Listing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: listingId } = useParams();
  const { listing, isLoading, isError, message, closeAuctionStatus } =
    useSelector((state) => state.listing);
  const { user } = useSelector((state) => state.auth);
  const [commentText, setCommentText] = useState("");

  const comments =
    useSelector((state) => selectCommentsByListingId(state, listingId)) || [];
  const commentStatus = useSelector(selectCommentStatus);
  const commentError = useSelector(selectCommentError);

  // Fetch listing and comments on mount
  useEffect(() => {
    dispatch(fetchListingById(listingId));
    dispatch(fetchCommentsThunk(listingId));

    return () => {
      dispatch(reset());
      dispatch(resetCommentStatus());
    };
  }, [dispatch, listingId]);

  // Reset the comment status when a new comment is submitted
  useEffect(() => {
    if (commentStatus === "succeeded") {
      dispatch(fetchCommentsThunk(listingId));
      dispatch(resetCommentStatus()); // Reset status after fetching new comments
    }
  }, [dispatch, listingId, commentStatus]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || commentStatus === "loading") return;

    try {
      await dispatch(addCommentThunk({ listingId, commentText })).unwrap();
      setCommentText(""); // Clear input field
      dispatch(fetchCommentsThunk(listingId)); // Fetch updated comments
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error: {message || "Failed to fetch listing."}</div>;
  if (!listing || Object.keys(listing).length === 0)
    return <div>Loading...</div>;

  const isOwner = user && listing.owner && user.user.id === listing.owner.id;
  const isClosed = listing.is_closed;

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
            <h3 className="text-2xl font-semibold sm:text-4xl">
              {listing.name_of_item}
            </h3>
            <span className="text-xs text-gray-600">
              Listed by: {listing.owner.username || "Unknown"}
            </span>
            <p>{listing.description}</p>
            <p className="font-semibold">
              Current Bid: ${listing.bid?.bid || "N/A"}
            </p>
            {isClosed && (
              <div className="px-4 py-2 font-semibold text-white bg-gray-600 rounded-md">
                Auction Closed
              </div>
            )}
            {isOwner ? (
              <div className="flex space-x-4 mt-4">
                {!isClosed && (
                  <button
                    onClick={() =>
                      window.confirm(
                        "Are you sure you want to close this auction?"
                      ) && dispatch(closeAuctionThunk(listingId))
                    }
                    disabled={closeAuctionStatus === "loading"}
                    className={`px-4 py-2 font-semibold text-white rounded-md ${
                      closeAuctionStatus === "loading"
                        ? "bg-gray-500"
                        : "bg-yellow-600 hover:bg-yellow-700"
                    }`}
                  >
                    {closeAuctionStatus === "loading"
                      ? "Closing..."
                      : "Close Auction"}
                  </button>
                )}
                <button
                  onClick={() => navigate(`/edit-listing/${listingId}`)}
                  className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Edit
                </button>
              </div>
            ) : (
              <div className="flex space-x-4 mt-4">
                <Link to={`/listing/${listingId}/place-bid`}>
                  <button className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">
                    Bid
                  </button>
                </Link>
                <button
                  onClick={() => dispatch(addToWatchlist(listingId))}
                  className="px-4 py-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700"
                >
                  Add to Watchlist
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="container max-w-2xl p-6 mx-auto">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>

        {/* Comment Form */}
        {user && (
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <div className="flex flex-col">
              <textarea
                rows="3"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment..."
                className="p-3 border rounded-md mb-2"
                disabled={commentStatus === "loading"}
              />
              <button
                type="submit"
                disabled={commentStatus === "loading" || !commentText.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                {commentStatus === "loading" ? "Posting..." : "Post Comment"}
              </button>
            </div>
            {commentStatus === "failed" && (
              <p className="text-red-500 mt-2">{commentError}</p>
            )}
          </form>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center mb-2">
                  <img
                    src="https://via.placeholder.com/40"
                    alt={comment.writer?.username || "Anonymous"}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="font-semibold">
                    {comment.writer?.username || "Anonymous"}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    {new Date(comment.created_at).toLocaleString()}
                  </span>
                </div>
                <p>{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import {
//   fetchListingById,
//   reset,
//   resetCloseAuctionStatus,
//   resetCommentStatus,
//   selectCommentError,
//   selectCommentStatus,
//   selectCommentsByListingId,
// } from "../features/auction/auctionSlice";
// import Spinner from "../components/Spinner";
// import {
//   addToWatchlist,
//   closeAuctionThunk,
//   fetchCommentsThunk,
//   addCommentThunk,
// } from "../features/auction/auctionAPIService";

// export default function Listing() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id: listingId } = useParams(); // Extract `listingId` from the URL
//   const { listing, isLoading, isError, message, closeAuctionStatus } =
//     useSelector((state) => state.listing);
//   const { user } = useSelector((state) => state.auth); // Get the signed-in user
//   const [commentText, setCommentText] = useState("");

//   const comments =
//     useSelector((state) => selectCommentsByListingId(state, listingId)) || [];
//   const commentStatus = useSelector(selectCommentStatus);
//   const commentError = useSelector(selectCommentError);

//   useEffect(() => {
//     dispatch(fetchCommentsThunk(listingId));

//     return () => {
//       dispatch(resetCommentStatus());
//     };
//   }, [dispatch, listingId]);

//   const handleCommentSubmit = (e) => {
//     e.preventDefault();
//     if (commentText.trim()) {
//       dispatch(addCommentThunk({ listingId, commentText }));
//       setCommentText("");
//     }
//   };

//   useEffect(() => {
//     console.log("Current comments state:", comments);
//   }, [comments]);

//   // And modify your comments rendering:
//   // Debugging: Log the listing owner and signed-in user
//   useEffect(() => {
//     if (listing) {
//       console.log("Listing Owner:", listing.owner);
//     }
//     if (user) {
//       console.log("Signed-in User:", user);
//     }
//   }, [listing, user]);

//   // Fetch listing data when the component mounts
//   useEffect(() => {
//     dispatch(fetchListingById(listingId));
//     dispatch(fetchCommentsThunk(listingId));

//     return () => {
//       dispatch(reset());
//     };
//   }, [dispatch, listingId]);

//   useEffect(() => {
//     if (closeAuctionStatus === "succeeded") {
//       // Refresh the listing data to show updated closed status
//       dispatch(fetchListingById(listingId));
//     }
//   }, [closeAuctionStatus, dispatch, listingId]);

//   if (isLoading) {
//     return <Spinner />;
//   }

//   if (isError) {
//     return <div>Error: {message || "Failed to fetch listing."}</div>;
//   }

//   if (!listing || Object.keys(listing).length === 0) {
//     return <div>Loading...</div>;
//   }

//   // Check if the signed-in user is the owner of the listing
//   const isOwner = user && listing.owner && user.user.id === listing.owner.id;

//   const isClosed = listing.is_closed;

//   const handleEdit = () => {
//     navigate(`/edit-listing/${listingId}`); // Redirect to the EditListing component
//   };

//   const handleAdd = () => {
//     dispatch(addToWatchlist(listingId));
//   };

//   const handleDelete = () => {
//     // Implement delete functionality here
//     console.log("Delete listing:", listingId);
//     // You can dispatch a delete action here
//   };

//   const handleCloseAuction = () => {
//     if (
//       window.confirm(
//         "Are you sure you want to close this auction? This cannot be undone."
//       )
//     ) {
//       dispatch(closeAuctionThunk(listingId));
//     }
//   };

//   return (
//     <section className="bg-gray-100 text-gray-800">
//       <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
//         <div className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 bg-gray-50">
//           <img
//             src={listing.url || "https://source.unsplash.com/random/480x360"}
//             alt={listing.name_of_item}
//             className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 bg-gray-500"
//           />
//           <div className="p-6 space-y-2 lg:col-span-5">
//             <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
//               {listing.name_of_item}
//             </h3>
//             <span className="text-xs text-gray-600">
//               Listed by: {listing.owner.username || "Unknown"}
//             </span>
//             <p>{listing.description}</p>
//             <p className="font-semibold">
//               Current Bid: ${listing.bid?.bid || "N/A"}
//             </p>
//             {isClosed && (
//               <div className="px-4 py-2 font-semibold text-white bg-gray-600 rounded-md">
//                 Auction Closed
//               </div>
//             )}
//             {/* Conditionally render buttons based on ownership */}
//             {/* Conditionally render buttons based on ownership */}
//             {/* Conditionally render buttons based on ownership */}
//             {isOwner ? (
//               // Show Edit and Delete buttons for the owner
//               <div className="flex space-x-4 mt-4">
//                 {!isClosed && (
//                   <button
//                     onClick={handleCloseAuction}
//                     disabled={closeAuctionStatus === "loading"}
//                     className={`px-4 py-2 font-semibold text-white rounded-md ${
//                       closeAuctionStatus === "loading"
//                         ? "bg-gray-500"
//                         : "bg-yellow-600 hover:bg-yellow-700"
//                     }`}
//                   >
//                     {closeAuctionStatus === "loading"
//                       ? "Closing..."
//                       : "Close Auction"}
//                   </button>
//                 )}
//                 <button
//                   onClick={handleEdit}
//                   className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ) : (
//               // Show Bid and Add to Watchlist buttons for non-owners
//               <div className="flex space-x-4 mt-4">
//                 <Link to={`/listing/${listingId}/place-bid`}>
//                   <button
//                     // onClick={handleBid}
//                     className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700"
//                   >
//                     Bid
//                   </button>
//                 </Link>
//                 <button
//                   // onClick={handleAddToWatchlist}
//                   onClick={handleAdd}
//                   className="px-4 py-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700"
//                 >
//                   Add to Watchlist
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="container max-w-2xl p-6 mx-auto">
//         <h3 className="text-xl font-semibold mb-4">Comments</h3>

//         {/* Comment Form */}
//         {user && (
//           <form onSubmit={handleCommentSubmit} className="mb-6">
//             <div className="flex flex-col">
//               <textarea
//                 rows="3"
//                 value={commentText}
//                 onChange={(e) => setCommentText(e.target.value)}
//                 placeholder="Write your comment..."
//                 className="p-3 border rounded-md mb-2"
//                 disabled={commentStatus === "loading"}
//               />
//               <button
//                 type="submit"
//                 disabled={commentStatus === "loading" || !commentText.trim()}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
//               >
//                 {commentStatus === "loading" ? "Posting..." : "Post Comment"}
//               </button>
//             </div>
//             {commentStatus === "failed" && (
//               <p className="text-red-500 mt-2">{commentError}</p>
//             )}
//           </form>
//         )}

//         {/* Comments List */}
//         <div className="space-y-4">
//           {comments && comments.length > 0 ? (
//             comments.map((comment) => (
//               <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
//                 <div className="flex items-center mb-2">
//                   <img
//                     src="https://via.placeholder.com/40"
//                     alt={comment.writer?.username || "Anonymous"}
//                     className="w-8 h-8 rounded-full mr-2"
//                   />
//                   <span className="font-semibold">
//                     {comment.writer?.username || "Anonymous"}
//                   </span>
//                   <span className="text-gray-500 text-sm ml-2">
//                     {new Date(comment.created_at).toLocaleString()}
//                   </span>
//                 </div>
//                 <p>{comment.text}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">
//               No comments yet. Be the first to comment!
//             </p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
