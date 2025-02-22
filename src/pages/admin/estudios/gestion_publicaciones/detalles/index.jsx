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
  const [detalles, setDetalles] = useState({});
  const [loading, setLoading] = useState(true);
  const [changes, setChanges] = useState(0);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/publicaciones/getTabs", {
      params: {
        id,
      },
    });
    const data = res.data;
    setDetalles(data.detalle);
    setInfo(data);
    setChanges(0);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setChanges((prev) => prev + 1);
  }, [detalles]);

  //  Tabs
  const tabs = [
    {
      id: "detalles",
      label: "Detalles",
      content: (
        <Info
          data={detalles}
          setData={setDetalles}
          loading={loading}
          tipo={info?.tipo}
          reload={getData}
        />
      ),
    },
    {
      id: "proyectos",
      label: "Proyectos",
      content: (
        <Proyectos data={info.proyectos} loading={loading} reload={getData} />
      ),
    },
    {
      id: "autores",
      label: "Autores",
      content: (
        <Autores
          data={info.autores}
          loading={loading}
          tipo={info?.tipo}
          reload={getData}
        />
      ),
    },
  ];

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Detalle de la publicación"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      contentType="table"
    >
      <SpaceBetween size="l">
        <Detalles id={id} changes={changes} reload={getData} />
        <Tabs tabs={tabs} />
      </SpaceBetween>
    </BaseLayout>
  );
}
