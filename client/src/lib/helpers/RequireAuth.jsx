import { Spinner } from "@chakra-ui/react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function RequireAuth({ children }) {
  let { user, isLoading } = useAuth()
  let location = useLocation()
if(isLoading) return <Spinner />;
return (!user) ? <Navigate to="/login" state={{ from: location }} replace /> : children
}