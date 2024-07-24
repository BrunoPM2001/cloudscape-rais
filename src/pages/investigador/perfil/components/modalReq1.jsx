import {
  Modal,
  Box,
  Button,
  Link,
  ColumnLayout,
  SpaceBetween,
} from "@cloudscape-design/components";

export default ({ data, soli, close }) => {
  return (
    <Modal
      onDismiss={close}
      visible
      size="medium"
      footer={
        <Box float="right">
          <Button variant="normal" onClick={close}>
            Cerrar
          </Button>
        </Box>
      }
      header="Renacyt"
    >
      <SpaceBetween size="s">
        <div>
          Estar en la condición de investigador con calificación vigente en el
          RENACYT - CONCYTEC.
        </div>
        {soli ? (
          <div>
            <Box variant="awsui-key-label">Código renacyt</Box>
            <div>{data}</div>
          </div>
        ) : (
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
        )}
      </SpaceBetween>
    </Modal>
  );
};
