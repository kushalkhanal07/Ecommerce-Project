import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
  const [isLoading, setLoading] = useState(false);
  console.log(isLoading);
  const data = JSON.parse(localStorage.getItem("data") || "{}");

  useEffect(() => {
    console.log("hello");
    setLoading(true);
  }, []);

  if (!isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data.user);

  return data?.email ? children : <Navigate to="/login" />;
}
