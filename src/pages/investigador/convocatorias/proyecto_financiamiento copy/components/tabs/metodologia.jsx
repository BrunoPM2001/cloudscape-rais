import { Container, FormField, Textarea } from "@cloudscape-design/components";

export default ({ value, error, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Metodología"
        description="Diseño de la investigación, método y técnicas a ser utilizadas, etapas del estudio."
        errorText={error}
        stretch
      >
        <Textarea
          rows={10}
          placeholder="Escriba lo necesario"
          value={value}
          onChange={({ detail }) => handleChange("metodologia", detail.value)}
        />
      </FormField>
    </Container>
  );
};
