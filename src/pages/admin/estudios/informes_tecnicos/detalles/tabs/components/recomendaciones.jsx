import { Container, FormField, Spinner } from "@cloudscape-design/components";
import Tiptap from "../../../../../components/tiptap";

export default ({ value, handleChange, loading }) => {
  return (
    <Container>
      <FormField label="Recomendaciones" stretch>
        {loading ? (
          <Spinner />
        ) : (
          <Tiptap
            value={value}
            handleChange={handleChange}
            name="recomendacion_taller"
          />
        )}
      </FormField>
    </Container>
  );
};
