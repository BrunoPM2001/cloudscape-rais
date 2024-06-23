import { Container, FormField, Input } from "@cloudscape-design/components";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField label="Reporte de n° de meses de avance" stretch>
        <Input
          value={value}
          type="number"
          onChange={({ detail }) => handleChange("infinal6", detail.value)}
        />
      </FormField>
    </Container>
  );
};
