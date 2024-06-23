import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Impacto - uso"
        description="Indicar los resultados del uso del equipo/gabinete como: publicación, tesis o patente, incluir usos en colaboración y/o compartido"
        stretch
      >
        <Tiptap value={value} handleChange={handleChange} name="infinal5" />
      </FormField>
    </Container>
  );
};
