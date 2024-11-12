import { Container, FormField, Input } from "@cloudscape-design/components";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Palabras clave"
        description="Separadas por comas"
        stretch
      >
        <Input
          value={value}
          onChange={({ detail }) =>
            handleChange("palabras_clave", detail.value)
          }
        />
      </FormField>
    </Container>
  );
};
