import { SpaceBetween } from "@cloudscape-design/components";
import Detalle from "./detalle.jsx";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import queryString from "query-string";
import BaseLayout from "../../../components/baseLayout.jsx";
import axiosBase from "../../../../../api/axios.js";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Facultad",
    href: "#",
  },
  {
    text: "Convocatorias",
    href: "../convocatorias",
  },
  {
    text: "Detalle",
    href: "#",
  },
];

export default function Detalle_convocatoria() {
  //  State
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/grupos/detalle/" + id);
    const data = await res.data;
    setData(data.data[0]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Detalle del convocatoria:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <SpaceBetween size="l">
        <Detalle data={data} loading={loading} />
      </SpaceBetween>
    </BaseLayout>
  );
}
