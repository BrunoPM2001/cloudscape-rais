import {
  Box,
  Header,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import axiosBase from "../../../../../../api/axios";

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
    id: "created_at",
    header: "Saldo rendición (S/)",
    cell: (item) => item.monto_excedido,
    sortingField: "monto_rendido",
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
  { id: "created_at", visible: true },
  { id: "monto_excedido", visible: true },
];

export default ({ id }) => {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [distributions, setDistribution] = useState([]);
  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/economia/comprobantes/listadoPartidasProyecto",
      {
        params: {
          geco_proyecto_id: id,
        },
      }
    );
    const data = res.data;
    console.log(data);
    setDistribution(data);
    setLoading(false);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Table
        trackBy="codigo"
        items={distributions}
        columnDefinitions={columnDefinitions}
        columnDisplay={columnDisplay}
        loading={loading}
        loadingText="Cargando datos"
        resizableColumns
        wrapLines
        header={
          <Header counter={"(" + distributions.length + ")"}>
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
