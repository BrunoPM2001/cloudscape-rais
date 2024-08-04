import { useEffect, useState } from "react";
import BaseLayout from "../../../components/baseLayout";
import Detalles from "./detalles";
import axiosBase from "../../../../../api/axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import {
  Box,
  Grid,
  SpaceBetween,
  Spinner,
} from "@cloudscape-design/components";
import Criterio1 from "./criterio1";
import Criterio2 from "./criterio2";
import Criterio3 from "./criterio3";
import Criterio4 from "./criterio4";
import Criterio5 from "./criterio5";
import Criterio6 from "./criterio6";
import ActividadesExtra from "./actividadesExtra";
import Calificar from "./components/calificar";
import Tramite from "./components/tramite";
import Constancia from "./components/constancia";
import Aprobado from "./components/aprobado";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
  },
  {
    text: "Docente investigador",
    href: "../docente_investigador",
  },
  {
    text: "Evaluación",
  },
];

export default function Docente_investigador_evaluacion() {
  //  States
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/docentes/evaluarData", {
      params: {
        id,
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
      header="Docentes investigadores"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <SpaceBetween size="l">
        <Detalles id={id} data={data.detalles} loading={loading} />
        {loading ? (
          <Box>
            <Spinner /> Cargando datos
          </Box>
        ) : (
          <SpaceBetween size="l">
            <Grid
              gridDefinition={[
                {
                  colspan: {
                    default: 12,
                    l: 5,
                    m: 5,
                    s: 5,
                  },
                },
                {
                  colspan: {
                    default: 12,
                    l: 7,
                    m: 7,
                    s: 7,
                  },
                },
              ]}
            >
              <Criterio1 data={data.d1} />
              <Criterio2 data={data.d2} />
            </Grid>
            <Criterio3 data={data.d3} />
            <Criterio4 data={data.d4} />
            <Criterio5 data={data.d5} />
            <Criterio6 data={data.d6} />
            <ActividadesExtra data={data.actividades} reload={getData} />
            {data.detalles.estado == "Enviado" ? (
              <Calificar id={id} reload={getData} />
            ) : data.detalles.estado == "En trámite" ? (
              <Tramite id={id} data={data.detalles} reload={getData} />
            ) : data.detalles.estado == "Pendiente" ? (
              <Constancia id={id} data={data.detalles} reload={getData} />
            ) : data.detalles.estado == "Aprobado" ? (
              <Aprobado id={id} data={data.detalles} />
            ) : (
              <></>
            )}
          </SpaceBetween>
        )}
      </SpaceBetween>
    </BaseLayout>
  );
}
