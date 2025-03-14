import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NotificationProvider } from "../providers/notificationProvider";

const Constancias = lazy(() => import("../pages/secretaria/constancias"));

const routes = createBrowserRouter(
  [
    {
      path: "",
      element: <Constancias />,
    },
  ],
  {
    basename: "/secretaria",
  }
);

export default function SecretariaRoutes() {
  return (
    <NotificationProvider>
      <Suspense fallback>
        <RouterProvider router={routes} />
      </Suspense>
    </NotificationProvider>
  );
}
