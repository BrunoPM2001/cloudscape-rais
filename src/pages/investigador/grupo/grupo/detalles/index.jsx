import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import Detalles from "./detalles";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import queryString from "query-string";
import axiosBase from "../../../../../api/axios";
import BaseLayout from "../../../components/baseLayout";
import Miembros from "./tabs/miembros";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Grupo",
  },
  {
    text: "Grupos",
  },
  {
    text: "Detalle de grupo",
  },
];

export default function Detalle_grupo_invest() {
  //  State
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  //  Tabs
  const tabs = [
    {
      id: "miembros",
      label: "Miembros",
      content: <Miembros grupo_estado={data.estado} />,
    },
    //   {
    //     id: "lineas",
    //     label: "Lineas",
    //     content: <Lineas />,
    //   },
    //   {
    //     id: "proyectos",
    //     label: "Proyectos",
    //     content: <Proyectos />,
    //   },
    //   {
    //     id: "publicaciones",
    //     label: "Publicaciones",
    //     content: <Publicaciones />,
    //   },
    //   {
    //     id: "extras",
    //     label: "Extras",
    //     content: <Extras data={data} loading={loading} />,
    //   },
  ];

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/grupo/detalle", {
      params: {
        id: id,
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
      header="Detalle del grupo de investigación:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <SpaceBetween size="l">
        <Detalles
          data={data}
          loading={loading}
          grupo_id={id}
          reload={getData}
        />
        <Tabs tabs={tabs} ariaLabel="Opciones de grupo" />
      </SpaceBetween>
    </BaseLayout>
  );
}
