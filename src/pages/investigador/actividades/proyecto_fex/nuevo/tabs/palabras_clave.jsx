import { Container, FormField, Input } from "@cloudscape-design/components";

export default ({ value, error, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Palabras clave"
        description="Escriba las palabras clave separadas por coma (,)"
        stretch
        errorText={error}
      >
        <Input
          placeholder="Escriba las palabras clave de su publicación"
          value={value}
          onChange={({ detail }) => {
            handleChange("palabras_clave", detail.value);
          }}
        />
      </FormField>
    </Container>
  );
};
