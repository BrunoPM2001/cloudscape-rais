import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField label="Conclusiones" stretch>
        <Tiptap
          value={value}
          handleChange={handleChange}
          name="conclusion_taller"
        />
      </FormField>
    </Container>
  );
};
