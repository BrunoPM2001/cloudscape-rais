import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Asistencia"
        description="Obligatoria para docentes a tiempo completo y dedicación exclusiva"
        stretch
      >
        <Tiptap
          value={value}
          handleChange={handleChange}
          name="asistencia_taller"
        />
      </FormField>
    </Container>
  );
};
