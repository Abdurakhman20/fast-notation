import About from "../pages/About/About";
import Home from "../pages/Home/Home";
import { ABOUT_ROUTE, HOME_ROUTE } from "../utils/consts";

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Component: Home,
  },
  {
    path: ABOUT_ROUTE,
    Component: About
  }
];