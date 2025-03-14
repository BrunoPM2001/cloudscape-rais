import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@cloudscape-design/global-styles/index.css";
import AdminRoutes from "./routes/admin";
import InvestigadorRoutes from "./routes/investigador";
import EvaluadorRoutes from "./routes/evaluador";
import FacultadRoutes from "./routes/facultad";
import SecretariaRoutes from "./routes/secretaria";

//  Login page
const Login = lazy(() => import("./pages/login/index"));

const router1 = createBrowserRouter(
  [
    {
      path: "/",
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

export default function App() {
  return (
    <>
      <RouterProvider router={router1} />
      <AdminRoutes />
      <InvestigadorRoutes />
      <EvaluadorRoutes />
      <FacultadRoutes />
      <SecretariaRoutes />
    </>
  );
}
