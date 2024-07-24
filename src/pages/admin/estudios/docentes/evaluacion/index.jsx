import { useEffect, useState } from "react";
import BaseLayout from "../../../components/baseLayout";
import Detalles from "./detalles";
import axiosBase from "../../../../../api/axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
  },
  {
    text: "Docente investigador",
  },
  {
    text: "Evaluación",
  },
];

export default function Docente_investigador_evaluacion() {
  //  States
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    const res = await axiosBase.get("admin/estudios/docentes/evaluarData", {
      params: {
        id,
      },
    });
    const data = res.data;
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Docentes investigadores"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <Detalles data={data.detalles} loading={loading} />
      {/* <Criterio1 /> */}
    </BaseLayout>
  );
}
