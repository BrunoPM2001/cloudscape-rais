import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Impacto"
        description="Señale el aporte e impacto para la sociedad de la publicación"
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
