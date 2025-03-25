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
        <Alert header="Información Sobre Publicaciones">
          <ul style={{ paddingLeft: "16px", marginTop: "15px" }}>
            <li>
              La evaluación y asignación de puntajes a cada publicación está a
              cargo de la Dirección General de Investigación (DGITT). Para
              cualquier observación o reclamo, comuníquese con ellos al correo{" "}
              <strong>dgitt.vrip@unmsm.edu.pe</strong> o de manera presencial en
              la Biblioteca Central, 4to piso.
            </li>
            <br />
            <li>
              Para la evaluación como Docente Investigador UNMSM, solo se
              considerarán las publicaciones que cuenten con filiación UNMSM y
              filiación única UNMSM.
              <br />
              <Link
                href="https://vrip.unmsm.edu.pe/wp-content/uploads/2024/07/RR_009077-2024-R.pdf"
                target="_blank"
              >
                Ver directiva (Art. 12° b)
              </Link>
            </li>
          </ul>
        </Alert>
      </SpaceBetween>
    </Modal>
  );
};
