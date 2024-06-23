import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Descripción del problema"
        description="Solo llenar en caso de ser un trabajo inconcluso"
        stretch
      >
        <Tiptap value={value} handleChange={handleChange} name="infinal3" />
      </FormField>
    </Container>
  );
};
