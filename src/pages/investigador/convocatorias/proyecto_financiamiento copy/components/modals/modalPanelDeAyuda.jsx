import { Modal, Box, SpaceBetween, Button } from "@cloudscape-design/components";

const ModalPanelDeAyuda = ({ visible, setVisible }) => {
  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cerrar
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Panel de Ayuda"
    >
      <div>
        <h4>Bienes:</h4>
        <h5>Equipos y bienes duraderos</h5>
        <ul>
          <li>
            Adquisición de equipos (PC, Laptop, etc., Software, maquinaria o
            equipo de laboratorio, muebles, y libros para el proyecto de
            investigación).
            <br />
            <strong>No debe superar S/. 12500</strong>
          </li>
        </ul>
        <h5>Materiales e Insumos</h5>
        <ul>
          <li>
            Materiales, insumos, reactivos, repuestos, accesorios, componentes
            electrónicos o mecánicos, bienes no inventariables.
            <br />
            <strong>No debe superar S/. 7500</strong>
          </li>
        </ul>
        <h5>Útiles de oficina y materiales de aseo, limpieza y tocador</h5>
        <ul>
          <li>
            Papelería en general, útiles y materiales de oficina.
            <br />
            <strong>No debe superar S/. 500</strong>
          </li>
        </ul>
        <h4>Servicios:</h4>
        <h5>Pasajes y viáticos</h5>
        <ul>
          <li>
            Gastos de viajes relacionados a actividades propias del proyecto
            de investigación (pasajes, viáticos, viáticos, manutención y
            seguro de viaje).
            <br />
            <strong>No debe superar S/. 3750</strong>
          </li>
        </ul>
        <h5>Servicios de terceros</h5>
        <ul>
          <li>
            Gastos de contratación de personas naturales o jurídicas para la
            ejecución de actividades complementarias dentro de la propuesta.
            <br />
            <strong>No debe superar S/. 8750</strong>
          </li>
        </ul>
        <h5>Movilidad Local</h5>
        <ul>
          <li>
            Movilidad local en Lima Metropolitana y el Callao.
            <br />
            <strong>No debe superar S/. 500</strong>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default ModalPanelDeAyuda;