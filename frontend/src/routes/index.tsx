import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Product from "../components/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product",
    element: <Product />,
  },
]);

export default router;
