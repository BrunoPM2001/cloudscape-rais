import {
  Modal,
  FormField,
  Input,
  Box,
  SpaceBetween,
  Header,
  ColumnLayout,
  Button,
  Container,
  Select,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
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

const periodos = [{ value: "2023" }, { value: "2024" }, { value: "2025" }];

const initialForm = {
  tipo: null,
  periodo: "2024",
  copiar: { value: "No" },
  proyecto_copia: null,
};

const formRules = {
  tipo: { required: true },
  periodo: { required: true },
  copiar: { required: true },
};

export default ({ visible, setVisible, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [proyectosCopia, setProyectosCopia] = useState([]);
  const [err, setErr] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, {
      ...formRules,
    });

  //  Functions
  const create = async () => {
    if (validateForm()) {
      if (validCopy()) {
        setCreating(true);
        const response = await axiosBase.post(
          "admin/estudios/convocatorias/createEvaluacion",
          formValues
        );
        const data = await response.data;
        setCreating(false);
        setVisible(false);
        pushNotification(data.detail, data.message, notifications.length + 1);
        reload();
      }
    }
  };

  const validCopy = () => {
    if (formValues.copiar.value == "Sí") {
      if (formValues.proyecto_copia == null) {
        setErr(true);
        return false;
      }
    }
    setErr(false);
    return true;
  };

  const listadoProyectosCopia = async () => {
    const res = await axiosBase.get(
      "admin/estudios/convocatorias/listadoProyectosCopia"
    );
    const data = res.data;
    setProyectosCopia(data);
    setLoading(false);
  };

  useEffect(() => {
    listadoProyectosCopia();
  }, []);

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button variant="primary" loading={creating} onClick={create}>
              Agregar evaluación
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Crear convocatoria"
    >
      <SpaceBetween direction="vertical" size="s">
        <Container header={<Header variant="h3">Datos del template</Header>}>
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
                // disabled
                value={formValues.periodo}
                onChange={({ detail }) => handleChange("periodo", detail.value)}
              />
            </FormField>
          </ColumnLayout>
        </Container>
        <Container header={<Header variant="h3">Criterios</Header>}>
          <SpaceBetween size="s">
            <FormField
              label="Copiar los criterios de otro proyecto y periodo"
              errorText={formErrors.copiar}
              stretch
            >
              <Select
                selectedOption={formValues.copiar}
                onChange={({ detail }) =>
                  handleChange("copiar", detail.selectedOption)
                }
                options={[{ value: "Sí" }, { value: "No" }]}
              />
            </FormField>
            {formValues.copiar?.value == "Sí" && (
              <FormField
                label="Proyecto a copiar"
                errorText={err && "Campo requerido"}
                stretch
              >
                <Select
                  options={proyectosCopia}
                  statusType={loading ? "loading" : "finished"}
                  placeholder="Escoja un periodo"
                  selectedOption={formValues.proyecto_copia}
                  onChange={({ detail }) =>
                    handleChange("proyecto_copia", detail.selectedOption)
                  }
                />
              </FormField>
            )}
          </SpaceBetween>
        </Container>
      </SpaceBetween>
    </Modal>
  );
};
