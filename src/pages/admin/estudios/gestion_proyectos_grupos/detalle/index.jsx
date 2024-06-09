import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import Detalles from "./detalles";
import Integrantes from "./tabs/integrantes";
import Descripcion from "./tabs/descripcion";
import Calendario from "./tabs/calendario";
import Presupuesto from "./tabs/presupuesto";
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
    text: "Gestión de proyectos de grupos",
    href: "../proyectos_grupos",
  },
  {
    text: "Detalle",
    href: "#",
  },
];

export default function Detalle_proyecto_grupo() {
  //  State
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  //  Tabs
  const tabs = [
    {
      id: "integrantes",
      label: "Integrantes",
      content: <Integrantes />,
    },
    {
      id: "descripcion",
      label: "Descripcion",
      content: <Descripcion />,
    },
    {
      id: "calendario",
      label: "Calendario",
      content: <Calendario />,
    },
    {
      id: "presupuesto",
      label: "Presupuesto",
      content: <Presupuesto />,
    },
  ];

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/estudios/proyectosGrupo/detalle/" + id
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
      header="Detalle del proyecto de grupo:"
      helpInfo="Para registrar un proyecto al módulo de economía ingrese los datos de RR, fecha de RR y RD al editar un proyecto"
    >
      <SpaceBetween size="l">
        <Detalles
          data={data}
          loading={loading}
          proyecto_id={id}
          reload={getData}
        />
        <Tabs tabs={tabs} ariaLabel="Opciones de proyecto de grupo" />
      </SpaceBetween>
    </BaseLayout>
  );
}
