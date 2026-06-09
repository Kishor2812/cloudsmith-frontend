import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Services from "../pages/Services";
import Industries from "../pages/Industries";
import Materials from "../pages/Materials";
import Quote from "../pages/Quote";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import Profile from "../pages/Profile";
import FileManager from "../pages/FileManager";
import MyQuotes from "../pages/MyQuotes";
import AdminQuotes from "../pages/AdminQuotes";
import Orders from "../pages/Orders";
import Notifications from "../pages/Notifications";
import AdminOrders from "../pages/AdminOrders";
import AdminUsers from "../pages/AdminUsers";
import AdminAnalytics from "../pages/AdminAnalytics";
import ManufacturerDashboard from "../pages/ManufacturerDashboard";
import TrackOrder from "../pages/TrackOrder";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/files" element={<FileManager />} />
        
        <Route path="/quotes" element={<MyQuotes />} />
        <Route path="/admin-quotes" element={<AdminQuotes />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/admin-orders" element={<AdminOrders />} />
        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="/admin-analytics" element={<AdminAnalytics />}/>
        <Route path="/manufacturer" element={<ManufacturerDashboard />}/>
        <Route path="/track-order" element={<TrackOrder />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;