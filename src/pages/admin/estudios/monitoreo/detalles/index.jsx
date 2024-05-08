import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import Publicaciones from "./tabs/publicaciones";
import Extras from "./tabs/extras";
import Detalles from "./detalles";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import queryString from "query-string";
import BaseLayout from "../../../components/baseLayout";
import axiosBase from "../../../../../api/axios";

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
    text: "Monitoreo",
    href: "../monitoreo",
  },
  {
    text: "Detalle",
    href: "#",
  },
];

export default function Detalle_monitoreo() {
  //  State
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  //  Tabs
  const tabs = [
    {
      id: "publicaciones",
      label: "Publicaciones",
      content: <Publicaciones />,
    },
    {
      id: "extras",
      label: "Extras",
      content: <Extras data={data} loading={loading} />,
    },
  ];

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/estudios/monitoreo/detalleProyecto/" + id
    );
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
      header="Detalle de proyecto con metas:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <SpaceBetween size="l">
        <Detalles data={data} loading={loading} id={id} />
        <Tabs tabs={tabs} ariaLabel="Opciones de proyecto con metas" />
      </SpaceBetween>
    </BaseLayout>
  );
}
