import {
  Badge,
  Box,
  Button,
  Modal,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";

const columnDefinitions = [
  {
    id: "nombres",
    header: "Nombres",
    cell: (item) => item.nombres,
  },
  {
    id: "cumplimiento",
    header: "Cumplimiento",
    cell: (item) =>
      item.cumplimiento == 1 ? (
        <Badge color="green">Sí</Badge>
      ) : (
        <Badge color="red">No</Badge>
      ),
  },
  {
    id: "actividad",
    header: "Actividad",
    cell: (item) => item.actividad,
  },
];

const columnDisplay = [
  { id: "nombres", visible: true },
  { id: "cumplimiento", visible: true },
  { id: "actividad", visible: true },
];

export default ({ close, data }) => {
  return (
    <Modal
      visible
      onDismiss={close}
      size="large"
      footer={
        <Box float="right">
          <Button variant="primary" onClick={close}>
            Cerrar
          </Button>
        </Box>
      }
      header="Actividades del informe"
    >
      <Table
        trackBy="id"
        items={data}
        columnDefinitions={columnDefinitions}
        columnDisplay={columnDisplay}
        wrapLines
        variant="embedded"
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
      />
    </Modal>
  );
};
