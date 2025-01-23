import {
  Box,
  Button,
  Header,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useState, useEffect, useContext } from "react";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";

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
        item.monto - item.monto_rendido - item.monto_rendido_enviado
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

export default ({ id }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Data states
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
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
    const totales = data.reduce(
      (acumulador, item) => ({
        monto: acumulador.monto + Number(item.monto),
        monto_rendido_enviado:
          acumulador.monto_rendido_enviado + Number(item.monto_rendido_enviado),
        monto_rendido: acumulador.monto_rendido + Number(item.monto_rendido),
        saldo_rendicion:
          acumulador.saldo_rendicion + Number(item.saldo_rendicion),
        monto_excedido: acumulador.monto_excedido + Number(item.monto_excedido),
      }),
      {
        monto: 0.0,
        monto_rendido_enviado: 0.0,
        monto_rendido: 0.0,
        saldo_rendicion: 0.0,
        monto_excedido: 0.0,
      }
    );
    data.push(totales);
    setDistribution(data);
    setLoading(false);
  };

  const recalcular = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.get(
      "admin/economia/comprobantes/recalcularMontos",
      {
        params: {
          geco_proyecto_id: id,
        },
      }
    );
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    setLoadingBtn(false);
    getData();
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
        wrapLines
        header={
          <Header
            counter={"(" + distributions.length + ")"}
            actions={
              <Button onClick={recalcular} loading={loadingBtn}>
                Recalcular montos
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
