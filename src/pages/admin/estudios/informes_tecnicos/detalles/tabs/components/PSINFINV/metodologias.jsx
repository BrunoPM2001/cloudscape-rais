import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Metodologías y técnicas de investigación utilizadas"
        stretch
      >
        <Tiptap
          value={value}
          handleChange={handleChange}
          name="infinal2"
          limitWords={600}
        />
      </FormField>
    </Container>
  );
};
