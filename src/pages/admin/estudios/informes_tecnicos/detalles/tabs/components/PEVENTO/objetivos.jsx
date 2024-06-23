import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField label="Objetivos y metas" stretch>
        <Tiptap value={value} handleChange={handleChange} name="infinal1" />
      </FormField>
    </Container>
  );
};
