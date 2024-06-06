import { SpaceBetween } from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout.jsx";
import Detalles from "./detalles.jsx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axiosBase from "../../../../api/axios.js";
import Participantes from "./participantes.jsx";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Actividades",
  },
  {
    text: "Detalle del proyecto",
  },
];

export default function Proyecto_detalle() {
  //  States
  const [data, setData] = useState({ participantes: [] });
  const [loading, setLoading] = useState(true);

  //  Url
  const location = useLocation();
  const { proyecto_id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/actividades/detalleProyecto",
      {
        params: {
          proyecto_id: proyecto_id,
        },
      }
    );
    const data = await res.data;
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
      header="Detalles de proyecto"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <SpaceBetween size="l">
        <Detalles loading={loading} data={data.detalles} />
        <Participantes loading={loading} data={data.participantes} />
      </SpaceBetween>
    </BaseLayout>
  );
}
