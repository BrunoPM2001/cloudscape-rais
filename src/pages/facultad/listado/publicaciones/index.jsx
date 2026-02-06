import { Tabs } from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout";
// import ListadoInvestigador from "./tabs/listado";
import Listado from "./tabs/listado";
import Articulos from "./articulos/listado";
import Libros from "./libros/listado";
import Tesis from "./tesis/listado";
import Evento from "./eventos/listado";

const breadcrumbs = [
  {
    text: "Facultad",
    href: "/facultad",
  },
  {
    text: "Facultad",
  },
  {
    text: "Listado de Publicaciones",
  },
];

const tabs = [
  {
    id: "listado",
    label: "General",
    content: <Listado />,
  },
  {
    id: "articulos",
    label: "Articulos",
    content: <Articulos />,
  },
  {
    id: "libros",
    label: "Libros",
    content: <Libros />,
  },
  {
    id: "tesis",
    label: "Tesis",
    content: <Tesis />,
  },
  {
    id: "evento",
    label: "Eventos",
    content: <Evento />,
  },
];

export default function Publicaciones() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Listado de Publicaciones"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
      contentType="table"
    >
      <Tabs tabs={tabs} />
    </BaseLayout>
  );
}
