import { SpaceBetween } from "@cloudscape-design/components";
import Detalles from "./detalles.jsx";
import Criterios from "./criterios.jsx";
import BaseLayout from "../../../components/baseLayout";
import axiosBase from "../../../../../api/axios.js";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useEffect, useState } from "react";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
    href: "#",
  },
  {
    text: "Gestion de convocatorias",
    href: "../convocatorias",
  },
  {
    text: "Detalle",
    href: "#",
  },
];

export default function Detalle_evaluacion() {
  //  States
  const [data, setData] = useState({
    criterios: [],
  });
  const [loading, setLoading] = useState(true);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/estudios/convocatorias/detalleCriterios",
      {
        params: {
          id,
        },
      }
    );
    const response = res.data;
    setData(response);
    setLoading(false);
  };

  //  Data
  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Detalle del evaluación:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <SpaceBetween size="l">
        <Detalles data={data.evaluacion} loading={loading} reload={getData} />
        <Criterios
          data={data.criterios}
          estado={data.evaluacion?.estado}
          loading={loading}
          reload={getData}
        />
      </SpaceBetween>
    </BaseLayout>
  );
}
