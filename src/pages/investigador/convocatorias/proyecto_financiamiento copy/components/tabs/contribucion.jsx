import { Container, FormField, Textarea } from "@cloudscape-design/components";

export default ({ value, error, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Contribución e impacto"
        description="Aporte científico que se espera obtener de la aplicación de los resultados de la investigación. (Máximo 400 palabras)"
        errorText={error}
        stretch
      >
        <Textarea
          rows={10}
          placeholder="Escriba lo necesario"
          value={value}
          onChange={({ detail }) => handleChange("contribucion", detail.value)}
        />
      </FormField>
    </Container>
  );
};
