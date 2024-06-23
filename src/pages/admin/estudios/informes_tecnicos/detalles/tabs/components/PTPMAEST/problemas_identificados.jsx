import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField label="Problemas identificados" stretch>
        <Tiptap value={value} handleChange={handleChange} name="infinal2" />
      </FormField>
    </Container>
  );
};
