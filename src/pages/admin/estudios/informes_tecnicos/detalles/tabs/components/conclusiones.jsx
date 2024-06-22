import { Container, FormField, Textarea } from "@cloudscape-design/components";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField label="Conclusiones" stretch>
        <Textarea
          value={value}
          onChange={({ detail }) =>
            handleChange("conclusion_taller", detail.value)
          }
          rows={10}
        />
      </FormField>
    </Container>
  );
};
