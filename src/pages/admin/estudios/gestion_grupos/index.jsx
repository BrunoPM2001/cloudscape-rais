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
import Grupos from "./tabs/grupos.jsx";
import Solicitudes from "./tabs/solicitudes.jsx";

const breadcrumbs = [
  {
    text: "Admin",
    href: "#",
  },
  {
    text: "Estudios",
  },
  {
    text: "Gestión de grupos",
  },
];

const tabs = [
  {
    id: "grupos",
    label: "Grupos",
    content: <Grupos />,
  },
  {
    id: "solicitudes",
    label: "Solicitudes",
    content: <Solicitudes />,
  },
];

export default function Gestion_grupos() {
  return (
    <>
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
            header={<Header variant="h1">Grupos de investigación:</Header>}
          >
            <SpaceBetween size="l">
              <Tabs
                tabs={tabs}
                ariaLabel="Opciones de usuarios investigadores"
              />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </>
  );
}
