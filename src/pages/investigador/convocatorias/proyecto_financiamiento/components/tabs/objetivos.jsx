import { Container, FormField, Textarea } from "@cloudscape-design/components";

export default ({ value, error, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Objetivos"
        description="Indique el objetivo general y los específicos que espera alcanzar. (Máximo 200 palabras)"
        errorText={error}
        stretch
      >
        <Textarea
          rows={10}
          placeholder="Escriba lo necesario"
          value={value}
          onChange={({ detail }) => handleChange("objetivos", detail.value)}
        />
      </FormField>
    </Container>
  );
};
