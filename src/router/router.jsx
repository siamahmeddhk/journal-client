import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import Home from "../home/Home";


import Dash from "../deshborad/Dash";
import Journals from "../components/Journals";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // Root includes Nav, Footer
    children: [
      {
        index: true, // path = '/'
        element: <Home />,
      },
      // Other pages that show Nav/Footer from Root
    ],
  },
  {
    path: "/dashboard",
    element: <Dash />, // Standalone Dashboard without Root wrapper (no Nav/Footer)
  },
  {
    path: "/dashboard/journals",
    element: <Journals />, // You can also make Journals standalone or put inside Dash manually
  }
]);
