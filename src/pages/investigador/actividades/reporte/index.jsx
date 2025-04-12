import { Alert, SpaceBetween } from "@cloudscape-design/components";
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
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Url
  const location = useLocation();
  const { proyecto_id, antiguo } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/actividades/detalleProyecto",
      {
        params: {
          proyecto_id,
          antiguo,
        },
      }
    );
    const data = res.data;
    setData(data);
    opciones(data.detalles.tipo_proyecto, data.detalles.estado);
    setLoading(false);
  };

  const opciones = (tipo, estado) => {
    if (estado != -1 && estado != 0) {
      if (
        tipo == "PCONFIGI" ||
        tipo == "PRO-CTIE" ||
        tipo == "PCONFIGI-INV" ||
        tipo == "PMULTI"
      ) {
        setItems([
          {
            id: "action_1",
            text: "Presupuesto",
          },
          {
            id: "action_2",
            text: "Proyecto",
          },
        ]);
      } else if (tipo == "PSINFINV" || tipo == "PSINFIPU" || tipo == "PICV") {
        setItems([
          {
            id: "action_3",
            text: "Proyecto",
          },
        ]);
      } else if (tipo == "PFEX") {
        setItems([
          {
            id: "action_4",
            text: "Proyecto",
          },
        ]);
      }
    }
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
      contentType="table"
    >
      <SpaceBetween size="l">
        {["Observado", "Anulado", "No registrado", "Observado"].includes(
          data.detalles?.estado
        ) && (
          <Alert type="error" header="Observación">
            {data.detalles.observaciones_admin}
          </Alert>
        )}
        <Detalles
          loading={loading}
          data={data.detalles}
          id={proyecto_id}
          items={items}
          antiguo={antiguo}
        />
        <Participantes loading={loading} data={data.participantes} />
      </SpaceBetween>
    </BaseLayout>
  );
}
