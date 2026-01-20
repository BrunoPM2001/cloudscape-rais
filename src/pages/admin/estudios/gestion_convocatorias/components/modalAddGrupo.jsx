import {
  Box,
  Button,
  ColumnLayout,
  FormField,
  Input,
  Modal,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";

const tipo_proyectos = [
  { value: "ECI" },
  { value: "PCONFIGI" },
  { value: "PCONFIGI-INV" },
  { value: "PEVENTO" },
  { value: "PINTERDIS" },
  { value: "PINVPOS" },
  { value: "PMULTI" },
  { value: "PRO-CTIE" },
  { value: "PSINFINV" },
  { value: "PSINFIPU" },
  { value: "PTPBACHILLER" },
  { value: "PTPDOCTO" },
  { value: "PTPGRADO" },
  { value: "PTPMAEST" },
  { value: "RFPLU" },
  { value: "SPINOFF" },
  { value: "GRUPO" },
  { value: "PICV" },
];

const initialForm = {
  nombre: "",
  tipo_proyecto: null,
  monto_max: 0,
};

const formRules = {
  nombre: { required: true },
  tipo_proyecto: { required: true },
  monto_max: { required: true },
};

export default ({ close, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [creating, setCreating] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const create = async () => {
    if (validateForm()) {
      setCreating(true);
      const res = await axiosBase.post(
        "admin/estudios/convocatorias/addGrupo",
        {
          nombre: formValues.nombre,
          tipo_proyecto: formValues.tipo_proyecto.value,
          monto_max: formValues.monto_max,
        }
      );
      const data = res.data;
      setCreating(false);
      pushNotification(data.detail, data.message, notifications.length + 1);
      reload();
      close();
    }
  };

  return (
    <Modal
      visible
      onDismiss={close}
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" loading={creating} onClick={create}>
              Agregar grupo
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Creación de grupo"
    >
      <SpaceBetween size="m">
        <FormField
          label="Tipo de proyecto"
          errorText={formErrors.tipo_proyecto}
          stretch
        >
          <Select
            placeholder="Escoja una opción"
            selectedOption={formValues.tipo_proyecto}
            onChange={({ detail }) =>
              handleChange("tipo_proyecto", detail.selectedOption)
            }
            options={tipo_proyectos}
          />
        </FormField>
        <FormField label="Nombre" errorText={formErrors.nombre} stretch>
          <Input
            value={formValues.nombre}
            onChange={({ detail }) => handleChange("nombre", detail.value)}
          />
        </FormField>
        <FormField
          label="Monto máximo"
          errorText={formErrors.monto_max}
          stretch
        >
          <Input
            type="number"
            value={formValues.monto_max}
            onChange={({ detail }) => handleChange("monto_max", detail.value)}
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
