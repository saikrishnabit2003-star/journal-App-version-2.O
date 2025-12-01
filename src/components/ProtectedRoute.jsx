import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const auth = localStorage.getItem("auth");
  return auth === "true" ? children : <Navigate to="/" replace />;
}
