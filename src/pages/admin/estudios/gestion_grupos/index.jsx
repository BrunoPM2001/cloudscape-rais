import {
  AppLayout,
  Box,
  BreadcrumbGroup,
  ColumnLayout,
  Container,
  ContentLayout,
  Flashbar,
  Header,
  HelpPanel,
  SpaceBetween,
  StatusIndicator,
  Tabs,
} from "@cloudscape-design/components";
import Sidebar from "../../components/sidebar.jsx";
import Navbar from "../../components/navbar.jsx";
import Miembros from "./tabs/miembros.jsx";
import Documentos from "./tabs/documentos.jsx";
import Lineas from "./tabs/lineas.jsx";
import Proyectos from "./tabs/proyectos.jsx";
import Publicaciones from "./tabs/publicaciones.jsx";
import Laboratorios from "./tabs/laboratorios.jsx";
import Extras from "./tabs/extras.jsx";
import Detalles from "./detalles.jsx";

const breadcrumbs = [
  {
    text: "Grupos",
    href: "#",
  },
  {
    text: "Detalle",
    href: "#",
  },
];

const tabs = [
  {
    id: "miembros",
    label: "Miembros",
    content: <Miembros />,
  },
  {
    id: "documentos",
    label: "Documentos",
    content: <Documentos />,
  },
  {
    id: "lineas",
    label: "Lineas",
    content: <Lineas />,
  },
  {
    id: "proyectos",
    label: "Proyectos",
    content: <Proyectos />,
  },
  {
    id: "publicaciones",
    label: "Publicaciones",
    content: <Publicaciones />,
  },
  {
    id: "laboratorios",
    label: "Laboratorios",
    content: <Laboratorios />,
  },
  {
    id: "extras",
    label: "Extras",
    content: <Extras />,
  },
];

export default function Gestion_grupos() {
  return (
    <>
      <Navbar />
      <AppLayout
        breadcrumbs={<BreadcrumbGroup items={breadcrumbs} />}
        navigation={<Sidebar />}
        notifications={
          <Flashbar
            items={
              [
                // {
                //   type: "info",
                //   dismissible: true,
                //   content: "This is an info flash message.",
                //   id: "message_1",
                // },
              ]
            }
          />
        }
        tools={
          <HelpPanel header={<h2>Panel de ayuda</h2>}>
            Información sobre la páginal actual para poder mostrarla al público
            en general.
          </HelpPanel>
        }
        content={
          <ContentLayout
            header={
              <Header variant="h1">Detalle del grupo de investigación:</Header>
            }
          >
            <SpaceBetween size="l">
              <Detalles />
              <Tabs tabs={tabs} ariaLabel="Opciones de grupo" />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </>
  );
}
