import {
  Button,
  Container,
  FormField,
  Header,
  Input,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useState } from "react";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";

const opt_tecnica = [
  { value: "En trámite", label: "Aprobado" },
  { value: "No aprobado", label: "No aprobado" },
];

const initialForm = {
  estado_tecnico: null,
  autoridad: "DEI",
};

const formRules = {
  estado_tecnico: { required: true },
};

export default ({ id, reload }) => {
  //  States
  const [loading, setLoading] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const evaluar = async () => {
    if (validateForm()) {
      setLoading(true);
      const res = await axiosBase.put("admin/estudios/docentes/evaluar", {
        ...formValues,
        id,
      });
      const data = res.data;
      setLoading(false);
      reload();
    }
  };

  return (
    <Container
      header={
        <Header
          variant="h3"
          actions={
            <Button variant="primary" loading={loading} onClick={evaluar}>
              Iniciar evaluación
            </Button>
          }
        >
          Calificar
        </Header>
      }
    >
      <SpaceBetween size="s">
        <FormField
          label="Evaluación técnica"
          errorText={formErrors.estado_tecnico}
          stretch
        >
          <Select
            placeholder="Escoja una opción"
            options={opt_tecnica}
            selectedOption={formValues.estado_tecnico}
            onChange={({ detail }) =>
              handleChange("estado_tecnico", detail.selectedOption)
            }
          />
        </FormField>
        <FormField label="Autoridad" stretch>
          <Input value={formValues.autoridad} disabled />
        </FormField>
      </SpaceBetween>
    </Container>
  );
};
