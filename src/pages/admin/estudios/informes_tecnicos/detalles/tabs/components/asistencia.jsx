import { Container, FormField, Textarea } from "@cloudscape-design/components";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Aistencia"
        description="Obligatoria para docentes a tiempo completo y dedicación exclusiva"
        stretch
      >
        <Textarea
          value={value}
          onChange={({ detail }) =>
            handleChange("asistencia_taller", detail.value)
          }
          rows={10}
        />
      </FormField>
    </Container>
  );
};
