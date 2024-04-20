import {
  AppLayout,
  BreadcrumbGroup,
  ContentLayout,
  Flashbar,
  Grid,
  Header,
} from "@cloudscape-design/components";
import Sidebar from "./../components/sidebar.jsx";
import Navbar from "./../components/navbar.jsx";
import Cifras from "./widgets/cifras.jsx";
import Modulos from "./widgets/modulos.jsx";
import Publicaciones from "./widgets/publicaciones.jsx";
import Proyectos_tipos from "./widgets/proyectos_tipos.jsx";
import Proyectos_tipos_historicos from "./widgets/proyectos_tipos_historicos.jsx";
import Helpbar from "../components/helpbar.jsx";
import ProtectedRoute from "../components/protectedRoute.jsx";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Dashboard principal",
    href: "",
  },
];

export default function Admin_main() {
  return (
    <ProtectedRoute type="Usuario_admin">
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
                {
                  colspan: {
                    l: 12,
                    m: 12,
                    s: 12,
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
              <Modulos />
              <Publicaciones />
              <Proyectos_tipos />
              <Proyectos_tipos_historicos />
            </Grid>
          </ContentLayout>
        }
      />
    </ProtectedRoute>
  );
}
