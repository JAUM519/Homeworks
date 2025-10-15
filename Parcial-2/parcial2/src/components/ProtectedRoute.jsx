import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { status } = useSelector(s => s.auth);
  if (status === "checking") return null;
  if (status !== "authenticated") return <Navigate to="/login" replace />;
  return children;
}
