import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Button,
  Select,
  Input,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../api/axios";

const formRules = {
  condicion: { required: true },
};

export default ({ item, reload, close }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(
      {
        nombres: item.nombres,
        condicion: { value: item.condicion },
      },
      formRules
    );

  //  Functions
  const actualizarAutor = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      const res = await axiosBase.put("admin/estudios/patentes/editarAutor", {
        id: item.id,
        condicion: formValues.condicion.value,
      });
      const data = res.data;
      setLoadingCreate(false);
      close();
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

  return (
    <Modal
      visible
      size="medium"
      onDismiss={close}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={actualizarAutor}
              loading={loadingCreate}
            >
              Guardar cambios
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Editar autor"
    >
      <SpaceBetween direction="vertical" size="s">
        <FormField label="Nombre" stretch>
          <Input value={formValues.nombres} readOnly />
        </FormField>
        <FormField label="Condición" stretch errorText={formErrors.condicion}>
          <Select
            placeholder="Escoja una opción"
            selectedOption={formValues.condicion}
            onChange={({ detail }) => {
              handleChange("condicion", detail.selectedOption);
            }}
            options={[{ value: "Autor" }, { value: "Inventor" }]}
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
