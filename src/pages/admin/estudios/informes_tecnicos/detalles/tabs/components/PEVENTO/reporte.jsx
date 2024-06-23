import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField label="Reporte de asistencias" stretch>
        <Tiptap value={value} handleChange={handleChange} name="infinal6" />
      </FormField>
    </Container>
  );
};
