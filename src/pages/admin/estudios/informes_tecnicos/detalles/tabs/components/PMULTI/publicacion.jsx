import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField label="Publicación" stretch>
        <Tiptap value={value} handleChange={handleChange} name="infinal10" />
      </FormField>
    </Container>
  );
};
