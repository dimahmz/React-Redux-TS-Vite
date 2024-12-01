import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "@/Dashboard";
import SignIn from "@/pages/SignIn"
import Quotes from "@/pages/quotes"
import Counter from "@/pages/counter"

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
  },
  {
    id:"quotes",
    path:"/quotes",
    Component: Quotes,
  },
  {
    id:"counter",
    path:"/counter",
    Component: Counter,
  }
]);

export default function AppRouterProvider() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}
