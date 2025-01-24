import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import queryString from "query-string";
import BaseLayout from "../../../components/baseLayout";
import axiosBase from "../../../../../api/axios";
import Detalles from "./detalles";
import Paso1 from "./tabs/paso1";
import Paso2 from "./tabs/paso2";
import Paso3 from "./tabs/paso3";
import Paso4 from "./tabs/paso4";

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
    text: "Gestión de proyectos FEX",
    href: "../proyectos_fex",
  },
  {
    text: "Detalle",
    href: "#",
  },
];

export default function Detalle_proyectoFEX() {
  //  State
  const [info, setInfo] = useState({
    paso1: null,
    paso2: null,
    paso3: [],
    paso4: [],
  });
  const [loading, setLoading] = useState(true);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/proyectosFEX/pasos", {
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
      id: "paso1",
      label: "Paso 1",
      content: <Paso1 data={info.paso1} loading={loading} reload={getData} />,
    },
    {
      id: "paso2",
      label: "Paso 2",
      content: <Paso2 data={info.paso2} loading={loading} reload={getData} />,
    },
    {
      id: "paso3",
      label: "Paso 3",
      content: <Paso3 info={info.paso3} loading={loading} reload={getData} />,
    },
    {
      id: "paso4",
      label: "Paso 4",
      content: <Paso4 info={info.paso4} loading={loading} reload={getData} />,
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
        <Detalles id={id} />
        <Tabs tabs={tabs} />
      </SpaceBetween>
    </BaseLayout>
  );
}
