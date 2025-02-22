import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import queryString from "query-string";
import BaseLayout from "../../../components/baseLayout";
import axiosBase from "../../../../../api/axios";
import Detalles from "./detalles";
import Titulares from "./tabs/titulares";
import Autores from "./tabs/autores";

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
    text: "Detalle de patente",
    href: "#",
  },
];

export default function Detalle_patente() {
  //  State
  const [info, setInfo] = useState({
    titulares: [],
    autores: [],
  });
  const [loading, setLoading] = useState(true);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/patentes/getTabs", {
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

  //  Tabs
  const tabs = [
    {
      id: "titulares",
      label: "Manejo de titulares",
      content: (
        <Titulares loading={loading} data={info.titulares} reload={getData} />
      ),
    },
    {
      id: "autores",
      label: "Inventores",
      content: (
        <Autores data={info.autores} loading={loading} reload={getData} />
      ),
    },
  ];

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Detalle de la publicación"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <SpaceBetween size="l">
        <Detalles id={id} reload={getData} />
        <Tabs tabs={tabs} />
      </SpaceBetween>
    </BaseLayout>
  );
}
