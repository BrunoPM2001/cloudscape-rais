import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import queryString from "query-string";
import BaseLayout from "../../../../components/baseLayout";
import axiosBase from "../../../../../../api/axios";
import Descripcion from "./descripcion";
import Presupuesto from "../tabs/presupuesto";
import Detalles from "./detalles";
import Especificaciones from "./especificaciones";
import Impacto from "./impacto";

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

export default function Detalle_proyecto_eci() {
  //  State
  const [data, setData] = useState({
    especificaciones: {
      archivos: [],
    },
    presupuesto: {
      data: [],
    },
    impacto: {
      archivos: [],
    },
  });
  const [loading, setLoading] = useState(true);

  //  Tabs
  const tabs = [
    {
      id: "descripcion",
      label: "Descripcion",
      content: <Descripcion data={data.descripcion} loading={loading} />,
    },
    {
      id: "especificaciones",
      label: "Especificaciones",
      content: (
        <Especificaciones data={data.especificaciones} loading={loading} />
      ),
    },
    {
      id: "presupuesto",
      label: "Presupuesto",
      content: <Presupuesto data={data.presupuesto} loading={loading} />,
    },
    {
      id: "impacto",
      label: "Impacto",
      content: <Impacto data={data.impacto} loading={loading} />,
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
      header="Detalle del proyecto"
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
        <Tabs tabs={tabs} ariaLabel="Opciones de proyecto de grupo" />
      </SpaceBetween>
    </BaseLayout>
  );
}
