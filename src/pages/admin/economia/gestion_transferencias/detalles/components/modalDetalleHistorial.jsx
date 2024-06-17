import {
  Badge,
  Box,
  Button,
  Modal,
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
  },
  {
    id: "codigo",
    header: "Código de partida",
    cell: (item) => item.codigo,
  },
  {
    id: "partida",
    header: "Partida",
    cell: (item) => item.partida,
  },
  {
    id: "monto_original",
    header: "Monto inicial (S/)",
    cell: (item) => parseFloat(item.monto_original).toFixed(3),
  },
  {
    id: "transferencia",
    header: "Transferencia (S/)",
    cell: (item) =>
      item.operacion == "+" ? (
        <Badge color="blue">+{parseFloat(item.monto).toFixed(3)}</Badge>
      ) : (
        <Badge color="red">-{parseFloat(item.monto).toFixed(3)}</Badge>
      ),
  },
  {
    id: "monto_nuevo",
    header: "Nuevo monto (S/)",
    cell: (item) => parseFloat(item.monto_nuevo).toFixed(3),
  },
];

const columnDisplay = [
  { id: "tipo", visible: true },
  { id: "codigo", visible: true },
  { id: "partida", visible: true },
  { id: "monto_original", visible: true },
  { id: "transferencia", visible: true },
  { id: "monto_nuevo", visible: true },
];

export default ({ visible, setVisible, id }) => {
  //  States
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //  Functions
  const getData = async () => {
    const res = await axiosBase.get(
      "admin/economia/transferencias/movimientosTransferencia",
      {
        params: {
          geco_operacion_id: id,
        },
      }
    );
    const data = res.data;
    setData(data);
    setLoading(false);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="large"
      footer={
        <Box float="right">
          <Button variant="primary" onClick={() => setVisible(false)}>
            Cerrar
          </Button>
        </Box>
      }
      header="Detalle de la transferencia seleccionada"
    >
      <Table
        trackBy="codigo"
        items={data}
        columnDefinitions={columnDefinitions}
        columnDisplay={columnDisplay}
        loading={loading}
        loadingText="Cargando datos"
        resizableColumns
        variant="embedded"
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
      />
    </Modal>
  );
};
