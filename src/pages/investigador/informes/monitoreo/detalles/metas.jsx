import {
  Box,
  Container,
  Header,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";

export default function ({ data, loading }) {
  return (
    <Container header={<Header variant="h2">Metas</Header>} fitHeight={true}>
      <Table
        trackBy="tipo_publicacion"
        columnDefinitions={[
          {
            id: "tipo_publicacion",
            header: "Tipo",
            cell: (item) => item.tipo_publicacion,
          },
          {
            id: "requerido",
            header: "Cant. requerida",
            cell: (item) => item.requerido,
          },
          {
            id: "completado",
            header: "Cant. completada",
            cell: (item) => item.completado,
          },
        ]}
        columnDisplay={[
          { id: "tipo_publicacion", visible: true },
          { id: "requerido", visible: true },
          { id: "completado", visible: true },
        ]}
        items={data}
        loading={loading}
        loadingText="Cargando datos"
        variant="embedded"
        wrapLines
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
      />
    </Container>
  );
}
