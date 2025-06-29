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
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import NotificationContext from "../../../../../providers/notificationProvider";
import Tiptap from "../../../components/tiptap";

const initialForm = {
  opcion: "",
  puntaje_max: "",
  nivel: { value: 1, label: "Criterio" },
  periodo: "2025",
  editable: { value: 1, label: "Sí" },
  otipo: { value: null, label: "Ninguna" },
  puntos_adicionales: "",
};

const formRules = {
  opcion: { required: true },
  puntaje_max: { required: true },
  nivel: { required: true },
  periodo: { required: true },
  editable: { required: true },
  otipo: { required: true },
};

export default ({ close, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [creating, setCreating] = useState(false);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const create = async () => {
    if (validateForm()) {
      setCreating(true);
      const res = await axiosBase.post(
        "admin/estudios/convocatorias/createCriterio",
        { ...formValues, id }
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
              Agregar criterio
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Agregar criterio"
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
            options={[
              { value: 1, label: "Criterio" },
              { value: 2, label: "Título" },
            ]}
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
            options={[
              { value: 1, label: "Sí" },
              { value: 0, label: "No" },
            ]}
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
            options={[
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
            ]}
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
