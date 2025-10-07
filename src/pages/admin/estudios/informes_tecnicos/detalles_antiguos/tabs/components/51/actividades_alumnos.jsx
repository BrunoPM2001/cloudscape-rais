import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Actividades alumnos"
        description="Actividades desarolladas por cada uno de los alumnos colaboradores"
        stretch
      >
        <Tiptap
          value={value}
          handleChange={handleChange}
          name="actividades2"
          disabled
        />
      </FormField>
    </Container>
  );
};
