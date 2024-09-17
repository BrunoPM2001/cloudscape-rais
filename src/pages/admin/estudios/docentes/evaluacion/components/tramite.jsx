import {
  Box,
  Button,
  ColumnLayout,
  Container,
  FormField,
  Header,
  Select,
  SpaceBetween,
  Textarea,
} from "@cloudscape-design/components";
import { useState } from "react";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";

const opt_confirmar = [
  { value: 1, label: "Sí" },
  { value: 0, label: "No" },
];

const opt_norma = [
  { value: "R.R. 009077-2024-R (Directiva 2024)" },
  { value: "R.R. 006682-2023-R (Directiva 2023)" },
];

const initialForm = {
  confirmar: null,
  descripcion: "",
};

const formRules = {
  confirmar: { required: true },
};

export default ({ id, data, reload }) => {
  //  States
  const [loading, setLoading] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const evaluar = async () => {
    if (validateForm()) {
      setLoading(true);
      const res = await axiosBase.put("admin/estudios/docentes/tramite", {
        ...formValues,
        id,
      });
      const data = res.data;
      setLoading(false);
      reload();
    }
  };

  const ficha = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/docentes/fichaEvaluacion", {
      params: {
        id,
      },
      responseType: "blob",
    });
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoading(false);
  };

  const constanciaNoFirmada = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/docentes/constanciaCDI", {
      params: {
        id,
      },
      responseType: "blob",
    });
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoading(false);
  };

  return (
    <Container
      header={
        <Header
          variant="h3"
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              {data.confirmar != null && (
                <Button
                  onClick={constanciaNoFirmada}
                  loading={loading}
                  iconName="file"
                >
                  Constancia no firmada
                </Button>
              )}
              <Button onClick={ficha} loading={loading} iconName="file-open">
                Ficha de evaluación
              </Button>
              <Button variant="primary" loading={loading} onClick={evaluar}>
                Guardar
              </Button>
            </SpaceBetween>
          }
        >
          Evaluación
        </Header>
      }
    >
      <ColumnLayout columns={2}>
        <ColumnLayout columns={2}>
          <div>
            <Box variant="awsui-key-label">Califica como</Box>
            <div>DOCENTE INVESTIGADOR</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Evaluación técnica</Box>
            <div>{data.estado_tecnico}</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Autoridad</Box>
            <div>DEI</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Confirmar constancia</Box>
            <div>{data.confirmar == 1 ? "Sí" : "No"}</div>
          </div>
        </ColumnLayout>
        <SpaceBetween size="s">
          <ColumnLayout columns={2}>
            <FormField
              label="Confirmar evaluación"
              errorText={formErrors.confirmar}
              stretch
            >
              <Select
                placeholder="Escoja una opción"
                options={opt_confirmar}
                selectedOption={formValues.confirmar}
                onChange={({ detail }) =>
                  handleChange("confirmar", detail.selectedOption)
                }
              />
            </FormField>
            <FormField
              label="Normativa de evaluación"
              errorText={formErrors.norma}
              stretch
            >
              <Select
                placeholder="Escoja una opción"
                options={opt_norma}
                selectedOption={formValues.norma}
                onChange={({ detail }) =>
                  handleChange("norma", detail.selectedOption)
                }
              />
            </FormField>
          </ColumnLayout>
          <FormField label="Descripción" stretch>
            <Textarea
              value={formValues.descripcion}
              onChange={({ detail }) =>
                handleChange("descripcion", detail.value)
              }
            />
          </FormField>
        </SpaceBetween>
      </ColumnLayout>
    </Container>
  );
};
