import { Tabs } from "@cloudscape-design/components";
import Listado from "./tabs/listado";
import BaseLayout from "../../components/baseLayout";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Publicaciones",
  },
  {
    text: "Editor en revistas",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Revistas_editores() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Revistas en las que puede nombrarse como editor"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
      contentType="table"
    >
      <Tabs tabs={tabs} />
    </BaseLayout>
  );
}
