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
import Grupos from "./tabs/grupos.jsx";
import Solicitudes from "./tabs/solicitudes.jsx";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Grupo",
  },
  {
    text: "Grupo",
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

export default function Grupo() {
  return (
    <>
      <Navbar />
      <AppLayout
        breadcrumbs={<BreadcrumbGroup items={breadcrumbs} />}
        navigation={<Sidebar />}
        tools={
          <Helpbar>
            Listado de los grupos de investigación a los que pertenece así como
            las solicitudes de creación.
          </Helpbar>
        }
        content={
          <ContentLayout
            disableOverlap
            header={<Header variant="h1">Grupos de investigación:</Header>}
          >
            <SpaceBetween size="l">
              <Tabs tabs={tabs} />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </>
  );
}
