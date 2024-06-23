import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField label="Conclusiones y recomendaciones" stretch>
        <Tiptap value={value} handleChange={handleChange} name="infinal5" />
      </FormField>
    </Container>
  );
};
