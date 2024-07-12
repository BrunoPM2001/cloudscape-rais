import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NotificationProvider } from "../providers/notificationProvider";

const Evaluador_proyecto = lazy(() =>
  import("../pages/evaluador/evaluaciones/detalles")
);
const Evaluaciones = lazy(() => import("../pages/evaluador/evaluaciones"));

const routes = createBrowserRouter(
  [
    {
      path: "",
      element: <Evaluaciones />,
    },
    {
      path: "detalle",
      element: <Evaluador_proyecto />,
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
