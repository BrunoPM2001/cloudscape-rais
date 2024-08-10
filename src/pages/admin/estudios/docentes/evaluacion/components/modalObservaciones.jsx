import {
  Box,
  Button,
  FormField,
  Header,
  Modal,
  SpaceBetween,
  Table,
  Textarea,
} from "@cloudscape-design/components";
import axiosBase from "../../../../../../api/axios";
import { useContext, useEffect, useState } from "react";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import NotificationContext from "../../../../../../providers/notificationProvider";

const initialForm = {
  observacion: "",
};

const formRules = {
  observacion: { required: true },
};

export default ({ id, close, reload, enabled }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    const res = await axiosBase.get("admin/estudios/docentes/observaciones", {
      params: {
        id,
      },
    });
    const data = res.data;
    setData(data);
    setLoading(false);
  };

  const observar = async () => {
    if (validateForm()) {
      setCreating(true);
      const res = await axiosBase.post("admin/estudios/docentes/observar", {
        ...formValues,
        id,
      });
      setCreating(false);
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      reload();
      close();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      visible
      size="large"
      onDismiss={close}
      header="Observaciones"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button onClick={close}>Cerrar</Button>
            <Button
              variant="primary"
              loading={creating}
              onClick={observar}
              disabled={loading || enabled == "Observado"}
            >
              Registrar observación
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="s">
        <Table
          columnDefinitions={[
            {
              id: "fecha",
              header: "Fecha",
              cell: (item) => item.created_at,
              isRowHeader: true,
            },
            {
              id: "observacion",
              header: "Observación",
              cell: (item) => item.observacion,
            },
          ]}
          columnDisplay={[
            { id: "fecha", visible: true },
            { id: "observacion", visible: true },
          ]}
          wrapLines
          items={data}
          loading={loading}
          loadingText="Cargando datos"
          empty={
            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
              <SpaceBetween size="m">
                <b>No hay registros...</b>
              </SpaceBetween>
            </Box>
          }
        />
        <FormField
          label="Observación"
          errorText={formErrors.observacion}
          stretch
        >
          <Textarea
            placeholder="Escriba la observación"
            value={formValues.observacion}
            onChange={({ detail }) => handleChange("observacion", detail.value)}
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
