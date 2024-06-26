import { Grid, SpaceBetween, Tabs } from "@cloudscape-design/components";
import Cifras from "./cifras";
import BaseLayout from "../../../components/baseLayout";
import { useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import Detalle from "./detalle";
import Asignacion from "./tabs/asignacion";
import Comprobantes from "./tabs/comprobantes";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Informes",
  },
  {
    text: "Informe económico",
    href: "../informeEconomico",
  },
  {
    text: "Detalle",
  },
];

const gridDefinition = [
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
];

export default function Informe_economico_detalles() {
  //  States
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/informes/informe_economico/detalles",
      {
        params: {
          id: id,
        },
      }
    );
    const data = res.data;
    setData(data);
    setLoading(false);
  };

  //  Tabs
  const tabs = [
    {
      id: "asignacion",
      label: "Asignación económica",
      content: <Asignacion data={data.asignacion ?? []} loading={loading} />,
    },
    {
      id: "comprobantes",
      label: "Registro de comprobantes",
      content: (
        <Comprobantes data={data.comprobantes ?? []} loading={loading} />
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Detalle"
      helpInfo="Resumen general del informe económico de un proyecto."
    >
      <SpaceBetween size="m">
        <Grid gridDefinition={gridDefinition}>
          <Detalle loading={loading} data={data.datos} />
          <Cifras loading={loading} data={data.cifras} />
        </Grid>
        <Tabs tabs={tabs} />
      </SpaceBetween>
    </BaseLayout>
  );
}
