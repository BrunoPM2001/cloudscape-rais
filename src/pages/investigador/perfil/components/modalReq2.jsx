import {
  Modal,
  Box,
  Button,
  ColumnLayout,
  SpaceBetween,
  Header,
} from "@cloudscape-design/components";

export default ({ data, close }) => {
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
      header={
        <Header
          description="Ser miembro titular de un grupo de investigación activo y reconocido
          por el VRIP."
        >
          Grupo de investigación
        </Header>
      }
    >
      <SpaceBetween size="s">
        {data == null ? (
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No tiene registro de grupo de investicación</b>
            </SpaceBetween>
          </Box>
        ) : (
          <ColumnLayout columns={2} variant="text-grid">
            <div>
              <Box variant="awsui-key-label">Grupo</Box>
              <div>{data.grupo_nombre}</div>
            </div>
            <div>
              <Box variant="awsui-key-label">Tipo de integrante</Box>
              <div>{data.condicion}</div>
            </div>
          </ColumnLayout>
        )}
      </SpaceBetween>
    </Modal>
  );
};
