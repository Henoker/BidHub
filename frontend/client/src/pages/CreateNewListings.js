import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { createListing } from "../features/auction/auctionSlice";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    name_of_item: "",
    category: "",
    bid: "",
    image_url: "",
    description: "",
  });

  const { name_of_item, category, bid, image_url, description } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.listing);

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
      image_url,
    };

    // Dispatch the createListing action
    dispatch(createListing(listingData))
      .unwrap()
      .then(() => {
        toast.success("Listing created successfully!");
        navigate("/active-listings"); // Redirect to the listings page
      })
      .catch((error) => {
        toast.error(error || "Failed to create listing");
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
          Create New Listing
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
          <label htmlFor="bid" className="block mb-1 ml-1">
            Bid Amount
          </label>
          <input
            id="bid"
            type="number"
            name="bid"
            placeholder="Bid amount"
            value={bid}
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
            {isLoading ? "Creating..." : "Create Listing"}
          </button>
        </div>
      </form>
    </section>
  );
}
