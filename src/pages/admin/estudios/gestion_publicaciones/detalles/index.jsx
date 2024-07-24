import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import queryString from "query-string";
import BaseLayout from "../../../components/baseLayout";
import axiosBase from "../../../../../api/axios";
import Detalles from "./detalles";
import Proyectos from "./tabs/proyectos";
import Autores from "./tabs/autores";
import Info from "./tabs/info";

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
    text: "Gestion de publicaciones",
    href: "../gestion_publicaciones",
  },
  {
    text: "Detalle",
    href: "#",
  },
];

export default function Detalle_publicacion() {
  //  State
  const [info, setInfo] = useState({
    proyectos: [],
    autores: [],
  });
  const [loading, setLoading] = useState(true);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Tabs
  const tabs = [
    {
      id: "detalles",
      label: "Detalles",
      content: <Info data={info.detalle} loading={loading} tipo={info?.tipo} />,
    },
    {
      id: "proyectos",
      label: "Proyectos",
      content: <Proyectos data={info.proyectos} loading={loading} />,
    },
    {
      id: "autores",
      label: "Autores",
      content: (
        <Autores data={info.autores} loading={loading} tipo={info?.tipo} />
      ),
    },
  ];

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/publicaciones/getTabs", {
      params: {
        id,
      },
    });
    const data = res.data;
    setInfo(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Detalle de la publicación"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <SpaceBetween size="l">
        <Detalles id={id} />
        <Tabs tabs={tabs} />
      </SpaceBetween>
    </BaseLayout>
  );
}
