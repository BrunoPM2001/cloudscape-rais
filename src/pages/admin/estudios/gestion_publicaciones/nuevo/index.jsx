import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import BaseLayout from "../../../components/baseLayout";
import axiosBase from "../../../../../api/axios";
import Articulo from "./publicaciones_tipo/articulo";
import Capitulo from "./publicaciones_tipo/capitulo";
import Evento from "./publicaciones_tipo/evento";
import Libro from "./publicaciones_tipo/libro";
import Tesis_asesoria from "./publicaciones_tipo/tesis_asesoria";
import Tesis_propia from "./publicaciones_tipo/tesis_propia";
import { Container, Spinner } from "@cloudscape-design/components";

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
    text: "Nueva",
    href: "#",
  },
];

export default function Nueva_publicacion() {
  //  State
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  //  Url
  const location = useLocation();
  const { tipo } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/publicaciones/infoNuevo", {
      params: {
        tipo,
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
      header="Registro de nueva publicación"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      {loading ? (
        <Container>
          <Spinner /> Cargando datos
        </Container>
      ) : tipo == "articulo" ? (
        <Articulo data={data} />
      ) : tipo == "capitulo" ? (
        <Capitulo data={data} />
      ) : tipo == "evento" ? (
        <Evento data={data} />
      ) : tipo == "libro" ? (
        <Libro data={data} />
      ) : tipo == "tesis-asesoria" ? (
        <Tesis_asesoria data={data} />
      ) : (
        tipo == "tesis" && <Tesis_propia data={data} />
      )}
    </BaseLayout>
  );
}
