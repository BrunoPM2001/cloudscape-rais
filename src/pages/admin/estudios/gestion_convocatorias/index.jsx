import {
  AppLayout,
  BreadcrumbGroup,
  ContentLayout,
  Flashbar,
  Header,
  SpaceBetween,
  Tabs,
} from "@cloudscape-design/components";
import Sidebar from "../../components/sidebar.jsx";
import Navbar from "../../components/navbar.jsx";
import Helpbar from "../../components/helpbar.jsx";
import Listado_convocatorias from "./tabs/listado_convocatorias.jsx";
import Listado_evaluaciones from "./tabs/listado_evaluaciones.jsx";
import ProtectedRoute from "../../components/protectedRoute.jsx";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
  },
  {
    text: "Gestión de convocatorias",
  },
];

const tabs = [
  {
    id: "listado_convocatorias",
    label: "Listado de convocatorias",
    content: <Listado_convocatorias />,
  },
  {
    id: "listado_evaluaciones",
    label: "Lista de evaluaciones",
    content: <Listado_evaluaciones />,
  },
];

export default function Gestion_convocatorias() {
  return (
    <ProtectedRoute>
      <Navbar />
      <AppLayout
        breadcrumbs={<BreadcrumbGroup items={breadcrumbs} />}
        navigation={<Sidebar />}
        tools={
          <Helpbar>
            Información sobre la páginal actual para poder mostrarla al público
            en general.
          </Helpbar>
        }
        content={
          <ContentLayout
            disableOverlap
            header={<Header variant="h1">Gestión de convocatorias:</Header>}
          >
            <SpaceBetween size="l">
              <Tabs
                tabs={tabs}
                ariaLabel="Opciones de gestión de convocatorias"
              />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </ProtectedRoute>
  );
}
