import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Resultados indirectos"
        description="Completar en caso sea el informe final"
        stretch
      >
        <Tiptap value={value} handleChange={handleChange} name="infinal1" />
      </FormField>
    </Container>
  );
};
