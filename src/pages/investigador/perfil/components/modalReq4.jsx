import {
  Modal,
  Box,
  Button,
  Table,
  SpaceBetween,
} from "@cloudscape-design/components";

export default ({ data, close }) => {
  return (
    <Modal
      onDismiss={close}
      visible
      size="large"
      footer={
        <Box float="right">
          <Button variant="normal" onClick={close}>
            Cerrar
          </Button>
        </Box>
      }
      header="Publicaciones con filiación"
    >
      <SpaceBetween size="s">
        <div>
          Las publicaciones deberán tener filiación obligatoria con la UNMSM.
        </div>
        <Table
          wrapLines
          columnDefinitions={[
            {
              id: "titulo",
              header: "Título",
              cell: (item) => item.titulo,
              isRowHeader: true,
            },
            {
              id: "periodo",
              header: "Periodo",
              cell: (item) => item.periodo,
            },
            {
              id: "codigo_registro",
              header: "Código",
              cell: (item) => item.codigo_registro,
            },
            {
              id: "indexada",
              header: "Revista indexada",
              cell: (item) => item.indexada,
            },
            {
              id: "filiacion",
              header: "Filiación UNMSM",
              cell: (item) => (item.filiacion == 0 ? "No" : "Sí"),
            },
          ]}
          columnDisplay={[
            { id: "titulo", visible: true },
            { id: "periodo", visible: true },
            { id: "codigo_registro", visible: true },
            { id: "indexada", visible: true },
            { id: "filiacion", visible: true },
          ]}
          items={data}
          empty={
            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
              <SpaceBetween size="m">
                <b>No hay registros...</b>
              </SpaceBetween>
            </Box>
          }
        />
      </SpaceBetween>
    </Modal>
  );
};
