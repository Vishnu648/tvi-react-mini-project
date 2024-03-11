import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ element: Component }) => {
  const token = localStorage?.getItem("accessToken");
  const role = localStorage?.getItem("role");
  console.log(Component.name);
  if (token != null) {
    return <Component />;
  } else {
    return <Navigate to="/login" replace />;
  }
};
