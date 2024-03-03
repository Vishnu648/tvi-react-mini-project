import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PasswordRecovery from "./pages/PasswordRecovery";
import Otp from "./pages/Otp";
import NewPassword from "./pages/NewPassword";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover-password" element={<PasswordRecovery />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/create-password" element={<NewPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
