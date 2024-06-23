import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Aportes"
        description="Indique los nombres de todos los miembros del equipo precisando su participación y aporte en el trabajo de acuerdo a las labores que le fueron asignadas"
        stretch
      >
        <Tiptap value={value} handleChange={handleChange} name="infinal1" />
      </FormField>
    </Container>
  );
};
