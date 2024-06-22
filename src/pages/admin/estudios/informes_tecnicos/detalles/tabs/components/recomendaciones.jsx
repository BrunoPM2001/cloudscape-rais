import { Container, FormField, Textarea } from "@cloudscape-design/components";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField label="Recomendaciones" stretch>
        <Textarea
          value={value}
          onChange={({ detail }) =>
            handleChange("recomendacion_taller", detail.value)
          }
          rows={10}
        />
      </FormField>
    </Container>
  );
};
