import { Container, FormField, Textarea } from "@cloudscape-design/components";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField label="Objetivos y metas del taller que se alcanzaron" stretch>
        <Textarea
          value={value}
          onChange={({ detail }) =>
            handleChange("objetivos_taller", detail.value)
          }
          rows={10}
        />
      </FormField>
    </Container>
  );
};
