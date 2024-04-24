import {
  AppLayout,
  BreadcrumbGroup,
  ContentLayout,
  Grid,
  Header,
} from "@cloudscape-design/components";
import Sidebar from "./../components/sidebar.jsx";
import Navbar from "./../components/navbar.jsx";
import Cifras from "./widgets/cifras.jsx";
import Detalles from "./widgets/detalles.jsx";
import Publicaciones from "./widgets/publicaciones.jsx";
import Proyectos_tipos from "./widgets/proyectos_tipos.jsx";
import Helpbar from "../components/helpbar.jsx";
import ProtectedRoute from "../components/protectedRoute.jsx";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Dashboard principal",
    href: "",
  },
];

export default function Investigador_main() {
  return (
    <ProtectedRoute type="Usuario_investigador">
      <Navbar />
      <AppLayout
        breadcrumbs={<BreadcrumbGroup items={breadcrumbs} />}
        navigation={<Sidebar />}
        tools={
          <Helpbar>
            Métricas generales respecto a su trayectoria como investigador
            registrado en el Rais.
          </Helpbar>
        }
        content={
          <ContentLayout header={<Header variant="h1">Resumen</Header>}>
            <Grid
              gridDefinition={[
                {
                  colspan: {
                    l: 8,
                    m: 8,
                    s: 8,
                    xs: 12,
                  },
                },
                {
                  colspan: {
                    l: 4,
                    m: 4,
                    s: 4,
                    xs: 12,
                  },
                },
                {
                  colspan: {
                    l: 6,
                    m: 6,
                    s: 6,
                    xs: 12,
                  },
                },
                {
                  colspan: {
                    l: 6,
                    m: 6,
                    s: 6,
                    xs: 12,
                  },
                },
              ]}
            >
              <Cifras />
              <Detalles />
              <Proyectos_tipos />
              <Publicaciones />
            </Grid>
          </ContentLayout>
        }
      />
    </ProtectedRoute>
  );
}
