import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "@cloudscape-design/global-styles/index.css";
import adminRoutes from "./routes/admin.jsx";
import investigadorRoutes from "./routes/investigador.jsx";
import { store } from "./app/store";

//  Login page
const Login = lazy(() => import("./pages/login/index.jsx"));

const router = createBrowserRouter([
  {
    path: "",
    element: <Login />,
  },
  {
    path: "admin",
    children: adminRoutes,
  },
  {
    path: "investigador",
    children: investigadorRoutes,
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />;
    </Provider>
  );
}
