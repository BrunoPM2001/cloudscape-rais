import {
  Modal,
  Box,
  Button,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";

export default function ModalDj({ onClose, proyecto_id }) {
  return (
    <Modal
      visible
      size="medium"
      onDismiss={onClose}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button
              variant="primary"
              onClick={() => {
                window.location.href =
                  "/investigador/actividades/proyectoDetalle?antiguo=no&proyecto_id=" +
                  proyecto_id;
              }}
            >
              Firmar Declaración Jurada
            </Button>
            <Button variant="normal" onClick={onClose}>
              Cerrar
            </Button>
          </SpaceBetween>
        </Box>
      }
      header={<Header>Información Importante</Header>}
    >
      <SpaceBetween size="m">
        <Box variant="p">
          Estimado(a) responsable del <strong>Proyecto Ganador</strong> del
          concurso
          <strong>
            {" "}
            PROYECTOS DE INVESTIGACIÓN PARA GRUPOS DE INVESTIGACIÓN (PCONFIGI)
          </strong>
          , se requiere con carácter de urgencia la firma de su{" "}
          <strong>Declaración Jurada</strong>, necesaria para proceder con la
          entrega de la <strong>subvención económica</strong>. Le recomendamos
          realizar este trámite a la brevedad para evitar retrasos en el proceso
          de financiamiento.
        </Box>
      </SpaceBetween>
    </Modal>
  );
}
