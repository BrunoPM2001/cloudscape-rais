import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Actividades profesores"
        description="Actividades desarolladas por cada uno de los profesores miembros y profesores colaboradores"
        stretch
      >
        <Tiptap
          value={value}
          handleChange={handleChange}
          name="actividades1"
          disabled
        />
      </FormField>
    </Container>
  );
};
