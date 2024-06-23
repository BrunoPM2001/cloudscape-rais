import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Acciones tomadas"
        description="Solo llenar en caso de ser un trabajo inconcluso"
        stretch
      >
        <Tiptap value={value} handleChange={handleChange} name="infinal4" />
      </FormField>
    </Container>
  );
};
