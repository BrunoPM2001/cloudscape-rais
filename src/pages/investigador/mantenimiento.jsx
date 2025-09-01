import { Modal, Box, SpaceBetween, Button } from "@cloudscape-design/components";

export default function InvestigadorMantenimiento() {
  return (
    <Modal
      visible={true}
      onDismiss={() => {}}
      closeAriaLabel="Cerrar"
      header="Estamos en mantenimiento"
      footer={
        <SpaceBetween size="s" direction="horizontal">
          <Button href="/">Volver al inicio</Button>
        </SpaceBetween>
      }
    >
      <SpaceBetween size="m">
        <Box>Estimado(a) docente-investigador(a):</Box>
        <Box>El sistema no se encuentra disponible en este momento.</Box>
        <Box>Le solicitamos abstenerse de subir información mientras trabajamos en la restauración de los datos.</Box>
        <Box>Agradecemos su comprensión y paciencia.</Box>
      </SpaceBetween>
    </Modal>
  );
}
