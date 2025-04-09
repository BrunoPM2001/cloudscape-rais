import {
  Box,
  Button,
  FormField,
  Modal,
  SpaceBetween,
  Table,
  Textarea,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import NotificationContext from "../../../../../providers/notificationProvider";

const initialForm = {
  observacion: "",
};

const formRules = {
  observacion: { required: true },
};

export default ({ close, reload, id, estado }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const [data, setData] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/monitoreo/verObs", {
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
      setLoadingForm(true);
      const res = await axiosBase.put("admin/estudios/monitoreo/observar", {
        id: id,
        observacion: formValues.observacion,
      });
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      setLoadingForm(false);
      close();
      reload();
    }
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
          <SpaceBetween size="xs" direction="horizontal">
            <Button onClick={close}>Cerrar</Button>
            <Button
              variant="primary"
              loading={loadingForm || loadingForm}
              onClick={observar}
              disabled={estado == "Observado"}
            >
              Observar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m">
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
        <FormField
          label="Observación"
          errorText={formErrors.observacion}
          stretch
        >
          <Textarea
            value={formValues.observacion}
            disabled={estado == "Observado"}
            onChange={({ detail }) => handleChange("observacion", detail.value)}
            placeholder="Escriba aquí la nueva observación"
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
