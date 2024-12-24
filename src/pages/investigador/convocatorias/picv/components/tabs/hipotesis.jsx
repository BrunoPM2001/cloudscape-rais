import { Container, FormField, Textarea } from "@cloudscape-design/components";

export default ({ value, error, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Hipótesis"
        description="Clara y coherente con el problema central. (Máximo 200 palabras)"
        errorText={error}
        stretch
      >
        <Textarea
          rows={10}
          placeholder="Escriba lo necesario"
          value={value}
          onChange={({ detail }) => handleChange("hipotesis", detail.value)}
        />
      </FormField>
    </Container>
  );
};
