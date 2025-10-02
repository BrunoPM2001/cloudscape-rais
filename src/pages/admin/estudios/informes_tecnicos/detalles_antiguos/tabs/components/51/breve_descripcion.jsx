import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField label="Breve descripción de avance de estudio" stretch>
        <Tiptap
          value={value}
          handleChange={handleChange}
          name="resumen_ejecutivo"
          disabled
          limitWords={200}
        />
      </FormField>
    </Container>
  );
};
