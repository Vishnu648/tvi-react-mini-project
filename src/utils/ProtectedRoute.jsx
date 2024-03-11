import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ element: Component }) => {
  const token = localStorage?.getItem("accessToken");

  if (token != null) {
    return <Component />;
  } else {
    return <Navigate to="/login" replace />;
  }
};
