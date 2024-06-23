import { Container, FormField, Spinner } from "@cloudscape-design/components";
import Tiptap from "../../../../../components/tiptap";

export default ({ value, handleChange, loading }) => {
  return (
    <Container>
      <FormField label="Conclusiones" stretch>
        {loading ? (
          <Spinner />
        ) : (
          <Tiptap
            value={value}
            handleChange={handleChange}
            name="conclusion_taller"
          />
        )}
      </FormField>
    </Container>
  );
};
