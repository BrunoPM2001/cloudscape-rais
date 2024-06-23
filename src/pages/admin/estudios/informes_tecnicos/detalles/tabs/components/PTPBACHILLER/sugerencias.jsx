import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Sugerencias"
        description="Solo llenar en caso de ser un trabajo inconcluso"
        stretch
      >
        <Tiptap value={value} handleChange={handleChange} name="infinal5" />
      </FormField>
    </Container>
  );
};
