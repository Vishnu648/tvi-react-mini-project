import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminRegister from "../pages/AdminRegister";
import PasswordRecovery from "../pages/PasswordRecovery";
import Otp from "../pages/Otp";
import NewPassword from "../pages/NewPassword";
import Home from "../pages/Home";
import UserProfile from "../pages/UserProfile";
import SupervisorDashboard from "../pages/SupervisorDashboard";
import { ProtectedRoute } from "../utils/ProtectedRoute";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route
          path="/register"
          element={<ProtectedRoute element={AdminRegister} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/recover-password" element={<PasswordRecovery />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/create-password" element={<NewPassword />} />
        <Route
          path="/home"
          element={<ProtectedRoute element={Home} />}
          // element={<Home />}
        />
        <Route
          path="/user"
          element={<ProtectedRoute element={UserProfile} />}
        />
        <Route
          path="/supervisor"
          element={<ProtectedRoute element={SupervisorDashboard} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
