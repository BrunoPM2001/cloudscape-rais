import {
  Modal,
  Table,
  Box,
  SpaceBetween,
  Button,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";

export default ({ close, grupo_id, facultad_id, lineasActuales, reload }) => {
      //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);

  const MAX = 3;

  const getData = async () => {
    const res = await axiosBase.get(
      "admin/estudios/grupos/lineasDisponibles",
      {
        params: { facultad_id },
      }
    );

    setItems(res.data);
    setLoading(false);
  };

  const guardar = async () => {
    setLoadingSave(true);

    await axiosBase.post("admin/estudios/grupos/agregarLineas", {
      grupo_id,
      lineas: selectedItems.map((i) => i.id),
    });

    reload();
    close();
    pushNotification(data.detail, data.message, notifications.length + 1);
  };

  useEffect(() => {
    getData();
  }, []);

  const totalFinal = lineasActuales.length + selectedItems.length;

  return (
    <Modal
      visible
      size="large" 
      onDismiss={close}
      header="Agregar líneas de investigación"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              disabled={totalFinal > MAX}
              loading={loadingSave}
              onClick={guardar}
            >
              Guardar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m">

        {lineasActuales.length >= MAX && (
          <Box color="text-status-error">
            ⚠️ Ya tiene el máximo de 3 líneas asignadas
          </Box>
        )}
        <Box style={{ maxHeight: "400px", overflow: "auto" }}>
        <Table
          items={items}
          loading={loading}
          selectionType="multi"
          selectedItems={selectedItems}
          onSelectionChange={({ detail }) => {
            if (lineasActuales.length + detail.selectedItems.length <= MAX) {
              setSelectedItems(detail.selectedItems);
            }
          }}
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
        <Box>
          Seleccionadas: {selectedItems.length} / Máximo permitido: {MAX}
        </Box>

      </SpaceBetween>
    </Modal>
  );
}