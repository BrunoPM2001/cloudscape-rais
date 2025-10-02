import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField label="Resultados finales" stretch>
        <Tiptap value={value} handleChange={handleChange} name="actividades2" />
      </FormField>
    </Container>
  );
};
