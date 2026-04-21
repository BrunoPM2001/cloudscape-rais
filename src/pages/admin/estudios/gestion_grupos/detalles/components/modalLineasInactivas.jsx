import {
  Modal,
  Table,
  Box,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import axiosBase from "../../../../../../api/axios";

export default ({ close, grupo_id }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const res = await axiosBase.get(
      "admin/estudios/grupos/lineasInactivas",
      {
        params: { grupo_id },
      }
    );

    setItems(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      visible
      onDismiss={close}
      header="Líneas de investigación inactivas"
    >
      <Table
        items={items}
        loading={loading}
        columnDefinitions={[
          {
            id: "codigo",
            header: "Código",
            cell: (item) => item.codigo,
          },
          {
            id: "nombre",
            header: "Nombre",
            cell: (item) => item.nombre,
          },
        ]}
        empty={
          <Box textAlign="center">
            <b>No hay líneas de investigación inactivas</b>
          </Box>
        }
      />
    </Modal>
  );
};