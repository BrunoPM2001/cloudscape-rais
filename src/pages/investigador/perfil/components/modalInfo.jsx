import {
  Modal,
  Box,
  Button,
  Link,
  Alert,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";

export default ({ close }) => {
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
        <Header description="Es de vital importancia que el investigador lea detenidamente la información que se le proporciona.">
          Información Importante
        </Header>
      }
    >
      <SpaceBetween size="m">
        <Alert header="Información Sobre Publicaciones con filiación">
          <ul style={{ paddingLeft: "16px", margin: 0 }}>
            <li>
              Todas las publicaciones deben tener Filiación UNMSM. En caso
              contrario su solicitud será OBSERVADA.
            </li>
            <li>
              Debe eliminar sus publicaciones sin Filiación UNMSM de su perfil
              RAIS.
            </li>
            <li>
              Recuerde que necesita tener al menos una publicación con filiación
              UNMSM para ser calificado como Docente Investigador
            </li>
          </ul>
          <li>
            <Link
              href="https://vrip.unmsm.edu.pe/wp-content/uploads/2024/07/RR_009077-2024-R.pdf"
              target="_blank"
            >
              Ver Directiva ( Art 12° b) )
            </Link>
          </li>
        </Alert>
      </SpaceBetween>
    </Modal>
  );
};
