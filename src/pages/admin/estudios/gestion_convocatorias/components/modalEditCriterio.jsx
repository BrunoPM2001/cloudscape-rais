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
import { useContext, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";
import Tiptap from "../../../components/tiptap";

const opt_nivel = [
  { value: 1, label: "Criterio" },
  { value: 2, label: "Título" },
];

const opt_editable = [
  { value: 1, label: "Sí" },
  { value: 0, label: "No" },
];

const opt_otipo = [
  { value: "ninguna", label: "Ninguna" },
  { value: "regina", label: "Regina" },
  { value: "experiencia", label: "Experiencia" },
  { value: "catgi", label: "Categoría GI" },
  { value: "docnvos", label: "Docentes Nuevos" },
  { value: "sede", label: "Sede de Proyecto" },
  { value: "presupuesto_eci", label: "Presupuesto ECI" },
  { value: "experiencia_gi", label: "Experiencia de grupo" },
  {
    value: "integrante_formacion_post",
    label: "Integrante formación post",
  },
  {
    value: "integrante_formacion_pre",
    label: "Integrante formación pre",
  },
];

const formRules = {
  opcion: { required: true },
  puntaje_max: { required: true },
  nivel: { required: true },
  periodo: { required: true },
  editable: { required: true },
  otipo: { required: true },
};

export default ({ close, reload, data }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [creating, setCreating] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(
      {
        ...data,
        nivel: opt_nivel.find((opt) => opt.value == data.nivel),
        editable: opt_editable.find((opt) => opt.label == data.editable),
        otipo: opt_otipo.find((opt) => opt.value == data.otipo),
      },
      formRules
    );

  //  Functions
  const update = async () => {
    if (validateForm()) {
      setCreating(true);
      const res = await axiosBase.put(
        "admin/estudios/convocatorias/editCriterio",
        { ...formValues, id: data.id }
      );
      const data1 = res.data;
      setCreating(false);
      pushNotification(data1.detail, data1.message, notifications.length + 1);
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
            <Button variant="primary" loading={creating} onClick={update}>
              Actualizar criterio
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Actualizar criterio"
    >
      <FormField label="Opción" errorText={formErrors.opcion} stretch>
        <Tiptap
          name="opcion"
          value={formValues.opcion}
          handleChange={handleChange}
          limitWords={100}
        />
      </FormField>
      <ColumnLayout columns={2}>
        <FormField
          label="Puntaje máx"
          errorText={formErrors.puntaje_max}
          stretch
        >
          <Input
            type="number"
            value={formValues.puntaje_max}
            onChange={({ detail }) => handleChange("puntaje_max", detail.value)}
          />
        </FormField>
        <FormField
          label="Tipo de criterio"
          errorText={formErrors.nivel}
          stretch
        >
          <Select
            options={opt_nivel}
            selectedOption={formValues.nivel}
            onChange={({ detail }) =>
              handleChange("nivel", detail.selectedOption)
            }
          />
        </FormField>
        <FormField label="Periodo" errorText={formErrors.periodo} stretch>
          <Input disabled value={formValues.periodo} />
        </FormField>
        <FormField label="Editable" errorText={formErrors.editable} stretch>
          <Select
            options={opt_editable}
            selectedOption={formValues.editable}
            onChange={({ detail }) =>
              handleChange("editable", detail.selectedOption)
            }
          />
        </FormField>
        <FormField
          label="Tipo de restricción"
          errorText={formErrors.otipo}
          stretch
        >
          <Select
            options={opt_otipo}
            selectedOption={formValues.otipo}
            onChange={({ detail }) =>
              handleChange("otipo", detail.selectedOption)
            }
          />
        </FormField>
        <FormField
          label="Puntos adicionales"
          errorText={formErrors.puntos_adicionales}
          stretch
        >
          <Input
            type="number"
            value={formValues.puntos_adicionales}
            onChange={({ detail }) =>
              handleChange("puntos_adicionales", detail.value)
            }
          />
        </FormField>
      </ColumnLayout>
    </Modal>
  );
};
