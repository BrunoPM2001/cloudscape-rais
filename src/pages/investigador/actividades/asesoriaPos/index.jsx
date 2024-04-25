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

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Actividades",
  },
  {
    text: "Asesoría de tesis de posgrado",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Asesoria_posgrado() {
  return (
    <>
      <Navbar />
      <AppLayout
        breadcrumbs={<BreadcrumbGroup items={breadcrumbs} />}
        navigation={<Sidebar />}
        tools={
          <Helpbar>
            Listado de las asesorías de tesis de posgrado en los que ha
            participado usted.
          </Helpbar>
        }
        content={
          <ContentLayout
            disableOverlap
            header={
              <Header variant="h1">Asesoría de tesis de posgrado:</Header>
            }
          >
            <SpaceBetween size="l">
              <Tabs tabs={tabs} ariaLabel="Ventanas de asesoría de posgrado" />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </>
  );
}
