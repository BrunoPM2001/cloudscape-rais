import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Gestión del uso"
        description="Descripción detallada de la gestión del uso del equipo/gabinete"
        stretch
      >
        <Tiptap value={value} handleChange={handleChange} name="infinal3" />
      </FormField>
    </Container>
  );
};
