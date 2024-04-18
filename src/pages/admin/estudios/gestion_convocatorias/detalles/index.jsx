import {
  AppLayout,
  BreadcrumbGroup,
  ContentLayout,
  Flashbar,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";
import Sidebar from "../../../components/sidebar.jsx";
import Navbar from "../../../components/navbar.jsx";
import Helpbar from "../../../components/helpbar.jsx";
import Detalles from "./detalles.jsx";
import Criterios from "./criterios.jsx";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
    href: "#",
  },
  {
    text: "Gestion de convocatorias",
    href: "../convocatorias",
  },
  {
    text: "Detalle",
    href: "#",
  },
];

export default function Detalle_evaluacion() {
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
            header={<Header variant="h1">Detalle del evaluación:</Header>}
          >
            <SpaceBetween size="l">
              <Detalles />
              <Criterios />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </>
  );
}
