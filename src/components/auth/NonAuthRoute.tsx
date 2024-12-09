import { Navigate, Outlet } from "react-router-dom";
import { selectIsAuthenticated } from "@/store/userSlice";
import { useSelector } from "react-redux";

const NonAuthenticatedRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // the user is successfully logged in
  if (isAuthenticated) return <Navigate to="/" replace />;

  // auauthenticated
  return <Outlet />;
};

export default NonAuthenticatedRoute;
