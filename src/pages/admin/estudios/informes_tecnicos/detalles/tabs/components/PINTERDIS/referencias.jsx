import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField label="Referencias bibliográficas" stretch>
        <Tiptap
          value={value}
          handleChange={handleChange}
          name="infinal7"
          limitWords={2000}
        />
      </FormField>
    </Container>
  );
};
