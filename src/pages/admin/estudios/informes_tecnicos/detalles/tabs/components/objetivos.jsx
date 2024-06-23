import { Container, FormField, Spinner } from "@cloudscape-design/components";
import Tiptap from "../../../../../components/tiptap";

export default ({ value, handleChange, loading }) => {
  return (
    <Container>
      <FormField label="Objetivos y metas del taller que se alcanzaron" stretch>
        {loading ? (
          <Spinner />
        ) : (
          <Tiptap
            value={value}
            handleChange={handleChange}
            name="objetivos_taller"
          />
        )}
      </FormField>
    </Container>
  );
};
