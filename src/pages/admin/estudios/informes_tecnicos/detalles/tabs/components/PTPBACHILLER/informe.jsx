import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField label="Informe de trabajo de investigación" stretch>
        <Tiptap value={value} handleChange={handleChange} name="infinal10" />
      </FormField>
    </Container>
  );
};
