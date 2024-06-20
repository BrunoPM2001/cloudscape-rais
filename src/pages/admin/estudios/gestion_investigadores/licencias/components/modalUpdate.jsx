import {
  Box,
  Button,
  ColumnLayout,
  DatePicker,
  Form,
  FormField,
  Input,
  Modal,
  Select,
  SpaceBetween,
  Textarea,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import NotificationContext from "../../../../../../providers/notificationProvider";
import axiosBase from "../../../../../../api/axios";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";

export default ({ visible, setVisible, item, reload }) => {
  //  Constantes
  const initialForm = {
    licencia_tipo_id: { label: item.tipo },
    fecha_inicio: item.fecha_inicio,
    fecha_fin: item.fecha_fin,
    documento: item.documento,
    comentario: item.comentario,
  };

  const formRules = {
    licencia_tipo_id: { required: true },
    fecha_inicio: { required: true },
    fecha_fin: { required: true },
    documento: { required: false },
    comentario: { required: false },
  };

  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);
  const [tipos, setTipos] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const updateLicencia = async () => {
    if (validateForm()) {
      setLoading(true);
      const response = await axiosBase.put(
        "admin/estudios/investigadores/updateLicencia",
        {
          ...formValues,
          id: item.id,
        }
      );
      const data = response.data;
      setLoading(false);
      setVisible(false);
      pushNotification(data.detail, data.message, notifications.length + 1);
      reload();
    }
  };

  const getLicencias = async () => {
    const res = await axiosBase.get(
      "admin/estudios/investigadores/licenciasTipo"
    );
    const data = res.data;
    setTipos(data);
    handleChange(
      "licencia_tipo_id",
      data.find((opt) => opt.label == item.tipo)
    );
  };

  useEffect(() => {
    getLicencias();
  }, []);

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              loading={loading}
              onClick={updateLicencia}
            >
              Guardar licencia
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Editar licencia a investigador"
    >
      <Form variant="embedded">
        <ColumnLayout columns={4}>
          <FormField
            label="Tipo de licencia"
            stretch
            errorText={formErrors.licencia_tipo_id}
          >
            <Select
              placeholder="Escoga una opción"
              selectedOption={formValues.licencia_tipo_id}
              onChange={({ detail }) =>
                handleChange("licencia_tipo_id", detail.selectedOption)
              }
              statusType={tipos.length == 0 ? "loading" : "finished"}
              options={tipos}
            />
          </FormField>
          <FormField
            label="Fecha de inicio"
            stretch
            errorText={formErrors.fecha_inicio}
          >
            <DatePicker
              placeholder="YYYY/MM/DD"
              value={formValues.fecha_inicio}
              onChange={({ detail }) =>
                handleChange("fecha_inicio", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Fecha de fin"
            stretch
            errorText={formErrors.fecha_fin}
          >
            <DatePicker
              placeholder="YYYY/MM/DD"
              value={formValues.fecha_fin}
              onChange={({ detail }) => handleChange("fecha_fin", detail.value)}
            />
          </FormField>
          <FormField label="Documento" stretch errorText={formErrors.documento}>
            <Input
              value={formValues.documento}
              onChange={({ detail }) => handleChange("documento", detail.value)}
            />
          </FormField>
        </ColumnLayout>
        <FormField label="Comentario" stretch errorText={formErrors.comentario}>
          <Textarea
            value={formValues.comentario}
            onChange={({ detail }) => handleChange("comentario", detail.value)}
          />
        </FormField>
      </Form>
    </Modal>
  );
};
