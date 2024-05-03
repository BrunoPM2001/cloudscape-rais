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
    text: "Comité editorial",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Comite_editorial() {
  return (
    <ProtectedRoute>
      <Navbar />
      <AppLayout
        breadcrumbs={<BreadcrumbGroup items={breadcrumbs} />}
        navigation={<Sidebar />}
        tools={
          <Helpbar>
            Listado de los comités editoriales en los que ha participado usted.
          </Helpbar>
        }
        content={
          <ContentLayout
            disableOverlap
            header={<Header variant="h1">Comité editorial:</Header>}
          >
            <SpaceBetween size="l">
              <Tabs tabs={tabs} ariaLabel="Ventanas de comité editorial" />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </ProtectedRoute>
  );
}
