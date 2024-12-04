import {
  Modal,
  Box,
  Button,
  Link,
  ColumnLayout,
  Alert,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";

export default ({ data, soli, close }) => {
  return (
    <Modal
      visible
      size="medium"
      onDismiss={close}
      footer={
        <Box float="right">
          <Button variant="normal" onClick={close}>
            Cerrar
          </Button>
        </Box>
      }
      header={
        <Header
          description="Estar en la condición de investigador con calificación vigente en el
          RENACYT - CONCYTEC."
        >
          Renacyt
        </Header>
      }
    >
      {soli ? (
        <SpaceBetween size="m">
          <ColumnLayout columns={2} variant="text-grid">
            <div>
              <Box variant="awsui-key-label">Código renacyt</Box>
              <div>{data == "" ? "No figura" : data}</div>
            </div>
            <div>
              <Box variant="awsui-key-label">Constancia</Box>
              <Link
                href={
                  "https://ctivitae.concytec.gob.pe/renacyt-backend/actoRegistral/obtenerConstanciaRegistro/" +
                  data
                }
                external
                target="_blank"
              >
                Decargar
              </Link>
            </div>
          </ColumnLayout>
          <Alert>
            Si no puede descargar la constancia es porque el código Renacyt
            registrado en el RAIS es incorrecto
          </Alert>
        </SpaceBetween>
      ) : (
        <SpaceBetween size="m">
          <ColumnLayout columns={2} variant="text-grid">
            <div>
              <Box variant="awsui-key-label">Código renacyt</Box>
              <div>{data.renacyt}</div>
            </div>
            <div>
              <Box variant="awsui-key-label">Constancia</Box>
              <Link
                href={
                  "https://ctivitae.concytec.gob.pe/renacyt-backend/actoRegistral/obtenerConstanciaRegistro/" +
                  data.renacyt
                }
                external
                target="_blank"
              >
                Decargar
              </Link>
            </div>
          </ColumnLayout>
          <Alert>
            Si no puede descargar la constancia es porque el código Renacyt
            registrado en el RAIS es incorrecto
          </Alert>
        </SpaceBetween>
      )}
    </Modal>
  );
};
