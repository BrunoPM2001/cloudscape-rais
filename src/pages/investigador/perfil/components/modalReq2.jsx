import {
  Modal,
  Box,
  Button,
  ColumnLayout,
  SpaceBetween,
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
      header="Grupo de investigación"
    >
      <SpaceBetween size="s">
        <div>
          Ser miembro titular de un grupo de investigación activo y reconocido
          por el VRIP
        </div>
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
      </SpaceBetween>
    </Modal>
  );
};
