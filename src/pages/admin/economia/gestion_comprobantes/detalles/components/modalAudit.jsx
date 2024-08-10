import {
  Badge,
  Box,
  Button,
  Header,
  Modal,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import axiosBase from "../../../../../../api/axios";

export default ({ close, item }) => {
  //  States
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Functions
  const getData = async () => {
    const res = await axiosBase.get(
      "admin/economia/comprobantes/verAuditoria",
      {
        params: {
          id: item.id,
        },
      }
    );
    const data = res.data;
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Modal
      visible
      onDismiss={close}
      size="medium"
      header="Auditoría"
      footer={
        <Box float="right">
          <Button onClick={close}>Cerrar</Button>
        </Box>
      }
    >
      <Table
        trackBy="fecha"
        items={items}
        loading={loading}
        loadingText="Cargando datos"
        variant="embedded"
        wrapLines
        columnDefinitions={[
          {
            id: "fecha",
            header: "Fecha",
            cell: (item) => item.fecha,
            isRowHeader: true,
          },
          {
            id: "nombre",
            header: "Nombre",
            cell: (item) => item.nombre,
          },
          {
            id: "estado",
            header: "Estado",
            cell: (item) => (
              <Badge
                color={
                  item.estado == 1
                    ? "green"
                    : item.estado == 2
                    ? "red"
                    : item.estado == 3
                    ? "grey"
                    : item.estado == 4
                    ? "blue"
                    : item.estado == 5
                    ? "red"
                    : "red"
                }
              >
                {item.estado == 1
                  ? "Aprobado"
                  : item.estado == 2
                  ? "Rechazado"
                  : item.estado == 3
                  ? "Observado"
                  : item.estado == 4
                  ? "Enviado"
                  : item.estado == 5
                  ? "Anulado"
                  : "Error"}
              </Badge>
            ),
          },
        ]}
        columnDisplay={[
          { id: "fecha", visible: true },
          { id: "nombre", visible: true },
          { id: "estado", visible: true },
        ]}
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
