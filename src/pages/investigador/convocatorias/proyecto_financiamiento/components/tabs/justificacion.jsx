import { Container, FormField, Textarea } from "@cloudscape-design/components";

export default ({ value, error, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Justificación de la investigación"
        description="Definir las razones del por qué se aborda la investigación y el aporte de los resultados para el beneficio de la sociedad, desarrollo científico ó tecnológico. (Máximo 1000 palabras)"
        errorText={error}
        stretch
      >
        <Textarea
          rows={10}
          placeholder="Escriba lo necesario"
          value={value}
          onChange={({ detail }) => handleChange("justificacion", detail.value)}
        />
      </FormField>
    </Container>
  );
};
