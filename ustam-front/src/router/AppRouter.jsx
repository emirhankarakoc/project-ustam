import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Notfound from "../pages/Notfound";
import Profile from "../pages/Profile";
import DashboardRouter from "../pages/DashboardRouter";
import InspectMenu from "../pages/InspectMenu";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/:id" element={<Profile />} />

      <Route path="/dashboard" element={<DashboardRouter />} />
      <Route path="/inspect/:id" element={<InspectMenu />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}
