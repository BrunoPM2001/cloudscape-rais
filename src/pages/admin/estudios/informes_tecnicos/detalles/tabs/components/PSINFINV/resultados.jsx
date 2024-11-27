import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Resultados"
        description="Capítulos, títulos y/o subtítulos según corresponda"
        stretch
      >
        <Tiptap
          value={value}
          handleChange={handleChange}
          name="infinal3"
          limitWords={2000}
        />
      </FormField>
    </Container>
  );
};
