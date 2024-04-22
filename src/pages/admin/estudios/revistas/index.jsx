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
import Listado from "./tabs/listado.jsx";
import Bd_indizacion from "./tabs/bd_indizacion.jsx";
import Bd_wos from "./tabs/bd_wos.jsx";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
  },
  {
    text: "Revistas",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
  {
    id: "bd_indizacion",
    label: "Base de datos de indización",
    content: <Bd_indizacion />,
  },
  {
    id: "bd_wos",
    label: "Base de datos WOS",
    content: <Bd_wos />,
  },
];

export default function Revistas() {
  return (
    <>
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
            header={<Header variant="h1">Revistas:</Header>}
          >
            <SpaceBetween size="l">
              <Tabs tabs={tabs} ariaLabel="Opciones de revistas" />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </>
  );
}
