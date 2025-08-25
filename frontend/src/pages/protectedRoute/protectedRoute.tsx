import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
  const [isLoading, setLoading] = useState();
  const data = JSON.parse(localStorage.getItem("data") || "{}");
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data.user);
  return data?.email ? children : <Navigate to="/login" />;
}
