import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import BaseLayout from "../../../components/baseLayout";
import Detalles from "./detalles";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Comprobantes from "./tabs/comprobantes";
import Partidas from "./tabs/partidas";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Economía",
  },
  {
    text: "Gestión de comprobantes",
    href: "../gestion_comprobantes",
  },
  {
    text: "Detalles de proyecto",
  },
];

export default function Geco_detalle_proyecto() {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Tabs
  const tabs = [
    {
      id: "comprobantes",
      label: "Comprobantes registrados",
      content: <Comprobantes id={id} />,
    },
    {
      id: "partidas",
      label: "Partidas",
      content: <Partidas id={id} />,
    },
  ];

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Detalles"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      contentType="table"
    >
      <SpaceBetween size="l">
        <Detalles id={id} />
        <Tabs tabs={tabs} ariaLabel="Opciones de proyecto geco" />
      </SpaceBetween>
    </BaseLayout>
  );
}
