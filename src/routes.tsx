import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "@/Dashboard";
import SignIn from "@/pages/signIn";
import Counter from "@/pages/counter";
import Requests from "@/pages/counter";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { fetchCurrentUser } from "@/store/userSlice";
import { useAppDispatch } from "./hooks";
import NonAuthenticatedRoute from "./components/auth/NonAuthRoute";
import NavigationLoader from "@/components/global/NavigationLoader";

const router = createBrowserRouter([
  {
    Component: NavigationLoader,
    children: [
      {
        Component: ProtectedRoute,
        children: [
          {
            id: "root",
            path: "/",
            Component: Dashboard,
          },
          {
            id: "dashboard",
            path: "/dashboard",
            Component: Dashboard,
          },
          {
            id: "requests",
            path: "/requests",
            Component: Requests,
          },
          {
            id: "counter",
            path: "/counter",
            Component: Counter,
          },
        ],
      },
      {
        Component: NonAuthenticatedRoute,
        children: [
          {
            id: "signin",
            path: "/signin",
            Component: SignIn,
          },
        ],
      },
    ],
  },
]);

export default function AppRouterProvider() {
  const dispatch = useAppDispatch();
  dispatch(fetchCurrentUser());
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}
