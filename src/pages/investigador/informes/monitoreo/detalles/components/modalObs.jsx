import {
  Box,
  Button,
  Modal,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import axiosBase from "../../../../../../api/axios";

export default ({ close, id }) => {
  //  States
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/informes/monitoreo/verObs", {
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
    <Modal
      visible
      onDismiss={close}
      size="large"
      header="Historial de observaciones"
      footer={
        <Box float="right">
          <Button onClick={close}>Cerrar</Button>
        </Box>
      }
    >
      <Table
        trackBy="id"
        columnDefinitions={[
          {
            id: "observacion",
            header: "Observación",
            cell: (item) => item.observacion,
          },
          {
            id: "created_at",
            header: "Fecha de creación",
            cell: (item) => item.created_at,
            width: 120,
          },
          {
            id: "updated_at",
            header: "Fecha de actualización",
            cell: (item) => item.updated_at,
            width: 120,
          },
        ]}
        columnDisplay={[
          { id: "observacion", visible: true },
          { id: "created_at", visible: true },
          { id: "updated_at", visible: true },
        ]}
        items={data}
        loading={loading}
        loadingText="Cargando data"
        wrapLines
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
