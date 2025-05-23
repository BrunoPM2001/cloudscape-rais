import {
  Box,
  Button,
  FormField,
  Input,
  Modal,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import axiosBase from "../../../../../api/axios";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import NotificationContext from "../../../../../providers/notificationProvider";

const opt_publicaciones = [
  { value: "articulo", label: "Artículo" },
  { value: "capitulo", label: "Capítulo" },
  { value: "evento", label: "R. en evento científico" },
  { value: "libro", label: "Libro" },
  { value: "tesis", label: "Tesis propia" },
  { value: "tesis-asesoria", label: "Tesis asesoria" },
  { value: "patente", label: "Patente" },
];

const initialForm = {
  tipo_publicacion: null,
  cantidad: 0,
};

const formRules = {
  tipo_publicacion: { required: true },
  cantidad: { required: true },
};

export default ({ close, reload, id }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const agregar = async () => {
    if (validateForm()) {
      setLoading(true);
      const res = await axiosBase.post("admin/estudios/monitoreo/agregarMeta", {
        meta_tipo_proyecto_id: id,
        tipo_publicacion: formValues.tipo_publicacion.value,
        cantidad: formValues.cantidad,
      });
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      setLoading(false);
      close();
      reload();
    }
  };

  return (
    <Modal
      visible
      onDismiss={close}
      size="medium"
      header="Agregar meta"
      footer={
        <Box float="right">
          <SpaceBetween size="xs" direction="horizontal">
            <Button onClick={close}>Cerrar</Button>
            <Button variant="primary" loading={loading} onClick={agregar}>
              Agregar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m">
        <FormField
          label="Tipo de publicacion"
          errorText={formErrors.tipo_publicacion}
          stretch
        >
          <Select
            placeholder="Escoja una opción"
            selectedOption={formValues.tipo_publicacion}
            onChange={({ detail }) =>
              handleChange("tipo_publicacion", detail.selectedOption)
            }
            options={opt_publicaciones}
          />
        </FormField>
        <FormField label="Cantidad" errorText={formErrors.cantidad} stretch>
          <Input
            type="number"
            value={formValues.cantidad}
            onChange={({ detail }) => handleChange("cantidad", detail.value)}
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
