import {
  AppLayout,
  BreadcrumbGroup,
  ContentLayout,
  Header,
  SpaceBetween,
  Tabs,
} from "@cloudscape-design/components";
import Sidebar from "../../components/sidebar.jsx";
import Navbar from "../../components/navbar.jsx";
import Helpbar from "../../components/helpbar.jsx";
import Listado from "./tabs/listado.jsx";
import ProtectedRoute from "../../components/protectedRoute.jsx";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Actividades",
  },
  {
    text: "Proyectos multidisciplinarios",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Proyectos_multi() {
  return (
    <ProtectedRoute>
      <Navbar />
      <AppLayout
        breadcrumbs={<BreadcrumbGroup items={breadcrumbs} />}
        navigation={<Sidebar />}
        tools={
          <Helpbar>
            Listado de los proyectos multidisciplinarios en los que ha
            participado usted.
          </Helpbar>
        }
        content={
          <ContentLayout
            disableOverlap
            header={
              <Header variant="h1">Proyectos multidisciplinarios:</Header>
            }
          >
            <SpaceBetween size="l">
              <Tabs
                tabs={tabs}
                ariaLabel="Ventanas de proyectos multidisciplinarios"
              />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </ProtectedRoute>
  );
}
