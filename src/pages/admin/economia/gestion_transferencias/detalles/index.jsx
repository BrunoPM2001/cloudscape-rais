import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import BaseLayout from "../../../components/baseLayout";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useEffect, useState } from "react";
import Transferencias from "./tabs/transferencia";
import Detalles from "./detalles";
import axiosBase from "../../../../../api/axios";
import Historial from "./tabs/historial";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Economía",
  },
  {
    text: "Gestión de transferencias",
    href: "../gestion_transferencias",
  },
  {
    text: "Detalles de proyecto",
  },
];

export default function Geco_detalle_transferencia() {
  //  States
  const [data, setData] = useState({
    presupuesto: [],
    historial: [],
  });
  const [loading, setLoading] = useState(true);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Tabs
  const tabs = [
    {
      id: "solicitud",
      label: "Solicitud de transferencia",
      content: (
        <Transferencias
          data={data.presupuesto}
          loading={loading}
          estado={data.solicitud?.estado}
        />
      ),
    },
    {
      id: "historial",
      label: "Historial de transferencia",
      content: <Historial data={data.historial} loading={loading} />,
    },
  ];

  //  Functions
  const getData = async () => {
    const res = await axiosBase.get(
      "admin/economia/transferencias/getSolicitudData",
      {
        params: {
          geco_proyecto_id: id,
        },
      }
    );
    const data = res.data;
    setData(data);
    setLoading(false);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Detalles"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <SpaceBetween size="l">
        <Detalles
          proyecto={data.proyecto}
          solicitud={data.solicitud}
          loading={loading}
        />
        <Tabs tabs={tabs} ariaLabel="Opciones de transferencia" />
      </SpaceBetween>
    </BaseLayout>
  );
}
