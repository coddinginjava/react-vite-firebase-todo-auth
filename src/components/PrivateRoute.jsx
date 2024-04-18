import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function PrivateRoute() {
  const { currentUser } = useAuth()

  if (!currentUser)
    return <Navigate to="/login" />;

  return <Outlet />;
}
