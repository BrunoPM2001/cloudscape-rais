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

const optsEstado = [
  {
    value: -1,
    label: "Eliminado",
  },
  {
    value: 0,
    label: "No aprobado",
  },
  {
    value: 1,
    label: "Aprobado",
  },
  {
    value: 2,
    label: "Observado",
  },
  {
    value: 3,
    label: "En evaluación",
  },
  {
    value: 5,
    label: "Enviado",
  },
  {
    value: 6,
    label: "En proceso",
  },
  {
    value: 7,
    label: "Anulado",
  },
  {
    value: 9,
    label: "En ejecución",
  },
  {
    value: 10,
    label: "Ejecutado",
  },
  {
    value: 11,
    label: "Concluido",
  },
  {
    value: 12,
    label: "Renunció",
  },
];

const initialForm = {
  titulo: "",
  codigo_proyecto: "",
  resolucion_rectoral: "",
  resolucion_fecha: "",
  resolucion_decanal: "",
  comentario: "",
  estado: null,
};

const formRules = {
  titulo: { required: true },
  codigo_proyecto: { required: false },
  resolucion_rectoral: { required: false },
  resolucion_fecha: { required: false },
  resolucion_decanal: { required: false },
  comentario: { required: false },
  estado: { required: true },
};

export default ({ visible, setVisible, item, proyecto_id, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(
      {
        ...initialForm,
        ...item,
        estado: item.estado == null ? null : { value: item.estado },
      },
      formRules
    );

  //  Functions
  const editarProyecto = async () => {
    if (validateForm()) {
      setLoading(true);
      const res = await axiosBase.put(
        "admin/estudios/proyectosGrupo/updateDetalle",
        {
          ...formValues,
          proyecto_id,
        }
      );
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      reload();
      setLoading(false);
      setVisible(false);
    }
  };

  useEffect(() => {
    handleChange(
      "estado",
      optsEstado.find((opt) => opt.value == item.estado)
    );
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
              onClick={editarProyecto}
            >
              Guardar
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Editar datos del proyecto"
    >
      <Form variant="embedded">
        <SpaceBetween size="m">
          <FormField label="Título" stretch errorText={formErrors.titulo}>
            <Input
              value={formValues.titulo}
              onChange={({ detail }) => handleChange("titulo", detail.value)}
            />
          </FormField>
          <ColumnLayout columns={4}>
            <FormField
              label="Código de proyecto"
              stretch
              errorText={formErrors.codigo_proyecto}
            >
              <Input
                placeholder="Escriba el código del proyecto"
                value={formValues.codigo_proyecto}
                onChange={({ detail }) =>
                  handleChange("codigo_proyecto", detail.value)
                }
              />
            </FormField>
            <FormField
              label="R.R."
              stretch
              errorText={formErrors.resolucion_rectoral_creacion}
            >
              <Input
                placeholder="Escriba el n° de RR"
                value={formValues.resolucion_rectoral}
                onChange={({ detail }) =>
                  handleChange("resolucion_rectoral", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Fecha de R.R."
              stretch
              errorText={formErrors.resolucion_fecha}
            >
              <DatePicker
                placeholder="YYYY/MM/DD"
                value={formValues.resolucion_fecha}
                onChange={({ detail }) =>
                  handleChange("resolucion_fecha", detail.value)
                }
              />
            </FormField>
            <FormField
              label="R.D."
              stretch
              errorText={formErrors.resolucion_decanal}
            >
              <Input
                placeholder="Escriba el n° de RD"
                value={formValues.resolucion_decanal}
                onChange={({ detail }) =>
                  handleChange("resolucion_decanal", detail.value)
                }
              />
            </FormField>
          </ColumnLayout>
          <FormField
            label="Comentario"
            stretch
            errorText={formErrors.comentario}
          >
            <Textarea
              rows={3}
              value={formValues.comentario}
              onChange={({ detail }) =>
                handleChange("comentario", detail.value)
              }
            />
          </FormField>
          <FormField label="Estado" stretch errorText={formErrors.estado}>
            <Select
              options={optsEstado}
              selectedOption={formValues.estado}
              onChange={({ detail }) =>
                handleChange("estado", detail.selectedOption)
              }
            />
          </FormField>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
