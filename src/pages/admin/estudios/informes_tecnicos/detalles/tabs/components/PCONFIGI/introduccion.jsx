import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Introducción"
        description="Importancia de los resultados de la investigación"
        stretch
      >
        <Tiptap
          value={value}
          handleChange={handleChange}
          name="infinal1"
          limitWords={600}
        />
      </FormField>
    </Container>
  );
};
