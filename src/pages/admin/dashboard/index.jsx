import {
  AppLayout,
  BreadcrumbGroup,
  ContentLayout,
  Flashbar,
  Grid,
  Header,
  HelpPanel,
} from "@cloudscape-design/components";
import Sidebar from "./../components/sidebar.jsx";
import Navbar from "./../components/navbar.jsx";
import Cifras from "./widgets/cifras.jsx";
import Modulos from "./widgets/modulos.jsx";
import Deudas from "./widgets/deudas.jsx";
import Proyectos_tipos from "./widgets/proyectos_tipos.jsx";
import Proyectos_tipos_historicos from "./widgets/proyectos_tipos_historicos.jsx";

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
    <>
      <Navbar />
      <AppLayout
        breadcrumbs={<BreadcrumbGroup items={breadcrumbs} />}
        navigation={<Sidebar />}
        tools={
          <HelpPanel header={<h2>Panel de ayuda</h2>}>
            Información sobre la páginal actual para poder mostrarla al público
            en general.
          </HelpPanel>
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
              <Deudas />
              <Proyectos_tipos />
              <Proyectos_tipos_historicos />
            </Grid>
          </ContentLayout>
        }
      />
    </>
  );
}
