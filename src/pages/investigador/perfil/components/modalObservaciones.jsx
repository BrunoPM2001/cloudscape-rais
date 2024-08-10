import {
  Box,
  Button,
  Header,
  Modal,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";

const initialForm = {
  observacion: "",
};

const formRules = {
  observacion: { required: true },
};

export default ({ data, close }) => {
  return (
    <Modal
      visible
      size="large"
      onDismiss={close}
      header="Observaciones"
      footer={
        <Box float="right">
          <Button onClick={close}>Cerrar</Button>
        </Box>
      }
    >
      <Table
        columnDefinitions={[
          {
            id: "fecha",
            header: "Fecha",
            cell: (item) => item.created_at,
            isRowHeader: true,
          },
          {
            id: "observacion",
            header: "Observación",
            cell: (item) => item.observacion,
          },
        ]}
        columnDisplay={[
          { id: "fecha", visible: true },
          { id: "observacion", visible: true },
        ]}
        wrapLines
        items={data}
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
