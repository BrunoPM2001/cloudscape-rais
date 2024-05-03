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
    text: "Concurso para la publicación de libros universitarios",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Proyectos_pubLibro() {
  return (
    <ProtectedRoute>
      <Navbar />
      <AppLayout
        breadcrumbs={<BreadcrumbGroup items={breadcrumbs} />}
        navigation={<Sidebar />}
        tools={
          <Helpbar>
            Listado de los concursos para publicación de libros universitarios
            en los que ha participado usted.
          </Helpbar>
        }
        content={
          <ContentLayout
            disableOverlap
            header={
              <Header variant="h1">
                Concursos para la publicación de libros universitarios:
              </Header>
            }
          >
            <SpaceBetween size="l">
              <Tabs
                tabs={tabs}
                ariaLabel="Ventanas de concurso para publicación de libros"
              />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </ProtectedRoute>
  );
}
