import { Grid } from "@cloudscape-design/components";
import Cifras from "./widgets/cifras";
import Modulos from "./widgets/modulos";
import Publicaciones from "./widgets/publicaciones";
import Proyectos_tipos from "./widgets/proyectos_tipos";
import Proyectos_tipos_historicos from "./widgets/proyectos_tipos_historicos";
import BaseLayout from "../components/baseLayout";

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

const gridDefinition = [
  {
    colspan: {
      default: 12,
      l: 8,
      m: 8,
      s: 8,
    },
  },
  {
    colspan: {
      default: 12,
      l: 4,
      m: 4,
      s: 4,
    },
  },
  {
    colspan: {
      default: 12,
      l: 6,
      m: 6,
      s: 6,
    },
  },
  {
    colspan: {
      default: 12,
      l: 6,
      m: 6,
      s: 6,
    },
  },
  {
    colspan: {
      default: 12,
      l: 12,
      m: 12,
      s: 12,
    },
  },
];

export default function Admin_main() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Resumen:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <Grid gridDefinition={gridDefinition}>
        <Cifras />
        <Modulos />
        <Publicaciones />
        <Proyectos_tipos />
        <Proyectos_tipos_historicos />
      </Grid>
    </BaseLayout>
  );
}
