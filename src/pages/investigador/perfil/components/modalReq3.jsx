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
      header="Actividades de investigación"
    >
      <SpaceBetween size="s">
        <div>
          Participar en por lo menos 1 actividad de investigación (Art. 6°) en
          cada uno de los 2 últimos años antes de la presentación de su
          solicitud.
        </div>
        <Table
          wrapLines
          columnDefinitions={[
            {
              id: "periodo",
              header: "Periodo",
              cell: (item) => item.periodo,
              isRowHeader: true,
            },
            {
              id: "categoria",
              header: "Tipo de actividad",
              cell: (item) => item.categoria,
            },
            {
              id: "sub_categoria",
              header: "Sub tipo",
              cell: (item) => item.sub_categoria,
            },
            {
              id: "tipo_proyecto",
              header: "Programa",
              cell: (item) => item.tipo_proyecto,
            },
            {
              id: "codigo_proyecto",
              header: "Código",
              cell: (item) => item.codigo_proyecto,
            },
            {
              id: "name",
              header: "Condición",
              cell: (item) => item.name,
            },
          ]}
          columnDisplay={[
            { id: "periodo", visible: true },
            { id: "categoria", visible: true },
            { id: "sub_categoria", visible: true },
            { id: "tipo_proyecto", visible: true },
            { id: "codigo_proyecto", visible: true },
            { id: "name", visible: true },
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
