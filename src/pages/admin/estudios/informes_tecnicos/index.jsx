import {
  AppLayout,
  BreadcrumbGroup,
  ContentLayout,
  Flashbar,
  Header,
  HelpPanel,
  SpaceBetween,
  Tabs,
} from "@cloudscape-design/components";
import Sidebar from "../../components/sidebar.jsx";
import Navbar from "../../components/navbar.jsx";
import Listado from "./tabs/listado.jsx";
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
    text: "Informes técnicos",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Informes_tecnicos() {
  return (
    <ProtectedRoute>
      <Navbar />
      <AppLayout
        breadcrumbs={<BreadcrumbGroup items={breadcrumbs} />}
        navigation={<Sidebar />}
        tools={
          <HelpPanel header={<h2>Panel de ayuda</h2>}>
            Información sobre la páginal actual para poder mostrarla al público
            en general.
          </HelpPanel>
        }
        content={
          <ContentLayout
            disableOverlap
            header={<Header variant="h1">Informes técnicos:</Header>}
          >
            <SpaceBetween size="l">
              <Tabs tabs={tabs} ariaLabel="Opciones de informes técnicos" />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </ProtectedRoute>
  );
}
