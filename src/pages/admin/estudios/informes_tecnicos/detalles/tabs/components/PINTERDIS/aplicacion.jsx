import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField label="Aplicación práctica e impacto" stretch>
        <Tiptap value={value} handleChange={handleChange} name="infinal9" />
      </FormField>
    </Container>
  );
};
