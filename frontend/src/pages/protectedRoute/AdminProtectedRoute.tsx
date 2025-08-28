import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }: any) {
  const [isLoading, setLoading] = useState(false);
  const data = localStorage.getItem("admin") || "";
  useEffect(() => {
    setLoading(true);
  }, []);

  if (!isLoading) {
    return <div>Loading...</div>;
  }

  return data ? children : <Navigate to="/admin/login" />;
}
