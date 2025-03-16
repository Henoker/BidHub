import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ResetPasswordPageConfirm from "./pages/ResetPasswordPageConfirm";
import Dashboard from "./pages/Dashboard";
import ActiveListings from "./pages/ActiveListings";
import CreateNewListings from "./pages/CreateNewListings";
import Watchlists from "./pages/Watchlists";
import Listing from "./pages/Listing";
import ProtectedRoute from "./components/ProtectedRoute";
import EditListing from "./pages/EditListing";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password-reset" element={<ResetPasswordPage />} />
          <Route
            path="/password-reset/:token"
            element={<ResetPasswordPageConfirm />}
          />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/active-listings" element={<ActiveListings />} />
            <Route path="/listing/:id" element={<Listing />} />
            <Route
              path="/create-new-listings"
              element={<CreateNewListings />}
            />
            <Route path="/edit-listing/:id" element={<EditListing />} />
            <Route path="/watchlists" element={<Watchlists />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
