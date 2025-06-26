import {
  Modal,
  FormField,
  Input,
  Box,
  SpaceBetween,
  Header,
  ColumnLayout,
  Button,
  DatePicker,
  Container,
  Select,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../hooks/useFormValidation";

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
];

const initialForm = {
  tipo: null,
  periodo: "",
  convocatoria: null,
  descripcion: "",
  fecha_inicio_registro: "",
  fecha_fin_registro: "",
  fecha_corte_registro: "",
  fecha_inicio_calendario: "",
  fecha_fin_calendario: "",
  fecha_inicio_evaluacion: "",
  fecha_fin_evaluacion: "",
};

const formRules = {
  tipo: { required: true },
  periodo: { required: true },
  convocatoria: { required: true },
  descripcion: { required: true },
  fecha_inicio_registro: { required: true },
  fecha_fin_registro: { required: true },
  fecha_corte_registro: { required: true },
  fecha_inicio_calendario: { required: true },
  fecha_fin_calendario: { required: true },
  fecha_inicio_evaluacion: { required: true },
  fecha_fin_evaluacion: { required: true },
};

const opt_convocatoria = [
  {
    label: "Sí",
    value: 1,
  },
  {
    label: "No",
    value: 0,
  },
];

export default ({ close, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [creating, setCreating] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const createConvocatoria = async () => {
    if (validateForm()) {
      setCreating(true);
      const response = await axiosBase.post(
        "admin/estudios/convocatorias/createConvocatoria",
        {
          tipo: formValues.tipo.value,
          descripcion: formValues.descripcion,
          periodo: formValues.periodo,
          convocatoria: formValues.convocatoria.value,
          fecha_inicio_registro: formValues.fecha_inicio_registro,
          fecha_fin_registro: formValues.fecha_fin_registro,
          fecha_corte_registro: formValues.fecha_corte_registro,
          fecha_inicio_calendario: formValues.fecha_inicio_calendario,
          fecha_fin_calendario: formValues.fecha_fin_calendario,
          fecha_inicio_evaluacion: formValues.fecha_inicio_evaluacion,
          fecha_fin_evaluacion: formValues.fecha_fin_evaluacion,
        }
      );
      const data = await response.data;
      setCreating(false);
      close();
      pushNotification(data.detail, data.message, notifications.length + 1);
      reload();
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
              loading={creating}
              onClick={createConvocatoria}
            >
              Crear convocatoria
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Crear convocatoria"
    >
      <SpaceBetween direction="vertical" size="s">
        <Container header={<Header variant="h3">Datos del Registro</Header>}>
          <SpaceBetween direction="vertical" size="s">
            <ColumnLayout columns={2}>
              <FormField
                label="Tipo de proyecto"
                errorText={formErrors.tipo}
                stretch
              >
                <Select
                  placeholder="Escoja una opción"
                  options={tipo_proyectos}
                  selectedOption={formValues.tipo}
                  onChange={({ detail }) =>
                    handleChange("tipo", detail.selectedOption)
                  }
                />
              </FormField>
              <FormField label="Año" errorText={formErrors.periodo} stretch>
                <Input
                  placeholder="Escriba el periodo de la convocatoria"
                  value={formValues.periodo}
                  onChange={({ detail }) =>
                    handleChange("periodo", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Convocatoria"
                errorText={formErrors.convocatoria}
                stretch
              >
                <Select
                  placeholder="Escoja una opción"
                  options={opt_convocatoria}
                  selectedOption={formValues.convocatoria}
                  onChange={({ detail }) =>
                    handleChange("convocatoria", detail.selectedOption)
                  }
                />
              </FormField>
              <FormField
                label="Fecha de inicio"
                errorText={formErrors.fecha_inicio_registro}
                stretch
              >
                <DatePicker
                  placeholder="YYYY/MM/DD"
                  value={formValues.fecha_inicio_registro}
                  onChange={({ detail }) =>
                    handleChange("fecha_inicio_registro", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Fecha fin"
                errorText={formErrors.fecha_fin_registro}
                stretch
              >
                <DatePicker
                  placeholder="YYYY/MM/DD"
                  value={formValues.fecha_fin_registro}
                  onChange={({ detail }) =>
                    handleChange("fecha_fin_registro", detail.value)
                  }
                />
              </FormField>
              <FormField
                label="Fecha de corte"
                errorText={formErrors.fecha_corte_registro}
                stretch
              >
                <DatePicker
                  placeholder="YYYY/MM/DD"
                  value={formValues.fecha_corte_registro}
                  onChange={({ detail }) =>
                    handleChange("fecha_corte_registro", detail.value)
                  }
                />
              </FormField>
            </ColumnLayout>
            <FormField
              label="Descripción"
              errorText={formErrors.descripcion}
              stretch
            >
              <Input
                value={formValues.descripcion}
                onChange={({ detail }) =>
                  handleChange("descripcion", detail.value)
                }
              />
            </FormField>
          </SpaceBetween>
        </Container>
        <Container header={<Header variant="h3">Datos de calendario</Header>}>
          <ColumnLayout columns={2}>
            <FormField
              label="Fecha de inicio"
              errorText={formErrors.fecha_inicio_calendario}
              stretch
            >
              <DatePicker
                placeholder="YYYY/MM/DD"
                value={formValues.fecha_inicio_calendario}
                onChange={({ detail }) =>
                  handleChange("fecha_inicio_calendario", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Fecha fin"
              errorText={formErrors.fecha_fin_calendario}
              stretch
            >
              <DatePicker
                placeholder="YYYY/MM/DD"
                value={formValues.fecha_fin_calendario}
                onChange={({ detail }) =>
                  handleChange("fecha_fin_calendario", detail.value)
                }
              />
            </FormField>
          </ColumnLayout>
        </Container>
        <Container header={<Header variant="h3">Datos de evaluación</Header>}>
          <ColumnLayout columns={2}>
            <FormField
              label="Fecha de inicio"
              errorText={formErrors.fecha_inicio_evaluacion}
              stretch
            >
              <DatePicker
                placeholder="YYYY/MM/DD"
                value={formValues.fecha_inicio_evaluacion}
                onChange={({ detail }) =>
                  handleChange("fecha_inicio_evaluacion", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Fecha fin"
              errorText={formErrors.fecha_fin_evaluacion}
              stretch
            >
              <DatePicker
                placeholder="YYYY/MM/DD"
                value={formValues.fecha_fin_evaluacion}
                onChange={({ detail }) =>
                  handleChange("fecha_fin_evaluacion", detail.value)
                }
              />
            </FormField>
          </ColumnLayout>
        </Container>
      </SpaceBetween>
    </Modal>
  );
};
