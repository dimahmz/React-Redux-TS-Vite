import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "@/Dashboard";
import SignIn from "@/pages/SignIn"

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: Dashboard,
  },
  {
    id:"login",
    path:"/login",
    Component: SignIn,
  }
]);

export default function AppRouterProvider() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}
