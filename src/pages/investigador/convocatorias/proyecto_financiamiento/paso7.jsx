import {
  Alert,
  Button,
  Container,
  SpaceBetween,
} from "@cloudscape-design/components";

export default function ({ proyecto_id }) {
  return (
    <Container>
      <SpaceBetween size="m">
        <Alert
          header="Resumen de proyecto"
          action={<Button variant="primary">Previsualizar</Button>}
        >
          Si desea puede previsualizar el informe de resumen de su proyecto.
        </Alert>
        <Alert header="Declaración jurada">
          Declara bajo juramento que toda información consignada en este
          formulario es verídica.
        </Alert>
      </SpaceBetween>
    </Container>
  );
}
