import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Resumen"
        description="Breve descripción del estudio (no más de 200 palabras)"
        stretch
      >
        <Tiptap
          value={value}
          handleChange={handleChange}
          name="resumen_ejecutivo"
          limitWords={200}
        />
      </FormField>
    </Container>
  );
};
