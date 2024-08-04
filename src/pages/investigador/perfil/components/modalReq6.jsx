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
      size="medium"
      footer={
        <Box float="right">
          <Button variant="normal" onClick={close}>
            Cerrar
          </Button>
        </Box>
      }
      header="Declaración jurada"
    >
      <SpaceBetween size="s">
        <div>
          Presentar al VRIP una declaración jurada de no haber incurrido en
          alguna infracción o tener sanción vigente, contempladas en el Código
          Nacional de la Integridad Científica del Concytec
        </div>
        <Table
          columnDefinitions={[
            {
              id: "fecha_inicio",
              header: "Fecha de inicio",
              cell: (item) => item.fecha_inicio,
              isRowHeader: true,
            },
            {
              id: "fecha_fin",
              header: "Fecha de fin",
              cell: (item) => item.fecha_fin,
            },
            {
              id: "url",
              header: "Descargar",
              cell: (item) => (
                <Button
                  variant="inline-icon"
                  href={item.url}
                  target="_blank"
                  iconName="file"
                />
              ),
            },
          ]}
          columnDisplay={[
            { id: "fecha_inicio", visible: true },
            { id: "fecha_fin", visible: true },
            { id: "url", visible: true },
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
