import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Aplicación práctica e impacto"
        description="Señale las aplicaciones más importantes, el aporte o conclusión principal e impacto para la sociedad"
        stretch
      >
        <Tiptap value={value} handleChange={handleChange} name="infinal4" />
      </FormField>
    </Container>
  );
};
