import { Grid } from "@cloudscape-design/components";
import Cifras from "./widgets/cifras.jsx";
import Publicaciones from "./widgets/publicaciones.jsx";
import Extras from "./widgets/extras.jsx";
import Proyectos from "./widgets/proyectos.jsx";
import BaseLayout from "../components/baseLayout.jsx";

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
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Resumen"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
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
        <Extras />
        <Publicaciones />
        <Proyectos />
      </Grid>
    </BaseLayout>
  );
}
