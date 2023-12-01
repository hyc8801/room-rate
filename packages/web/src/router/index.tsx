import { createBrowserRouter } from "react-router-dom";
import CommunityPage from "../pages/community";
import HomePage from "../pages/home";
import NewHousePage from "../pages/newHouse";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/community",
    element: <CommunityPage />,
  },
  {
    path: "/newHouse",
    element: <NewHousePage />,
  },
]);

export default router