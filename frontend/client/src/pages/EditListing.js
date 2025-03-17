import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import {
  updateListing,
  fetchListingById,
} from "../features/auction/auctionSlice";
import { useParams, useNavigate } from "react-router-dom";

export default function EditListing() {
  const [formData, setFormData] = useState({
    name_of_item: "",
    category: "",
    bid: "",
    image_url: "",
    description: "",
  });

  const { name_of_item, category, bid, image_url, description } = formData;

  const dispatch = useDispatch();
  const { id: listingId } = useParams(); // Get the listing ID from the URL
  const navigate = useNavigate();
  const { isLoading, listing } = useSelector((state) => state.listing);

  // Fetch listing data when the component mounts
  useEffect(() => {
    dispatch(fetchListingById(listingId))
      .unwrap()
      .catch((error) => {
        toast.error("Failed to fetch listing data");
      });
  }, [listingId, dispatch]);

  // Populate form data when listing is fetched
  useEffect(() => {
    if (listing) {
      setFormData({
        name_of_item: listing.name_of_item || "",
        category: listing.category || "",
        bid: listing.bid || "",
        image_url: listing.url || "",
        description: listing.description || "",
      });
    }
  }, [listing]);

  // Handle input change
  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!name_of_item || !category || !bid || !image_url || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    // Prepare the data to be sent to the backend
    const listingData = {
      name_of_item,
      category,
      bid,
      description,
      url: image_url,
    };

    // Dispatch the updateListing action
    dispatch(updateListing({ listingId, listingData }))
      .unwrap()
      .then(() => {
        toast.success("Listing updated successfully!");
        navigate("/active-listings"); // Redirect to the listings page
      })
      .catch((error) => {
        toast.error(error || "Failed to update listing");
      });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="p-6 text-gray-800">
      <form
        onSubmit={handleSubmit}
        noValidate=""
        className="container w-full max-w-xl p-8 mx-auto space-y-6 rounded-md shadow bg-gray-50"
      >
        <h2 className="w-full text-3xl font-bold leading-tight">
          Edit Listing
        </h2>
        <div>
          <label htmlFor="name_of_item" className="block mb-1 ml-1">
            Name of Item
          </label>
          <input
            id="name_of_item"
            type="text"
            name="name_of_item"
            placeholder="Name of item"
            value={name_of_item}
            onChange={handleInputChange}
            required=""
            className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-gray-100"
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-1 ml-1">
            Category
          </label>
          <input
            id="category"
            type="text"
            name="category"
            placeholder="Category"
            value={category}
            onChange={handleInputChange}
            required=""
            className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-gray-100"
          />
        </div>
        <div>
          <label htmlFor="image_url" className="block mb-1 ml-1">
            Image URL
          </label>
          <input
            id="image_url"
            type="url"
            name="image_url"
            placeholder="Image URL"
            value={image_url}
            onChange={handleInputChange}
            required=""
            className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-gray-100"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1 ml-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Description..."
            value={description}
            onChange={handleInputChange}
            required=""
            className="block w-full p-2 rounded autoexpand focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-gray-100"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring focus:ring-opacity-50 bg-violet-600 focus:ring-violet-600 hover:ring-violet-600 text-gray-50"
          >
            {isLoading ? "Updating..." : "Update Listing"}
          </button>
        </div>
      </form>
    </section>
  );
}
