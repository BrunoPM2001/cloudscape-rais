import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NotificationProvider } from "../providers/notificationProvider";

const Evaluaciones = lazy(() => import("../pages/evaluador/evaluaciones"));

const routes = createBrowserRouter(
  [
    {
      path: "",
      element: <Evaluaciones />,
    },
  ],
  {
    basename: "/evaluador",
  }
);

export default function EvaluadorRoutes() {
  return (
    <NotificationProvider>
      <Suspense fallback>
        <RouterProvider router={routes} />
      </Suspense>
    </NotificationProvider>
  );
}
