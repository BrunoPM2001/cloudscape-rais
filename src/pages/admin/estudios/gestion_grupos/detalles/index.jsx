import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import Miembros from "./tabs/miembros";
import Documentos from "./tabs/documentos";
import Lineas from "./tabs/lineas";
import Proyectos from "./tabs/proyectos";
import Publicaciones from "./tabs/publicaciones";
import Laboratorios from "./tabs/laboratorios";
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
    text: "Gestion de grupos",
    href: "../grupos",
  },
  {
    text: "Detalle",
    href: "#",
  },
];

export default function Detalle_grupo() {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  State
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/grupos/detalle/" + id);
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
      contentType="table"
    >
      <SpaceBetween size="l">
        <Detalles
          data={data}
          loading={loading}
          grupo_id={id}
          reload={getData}
        />
        <Tabs
          tabs={[
            {
              id: "miembros",
              label: "Miembros",
              content: <Miembros grupo_estado={data.estado} />,
            },
            {
              id: "documentos",
              label: "Documentos",
              content: <Documentos />,
            },
            {
              id: "lineas",
              label: "Lineas",
              content: <Lineas />,
            },
            {
              id: "proyectos",
              label: "Proyectos",
              content: <Proyectos />,
            },
            {
              id: "publicaciones",
              label: "Publicaciones",
              content: <Publicaciones />,
            },
            {
              id: "laboratorios",
              label: "Laboratorios",
              content: <Laboratorios />,
            },
            {
              id: "extras",
              label: "Extras",
              content: (
                <Extras
                  data={data}
                  loading={loading}
                  grupo_id={id}
                  reload={getData}
                />
              ),
            },
          ]}
          ariaLabel="Opciones de grupo"
        />
      </SpaceBetween>
    </BaseLayout>
  );
}
