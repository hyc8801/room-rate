import { createBrowserRouter } from "react-router-dom";
import CommunityPage from "../pages/community";
import HomePage from "../pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/community",
    element: <CommunityPage />,
  },
]);

export default router