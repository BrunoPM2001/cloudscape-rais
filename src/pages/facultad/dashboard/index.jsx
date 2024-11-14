import { Grid } from "@cloudscape-design/components";
import Cifras from "./widgets/cifras";
import Publicaciones from "./widgets/publicaciones";
import Proyectos_tipos from "./widgets/proyectos_tipos";
import Proyectos_tipos_historicos from "./widgets/proyectos_tipos_historicos";
import BaseLayout from "../components/baseLayout";
import { useEffect, useState } from "react";
import axiosBase from "../../../api/axios";

const breadcrumbs = [
  {
    text: "Facultad",
    href: "/facultad",
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
  {
    colspan: {
      default: 12,
      l: 12,
      m: 12,
      s: 12,
    },
  },
];

export default function Facultad_main() {
  //  States
  const [data, setData] = useState({
    metricas: null,
    publicaciones: {
      cuenta: [],
      tipos: [],
    },
    proyectos: [],
    proyectos_historicos: {
      cuenta: [{}],
      tipos: [{}],
    },
  });
  const [loading, setLoading] = useState(true);

  //  Functions
  const getData = async () => {
    const res = await axiosBase.get("facultad/dashboard/");
    const data = await res.data;
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
      header="Resumen:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      contentType="dashboard"
    >
      <Grid gridDefinition={gridDefinition}>
        <Cifras data={data.metricas} loading={loading} />
        <Publicaciones
          loading={loading}
          data={data.publicaciones.cuenta}
          tipos={data.publicaciones.tipos}
        />
        <Proyectos_tipos data={data.proyectos} loading={loading} />
        <Proyectos_tipos_historicos
          data={data.proyectos_historicos.cuenta}
          tipos={data.proyectos_historicos.tipos}
          loading={loading}
        />
      </Grid>
    </BaseLayout>
  );
}
