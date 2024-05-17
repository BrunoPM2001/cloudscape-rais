import { Grid } from "@cloudscape-design/components";
import Cifras from "./widgets/cifras";
import Modulos from "./widgets/modulos";
import Publicaciones from "./widgets/publicaciones";
import Proyectos_tipos from "./widgets/proyectos_tipos";
import Proyectos_tipos_historicos from "./widgets/proyectos_tipos_historicos";
import BaseLayout from "../components/baseLayout";
import { useEffect, useState } from "react";
import axiosBase from "../../../api/axios";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
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
  {
    colspan: {
      default: 12,
      l: 12,
      m: 12,
      s: 12,
    },
  },
];

export default function Admin_main() {
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
    const res = await axiosBase.get("admin/dashboard/getData");
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
    >
      <Grid gridDefinition={gridDefinition}>
        <Cifras data={data.metricas} loading={loading} />
        <Modulos loading={loading} />
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
