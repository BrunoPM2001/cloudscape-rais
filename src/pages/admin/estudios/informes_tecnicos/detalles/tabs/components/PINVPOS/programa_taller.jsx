import {
  Container,
  DatePicker,
  FormField,
  SpaceBetween,
} from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

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
          <Tiptap
            value={value2}
            handleChange={handleChange}
            name="propuestas_taller"
          />
        </FormField>
      </SpaceBetween>
    </Container>
  );
};
