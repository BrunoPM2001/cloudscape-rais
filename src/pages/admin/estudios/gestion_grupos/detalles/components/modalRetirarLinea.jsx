import {
  Modal,
  Table,
  Box,
  SpaceBetween,
  Button,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";

export default ({ close, grupo_id, lineasActuales, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const eliminar = async () => {
    setLoading(true);
    const lineasSeleccionadas = selectedItems.map((i) => i.id);
    await axiosBase.post("admin/estudios/grupos/retirarLineas", {
      grupo_id,
      lineas: lineasSeleccionadas,
    });

    reload();
    close();
    pushNotification(data.detail, data.message, notifications.length + 1);
  };

  return (
    <Modal
      visible
      size="large"
      onDismiss={close}
      header="Retirar líneas de investigación"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button onClick={close}>Cancelar</Button>
            <Button
              variant="danger"
              disabled={selectedItems.length === 0}
              loading={loading}
              onClick={eliminar}
            >
              Retirar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m">

        <Box>
          Selecciona las líneas que deseas retirar
        </Box>

        <Box style={{ maxHeight: "400px", overflow: "auto" }}>
          <Table
            items={lineasActuales}
            selectionType="multi"
            selectedItems={selectedItems}
            onSelectionChange={({ detail }) =>
              setSelectedItems(detail.selectedItems)
            }
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
          />
        </Box>

      </SpaceBetween>
    </Modal>
  );
};