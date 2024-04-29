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
const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Proyecto con financiamiento",
  },
];

export default function Convocatoria_registro() {
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
            <SpaceBetween size="l">{/* <Tabs tabs={tabs} /> */}</SpaceBetween>
          </ContentLayout>
        }
      />
    </>
  );
}
