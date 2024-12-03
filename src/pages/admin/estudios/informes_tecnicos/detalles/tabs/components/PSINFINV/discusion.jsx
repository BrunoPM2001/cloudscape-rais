import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField label="Discusión" stretch>
        <Tiptap
          value={value}
          handleChange={handleChange}
          name="infinal4"
          limitWords={600}
        />
      </FormField>
    </Container>
  );
};
