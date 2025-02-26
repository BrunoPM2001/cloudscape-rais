import { Container, FormField, Input } from "@cloudscape-design/components";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Porcentaje estimado de avance técnico académico"
        stretch
      >
        <Input
          value={value}
          onChange={({ detail }) => handleChange("infinal7", detail.value)}
        />
      </FormField>
    </Container>
  );
};
