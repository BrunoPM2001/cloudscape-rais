import { Grid } from "@cloudscape-design/components";
import Cifras from "./widgets/cifras.jsx";
import Publicaciones from "./widgets/publicaciones.jsx";
import Extras from "./widgets/extras.jsx";
import Proyectos from "./widgets/proyectos.jsx";
import BaseLayout from "../components/baseLayout.jsx";
import axiosBase from "../../../api/axios.js";
import { useEffect, useState } from "react";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Dashboard principal",
    href: "",
  },
];

const gridDefinition = [
  {
    colspan: {
      default: 12,
      l: 8,
      m: 8,
      s: 8,
    },
  },
  {
    colspan: {
      default: 12,
      l: 4,
      m: 4,
      s: 4,
    },
  },
  {
    colspan: {
      default: 12,
      l: 6,
      m: 6,
      s: 6,
    },
  },
  {
    colspan: {
      default: 12,
      l: 6,
      m: 6,
      s: 6,
    },
  },
];

export default function Investigador_main() {
  //  States
  const [data, setData] = useState({
    detalles: null,
    metricas: null,
    tipos_publicaciones: [],
    tipos_proyectos: [],
  });
  const [loading, setLoading] = useState(true);

  //  Functions
  const getData = async () => {
    const res = await axiosBase.get("investigador/dashboard/getData");
    const data = res.data;
    setData(data);
    setLoading(false);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Resumen"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <Grid gridDefinition={gridDefinition}>
        <Cifras data={data.metricas} loading={loading} />
        <Extras data={data.detalles} loading={loading} />
        <Publicaciones data={data.tipos_publicaciones} loading={loading} />
        <Proyectos data={data.tipos_proyectos} loading={loading} />
      </Grid>
    </BaseLayout>
  );
}
