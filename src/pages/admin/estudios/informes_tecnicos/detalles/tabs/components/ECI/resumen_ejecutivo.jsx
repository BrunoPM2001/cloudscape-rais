import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Resumen"
        description="Breve descripción de los equipos/gabinetes adquiridos"
        stretch
      >
        <Tiptap
          value={value}
          handleChange={handleChange}
          name="resumen_ejecutivo"
        />
      </FormField>
    </Container>
  );
};
