import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField label="Programa del evento" stretch>
        <Tiptap value={value} handleChange={handleChange} name="infinal3" />
      </FormField>
    </Container>
  );
};
