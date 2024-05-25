import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@cloudscape-design/global-styles/index.css";
import investigadorRoutes from "./routes/investigador.jsx";
import AdminRoutes from "./routes/admin.jsx";

//  Login page
const Login = lazy(() => import("./pages/login/index.jsx"));

const router1 = createBrowserRouter(
  [
    {
      path: "",
      element: <Login />,
    },
    {
      path: "*",
      element: <div></div>,
    },
  ],
  {
    basename: "/",
  }
);

// const router2 = createBrowserRouter(
//   [
//     {
//       children: adminRoutes,
//     },
//   ],
//   {
//     basename: "/admin",
//   }
// );

const router3 = createBrowserRouter(
  [
    {
      children: investigadorRoutes,
    },
  ],
  {
    basename: "/investigador",
  }
);

export default function App() {
  return (
    <>
      <RouterProvider router={router1} />
      <AdminRoutes />
      <RouterProvider router={router3} />
    </>
  );
}
