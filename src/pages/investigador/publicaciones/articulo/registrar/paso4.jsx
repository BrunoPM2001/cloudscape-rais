import { Alert, Button, SpaceBetween } from "@cloudscape-design/components";

export default function ({ publicacion_id }) {
  //  Function

  return (
    <SpaceBetween size="m">
      <Alert
        header="Resumen de publicación"
        action={<Button variant="primary">Previsualizar</Button>}
      >
        Si desea puede previsualizar el informe de resumen de su publicación.
      </Alert>
      <Alert header="Declaración jurada">
        Declara bajo juramento que toda información consignada en este
        formulario es verídica.
      </Alert>
    </SpaceBetween>
  );
}
