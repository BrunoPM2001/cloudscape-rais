import {
  Alert,
  Button,
  Grid,
  SpaceBetween,
} from "@cloudscape-design/components";
import Cifras from "./widgets/cifras.jsx";
import Publicaciones from "./widgets/publicaciones.jsx";
import Extras from "./widgets/extras.jsx";
import Proyectos from "./widgets/proyectos.jsx";
import BaseLayout from "../components/baseLayout.jsx";
import axiosBase from "../../../api/axios.js";
import ModalDj from "./components/modaDj.jsx";
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
    alerta: false,
  });

  const [loading, setLoading] = useState(true);
  const [showModalDj, setShowModalDj] = useState(false);

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

  // useEffect(() => {
  //   if (!loading && data.dj !== 1) {
  //     setShowModalDj(true);
  //   }
  // }, [data, loading]);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Resumen"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      contentType="table"
    >
      <SpaceBetween size="m">
        {data.alerta == 1 && (
          <Alert
            type="warning"
            header="Su constancia de docente investigador está por vencer"
            action={
              <Button
                variant="primary"
                onClick={() => {
                  window.location.href = "/investigador/perfil";
                }}
              >
                Solicitar renovación
              </Button>
            }
          />
        )}

        {showModalDj && (
          <ModalDj
            onClose={() => setShowModalDj(false)}
            proyecto_id={data.proyecto_id}
          />
        )}

        <Grid gridDefinition={gridDefinition}>
          <Cifras data={data.metricas} loading={loading} />
          <Extras data={data.detalles} loading={loading} />
          <Publicaciones data={data.tipos_publicaciones} loading={loading} />
          <Proyectos data={data.tipos_proyectos} loading={loading} />
        </Grid>
      </SpaceBetween>
    </BaseLayout>
  );
}
