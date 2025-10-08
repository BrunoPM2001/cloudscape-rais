import { Container, FormField } from "@cloudscape-design/components";
import Tiptap from "../../../../../../components/tiptap";

export default ({ value, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Resultados preliminares"
        description="Indique los resultados preliminares más relevantes en su aporte científico, ético, social, económico o cultural de la investigación"
        stretch
      >
        <Tiptap
          value={value}
          handleChange={handleChange}
          disabled
          name="resultado_preliminar"
        />
      </FormField>
    </Container>
  );
};
