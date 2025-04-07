import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import queryString from "query-string";
import Detalles from "./detalles";
import Integrantes from "../tabs/integrantes";
import Descripcion from "../tabs/descripcion";
import Calendario from "../tabs/calendario";
import Presupuesto from "../tabs/presupuesto";
import axiosBase from "../../../../../../api/axios";
import BaseLayout from "../../../../components/baseLayout";
import Documentos from "./documentos";
import Grupos from "./grupos";

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
    href: "../../proyectos_grupos",
  },
  {
    text: "Detalle",
    href: "#",
  },
];

export default function Detalle_proyecto_pmulti() {
  //  State
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  //  Tabs
  const tabs = [
    {
      id: "integrantes",
      label: "Integrantes",
      content: <Integrantes data={data.miembros} loading={loading} />,
    },
    {
      id: "detalles_grupos",
      label: "Grupos",
      content: <Grupos data={data.grupos} loading={loading} />,
    },
    {
      id: "documentos",
      label: "Documentos",
      content: <Documentos data={data.documentos} loading={loading} />,
    },
    {
      id: "descripcion",
      label: "Descripcion",
      content: <Descripcion data={data.descripcion} loading={loading} />,
    },
    {
      id: "calendario",
      label: "Calendario",
      content: <Calendario data={data.actividades} loading={loading} />,
    },
    {
      id: "presupuesto",
      label: "Presupuesto",
      content: <Presupuesto data={data.presupuesto} loading={loading} />,
    },
  ];

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/estudios/proyectosGrupo/dataProyecto",
      {
        params: {
          proyecto_id: id,
        },
      }
    );
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
      header="Detalle del proyecto de grupo"
      helpInfo="Para registrar un proyecto al módulo de economía ingrese los datos de RR, fecha de RR y RD al editar un proyecto"
      contentType="table"
    >
      <SpaceBetween size="l">
        <Detalles
          data={data.detalle}
          loading={loading}
          proyecto_id={id}
          reload={getData}
        />
        {/* <Tabs tabs={tabs} ariaLabel="Opciones de proyecto de grupo" /> */}
      </SpaceBetween>
    </BaseLayout>
  );
}
