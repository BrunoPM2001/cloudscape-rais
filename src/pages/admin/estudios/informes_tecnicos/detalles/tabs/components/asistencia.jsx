import { Container, FormField, Spinner } from "@cloudscape-design/components";
import Tiptap from "../../../../../components/tiptap";

export default ({ value, handleChange, loading }) => {
  return (
    <Container>
      <FormField
        label="Aistencia"
        description="Obligatoria para docentes a tiempo completo y dedicación exclusiva"
        stretch
      >
        {loading ? (
          <Spinner />
        ) : (
          <Tiptap
            value={value}
            handleChange={handleChange}
            name="asistencia_taller"
          />
        )}
      </FormField>
    </Container>
  );
};
