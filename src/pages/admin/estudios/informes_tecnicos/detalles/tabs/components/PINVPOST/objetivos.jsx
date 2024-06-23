import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField label="Objetivos y metas del taller que se alcanzaron" stretch>
        <Tiptap
          value={value}
          handleChange={handleChange}
          name="objetivos_taller"
        />
      </FormField>
    </Container>
  );
};
