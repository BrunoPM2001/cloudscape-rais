import { Modal, Box, SpaceBetween, Button } from "@cloudscape-design/components";

export default function ModalBloqueo({ mensaje = "Esta sección está temporalmente bloqueada.", volver = "/investigador" }) {
  return (
    <Modal
      visible={true}
      onDismiss={() => {}}
      closeAriaLabel="Cerrar"
      header="Acceso restringido"
      footer={
        <SpaceBetween size="s" direction="horizontal">
          <Button href={volver}>Volver al inicio</Button>
        </SpaceBetween>
      }
    >
      <SpaceBetween size="m">
        <Box>{mensaje}</Box>
      </SpaceBetween>
    </Modal>
  );
}