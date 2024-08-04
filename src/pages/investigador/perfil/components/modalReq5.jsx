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
      header="Deudas"
    >
      <SpaceBetween size="s">
        <div>
          No presentar deudas de ningún tipo por actividades de investigación.
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
              id: "tipo_proyecto",
              header: "Tipo de proyecto",
              cell: (item) => item.tipo_proyecto,
            },
            {
              id: "id_deuda",
              header: "ID deuda",
              cell: (item) => item.id_deuda,
            },
            {
              id: "detalle",
              header: "Detalle deuda",
              cell: (item) => item.detalle,
            },
          ]}
          columnDisplay={[
            { id: "titulo", visible: true },
            { id: "periodo", visible: true },
            { id: "tipo_proyecto", visible: true },
            { id: "id_deuda", visible: true },
            { id: "detalle", visible: true },
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
