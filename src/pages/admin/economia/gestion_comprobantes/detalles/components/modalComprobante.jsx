import {
  Badge,
  Box,
  Button,
  Grid,
  Header,
  Modal,
  SpaceBetween,
} from "@cloudscape-design/components";
import PdfViewer from "./pdfViewer";
import DatosComprobante from "./datosComprobante";

export default ({ visible, setVisible, item, reload }) => {
  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="max"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button variant="primary" loading={false}>
              Guardar
            </Button>
          </SpaceBetween>
        </Box>
      }
      header={
        <Header
          info={
            <Badge
              color={
                item.estado == 1
                  ? "green"
                  : item.estado == 2
                  ? "red"
                  : item.estado == 3
                  ? "grey"
                  : item.estado == 4
                  ? "blue"
                  : item.estado == 5
                  ? "red"
                  : "red"
              }
            >
              {item.estado == 1
                ? "Aprobado"
                : item.estado == 2
                ? "Rechazado"
                : item.estado == 3
                ? "Observado"
                : item.estado == 4
                ? "Enviado"
                : item.estado == 5
                ? "Anulado"
                : "Error"}
            </Badge>
          }
        >
          Revisión de comprobante
        </Header>
      }
    >
      <Grid
        gridDefinition={[
          {
            colspan: {
              default: 12,
              xl: 6,
              l: 6,
              m: 6,
              s: 6,
              xs: 6,
            },
          },
          {
            colspan: {
              default: 12,
              xl: 6,
              l: 6,
              m: 6,
              s: 6,
              xs: 6,
            },
          },
        ]}
      >
        <DatosComprobante item={item} reload={reload} />
        <PdfViewer />
      </Grid>
    </Modal>
  );
};
