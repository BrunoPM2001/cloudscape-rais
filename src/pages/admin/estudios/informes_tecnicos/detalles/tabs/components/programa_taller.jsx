import {
  Container,
  DatePicker,
  FormField,
  SpaceBetween,
  Textarea,
} from "@cloudscape-design/components";

export default ({ value1, value2, handleChange }) => {
  return (
    <Container>
      <SpaceBetween size="m">
        <FormField label="Fecha del evento" stretch>
          <DatePicker
            placeholder="YYYY-MM-DD"
            value={value1 ?? ""}
            onChange={({ detail }) =>
              handleChange("fecha_evento", detail.value)
            }
          />
        </FormField>
        <FormField
          label="Programa del taller"
          description="Indicar al detalle las actividades programadas/realizadas"
          stretch
        >
          <Textarea
            value={value2}
            onChange={({ detail }) =>
              handleChange("propuestas_taller", detail.value)
            }
            rows={10}
          />
        </FormField>
      </SpaceBetween>
    </Container>
  );
};
