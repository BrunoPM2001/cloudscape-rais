import { Container, FormField, Select } from "@cloudscape-design/components";
import { useEffect } from "react";

const opts = [
  { value: "Trabajo de investigación concluido y aprobado" },
  { value: "Trabajo de investigación concluido y pendiente de aprobación" },
  {
    value:
      "Trabajo de investigación inconcluso, pero data o información completa",
  },
  {
    value: "Trabajo de investigación inconcluso, Data o información incompleta",
  },
  { value: "Trabajo de investigación inconcluso, Abandono del estudiante" },
];

export default ({ value, handleChange }) => {
  useEffect(() => {
    handleChange(
      "estado_trabajo",
      opts.find((opt) => opt.value == value)
    );
  }, []);

  return (
    <Container>
      <FormField label="Producto de investigación" stretch>
        <Select
          options={opts}
          selectedOption={value}
          onChange={({ detail }) =>
            handleChange("estado_trabajo", detail.selectedOption)
          }
        />
      </FormField>
    </Container>
  );
};
