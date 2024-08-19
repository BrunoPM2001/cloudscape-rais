import {
  Box,
  Button,
  Header,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import axiosBase from "../../../../../../api/axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const columnDefinitions = [
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
    sortingField: "tipo",
  },
  {
    id: "partida",
    header: "Partida",
    cell: (item) => item.partida,
    sortingField: "partida",
  },
  {
    id: "monto",
    header: "Presupuesto asignado (S/)",
    cell: (item) => parseFloat(item.monto).toFixed(3),
    sortingField: "monto",
  },
  {
    id: "monto_rendido_enviado",
    header: "Monto rendido enviado (S/)",
    cell: (item) => parseFloat(item.monto_rendido_enviado).toFixed(3),
    sortingField: "monto_rendido_enviado",
  },
  {
    id: "monto_rendido",
    header: "Monto rendido validado DPGIP (S/)",
    cell: (item) => parseFloat(item.monto_rendido).toFixed(3),
    sortingField: "monto_rendido",
  },
  {
    id: "saldo_rendicion",
    header: "Saldo rendición (S/)",
    cell: (item) =>
      parseFloat(
        item.monto - item.monto_rendido - item.monto_rendido_enviado < 0
          ? 0
          : item.monto - item.monto_rendido - item.monto_rendido_enviado
      ).toFixed(3),
    sortingField: "saldo_rendicion",
  },
  {
    id: "monto_excedido",
    header: "Excedido (S/)",
    cell: (item) => parseFloat(item.monto_excedido).toFixed(3),
    sortingField: "monto_excedido",
  },
];

const columnDisplay = [
  { id: "tipo", visible: true },
  { id: "partida", visible: true },
  { id: "monto", visible: true },
  { id: "monto_rendido_enviado", visible: true },
  { id: "monto_rendido", visible: true },
  { id: "saldo_rendicion", visible: true },
  { id: "monto_excedido", visible: true },
];

export default ({ data, loading }) => {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  States
  const [loadingBtn, setLoadingBtn] = useState(false);

  //  Functions
  const reporte = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.get(
      "investigador/informes/informe_economico/reportePresupuesto",
      {
        params: {
          id: id,
        },
        responseType: "blob",
      }
    );
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingBtn(false);
  };

  return (
    <>
      <Table
        trackBy="codigo"
        items={data}
        columnDefinitions={columnDefinitions}
        columnDisplay={columnDisplay}
        loading={loading}
        loadingText="Cargando datos"
        resizableColumns
        header={
          <Header
            counter={"(" + data.length + ")"}
            actions={
              <Button
                variant="primary"
                iconName="download"
                onClick={reporte}
                loading={loadingBtn}
                disabled={loading}
              >
                Hoja de resumen
              </Button>
            }
          >
            Listado de partidas
          </Header>
        }
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
      />
    </>
  );
};
