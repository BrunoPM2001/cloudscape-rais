import {
  AppLayout,
  BreadcrumbGroup,
  ContentLayout,
  Header,
  HelpPanel,
  SpaceBetween,
  Tabs,
} from "@cloudscape-design/components";
import Sidebar from "../../components/sidebar.jsx";
import Navbar from "../../components/navbar.jsx";
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
    text: "Proyectos sin financiamiento",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Proyectos_sin_financiamiento() {
  return (
    <>
      <Navbar />
      <AppLayout
        breadcrumbs={<BreadcrumbGroup items={breadcrumbs} />}
        navigation={<Sidebar />}
        tools={
          <HelpPanel header={<h2>Panel de ayuda</h2>}>
            Listado de los proyectos sin fondos monetarios en los que ha
            participado usted.
          </HelpPanel>
        }
        content={
          <ContentLayout
            disableOverlap
            header={
              <Header variant="h1">Proyectos sin fondos monetarios:</Header>
            }
          >
            <SpaceBetween size="l">
              <Tabs
                tabs={tabs}
                ariaLabel="Ventanas de proyectos sin fondos monetarios"
              />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </>
  );
}
