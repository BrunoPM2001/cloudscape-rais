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
    text: "Proyectos con financiamiento",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Proyectos_con_financiamiento() {
  return (
    <>
      <Navbar />
      <AppLayout
        breadcrumbs={<BreadcrumbGroup items={breadcrumbs} />}
        navigation={<Sidebar />}
        tools={
          <HelpPanel header={<h2>Panel de ayuda</h2>}>
            Listado de los proyectos con fondos monetarios en los que ha
            participado usted.
          </HelpPanel>
        }
        content={
          <ContentLayout
            disableOverlap
            header={
              <Header variant="h1">Proyectos con fondos monetarios:</Header>
            }
          >
            <SpaceBetween size="l">
              <Tabs
                tabs={tabs}
                ariaLabel="Ventanas de proyectos con fondos monetarios"
              />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </>
  );
}
