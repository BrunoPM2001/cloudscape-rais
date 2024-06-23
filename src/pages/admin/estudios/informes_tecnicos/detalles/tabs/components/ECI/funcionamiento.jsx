import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Funcionamiento"
        description="Describir la situación actual del funcionamiento"
        stretch
      >
        <Tiptap value={value} handleChange={handleChange} name="infinal2" />
      </FormField>
    </Container>
  );
};
