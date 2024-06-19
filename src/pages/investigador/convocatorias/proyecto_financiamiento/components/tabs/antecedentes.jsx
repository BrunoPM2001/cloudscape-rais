import {
  Alert,
  Container,
  FormField,
  SpaceBetween,
  Textarea,
} from "@cloudscape-design/components";

export default ({ value, error, handleChange }) => {
  return (
    <Container>
      <SpaceBetween size="s">
        <Alert header="Antecedentes">
          Describa los trabajos previos y recientes sobre el tema de estudio,
          mencionando sus resultados y situación actual, sean nacionales o
          internacionales.
        </Alert>
        <Alert header="Estado del arte">
          Cómo se encuentra el avance de su conocimiento en el momento de
          realizar una investigación.
        </Alert>
        <Alert header="Planteamiento del problema">
          Es la parte de la investigación en la cual se expone el asunto o
          cuestión que se tiene como objeto aclarar.
        </Alert>
        <FormField
          label=""
          description="(Máximo 200 palabras)"
          errorText={error}
          stretch
        >
          <Textarea
            rows={10}
            placeholder="Escriba lo necesario"
            value={value}
            onChange={({ detail }) =>
              handleChange("antecedentes", detail.value)
            }
          />
        </FormField>
      </SpaceBetween>
    </Container>
  );
};
