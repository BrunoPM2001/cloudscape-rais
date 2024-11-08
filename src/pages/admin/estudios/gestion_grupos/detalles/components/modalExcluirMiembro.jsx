import {
  Box,
  Button,
  ColumnLayout,
  DatePicker,
  Form,
  FormField,
  Header,
  Input,
  Modal,
  SpaceBetween,
  Textarea,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../../providers/notificationProvider";
import axiosBase from "../../../../../../api/axios";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";

const initialForm = {
  fecha_exclusion: "",
  resolucion_exclusion: "",
  resolucion_exclusion_fecha: "",
  resolucion_oficina_exclusion: "",
  observacion_excluir: "",
};

const formRules = {
  fecha_exclusion: { required: true },
  resolucion_exclusion: { required: false },
  resolucion_exclusion_fecha: { required: false },
  resolucion_oficina_exclusion: { required: false },
  observacion_excluir: { required: false },
};

export default ({ visible, setVisible, item, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const excluirMiembro = async () => {
    if (validateForm()) {
      setLoading(true);
      const response = await axiosBase.put(
        "admin/estudios/grupos/excluirMiembro",
        {
          id: item[0].id,
          condicion: item[0].condicion,
          fecha_exclusion: formValues.fecha_exclusion,
          resolucion_exclusion: formValues.resolucion_exclusion,
          resolucion_exclusion_fecha: formValues.resolucion_exclusion_fecha,
          resolucion_oficina_exclusion: formValues.resolucion_oficina_exclusion,
          observacion_excluir: formValues.observacion_excluir,
        }
      );
      const data = await response.data;
      setLoading(false);
      close();
      pushNotification(data.detail, data.message, notifications.length + 1);
      reload();
    }
  };

  return (
    <Modal
      visible
      size="large"
      onDismiss={close}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              loading={loading}
              onClick={excluirMiembro}
            >
              Excluir miembro
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Excluir miembro del grupo"
    >
      <Form header={<Header>Datos de exclusión</Header>} variant="embedded">
        <ColumnLayout columns={4}>
          <FormField
            label="Fecha de exclusión"
            stretch
            errorText={formErrors.fecha_exclusion}
          >
            <DatePicker
              placeholder="YYYY/MM/DD"
              value={formValues.fecha_exclusion}
              onChange={({ detail }) =>
                handleChange("fecha_exclusion", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Res. exclusión"
            stretch
            errorText={formErrors.resolucion_exclusion}
          >
            <Input
              value={formValues.resolucion_exclusion}
              onChange={({ detail }) =>
                handleChange("resolucion_exclusion", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Fecha de res. exclusión"
            stretch
            errorText={formErrors.resolucion_exclusion_fecha}
          >
            <DatePicker
              placeholder="YYYY/MM/DD"
              value={formValues.resolucion_exclusion_fecha}
              onChange={({ detail }) =>
                handleChange("resolucion_exclusion_fecha", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Res. of. exclusión"
            stretch
            errorText={formErrors.resolucion_oficina_exclusion}
          >
            <Input
              value={formValues.resolucion_oficina_exclusion}
              onChange={({ detail }) =>
                handleChange("resolucion_oficina_exclusion", detail.value)
              }
            />
          </FormField>
        </ColumnLayout>
        <FormField
          label="Observación / Comentario"
          stretch
          errorText={formErrors.observacion_excluir}
        >
          <Textarea
            value={formValues.observacion_excluir}
            onChange={({ detail }) =>
              handleChange("observacion_excluir", detail.value)
            }
          />
        </FormField>
      </Form>
    </Modal>
  );
};
