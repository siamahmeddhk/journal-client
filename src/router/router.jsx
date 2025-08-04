import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import Home from "../home/Home";

import Dash from "../deshborad/Dash";
import Journals from "../components/Journals";
import Reg from "../components/Reg";
import PrivateRoute from "./PrivateRoute";
import Login from "../components/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // Root includes Nav, Footer
    children: [
      {
        index: true, // path = '/'
        element: <Home />,
      },
      {
        path: "/registration",
        Component: Reg,
      },
      {
        path: "/login",
        Component: Login
      }
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
 <Dash />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/journals",
    element: <Journals />, // You can also make Journals standalone or put inside Dash manually
  },
]);
