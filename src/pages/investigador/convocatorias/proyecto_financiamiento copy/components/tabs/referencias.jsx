import { Container, FormField, Textarea } from "@cloudscape-design/components";

export default ({ value, error, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Referencias bibliográficas"
        description="Ordenadas en función a algún sistema internacionalmente reconocido como: Vancouver, APA o Council of Science Editors (CSE)."
        errorText={error}
        stretch
      >
        <Textarea
          rows={10}
          placeholder="Escriba lo necesario"
          value={value}
          onChange={({ detail }) => handleChange("referencias", detail.value)}
        />
      </FormField>
    </Container>
  );
};
