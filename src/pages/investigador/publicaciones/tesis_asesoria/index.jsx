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
    text: "Publicaciones",
  },
  {
    text: "Tesis asesoría",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Tesis_asesorias() {
  return (
    <ProtectedRoute>
      <Navbar />
      <AppLayout
        breadcrumbs={<BreadcrumbGroup items={breadcrumbs} />}
        navigation={<Sidebar />}
        tools={
          <Helpbar>
            Listado de las publicaciones de tipo Tesis asesorías realizadas por
            usted.
          </Helpbar>
        }
        content={
          <ContentLayout
            disableOverlap
            header={<Header variant="h1">Tesis asesorías:</Header>}
          >
            <SpaceBetween size="l">
              <Tabs tabs={tabs} />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </ProtectedRoute>
  );
}
