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
    text: "Proyectos multidisciplinarios",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Proyectos_multi() {
  return (
    <>
      <Navbar />
      <AppLayout
        breadcrumbs={<BreadcrumbGroup items={breadcrumbs} />}
        navigation={<Sidebar />}
        tools={
          <HelpPanel header={<h2>Panel de ayuda</h2>}>
            Listado de los proyectos multidisciplinarios en los que ha
            participado usted.
          </HelpPanel>
        }
        content={
          <ContentLayout
            disableOverlap
            header={
              <Header variant="h1">Proyectos multidisciplinarios:</Header>
            }
          >
            <SpaceBetween size="l">
              <Tabs
                tabs={tabs}
                ariaLabel="Ventanas de proyectos multidisciplinarios"
              />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </>
  );
}
