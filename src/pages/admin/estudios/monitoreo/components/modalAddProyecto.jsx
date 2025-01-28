import {
  Box,
  Button,
  FormField,
  Modal,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import axiosBase from "../../../../../api/axios";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import NotificationContext from "../../../../../providers/notificationProvider";

const opt_proyectos = [
  { value: "ECI" },
  { value: "PCONFIGI" },
  { value: "PCONFIGI-INV" },
  { value: "PEVENTO" },
  { value: "PFEX" },
  { value: "PINTERDIS" },
  { value: "PINVPOS" },
  { value: "PMULTI" },
  { value: "PSINFINV" },
  { value: "PSINFIPU" },
  { value: "PTPDOCTO" },
  { value: "PTPGRADO" },
  { value: "PTPMAEST" },
];

const initialForm = {
  tipo_proyecto: null,
};

const formRules = {
  tipo_proyecto: { required: true },
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
      const res = await axiosBase.post(
        "admin/estudios/monitoreo/agregarProyecto",
        {
          meta_periodo_id: id,
          tipo_proyecto: formValues.tipo_proyecto.value,
        }
      );
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
      header="Agregar tipo de proyecto"
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
      <FormField
        label="Tipo de proyecto"
        errorText={formErrors.periodo}
        stretch
      >
        <Select
          placeholder="Escoja una opción"
          selectedOption={formValues.tipo_proyecto}
          onChange={({ detail }) =>
            handleChange("tipo_proyecto", detail.selectedOption)
          }
          options={opt_proyectos}
        />
      </FormField>
    </Modal>
  );
};
