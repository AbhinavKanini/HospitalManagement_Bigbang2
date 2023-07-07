import { Navigate } from "react-router-dom";
import React from "react";

function LandingPageProtectedRoute({ token, children }) {
  token = localStorage.getItem("token");
  if (token != null) return children;
  return <Navigate to="/" />;
}

export default LandingPageProtectedRoute;