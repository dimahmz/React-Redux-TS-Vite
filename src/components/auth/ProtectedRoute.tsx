import { Navigate, Outlet } from "react-router-dom";
import {
  selectIsAuthenticated,
  selectStatus,
  Status,
} from "@/store/userSlice";
import { useSelector } from "react-redux";
import LoadingPage from "@/components/global/LoadingPage";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const status: Status = useSelector(selectStatus);

  // the user is successfully logged in
  if (isAuthenticated) return <Outlet />;
  
  // trying to fetch the user
  if (status == "loading") return <LoadingPage />;

  // auauthenticated
  return <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
