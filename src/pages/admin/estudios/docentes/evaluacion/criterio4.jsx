import {
  Badge,
  Box,
  Container,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";

export default ({ data }) => {
  return (
    <Container
      header={
        <SpaceBetween size="xxs" alignItems="center" direction="horizontal">
          <Box variant="h3">D4</Box>
          <Badge color={data.cumple ? "green" : "red"}>
            {data.cumple ? "Sí cumple" : "No cumple"}
          </Badge>
        </SpaceBetween>
      }
    >
      <Table
        variant="embedded"
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
            cell: (item) => item.filiacion,
          },
        ]}
        columnDisplay={[
          { id: "titulo", visible: true },
          { id: "periodo", visible: true },
          { id: "codigo_registro", visible: true },
          { id: "indexada", visible: true },
          { id: "filiacion", visible: true },
        ]}
        items={data.lista}
        empty={
          <Box margin={{ vertical: "xxxs" }} textAlign="center" color="inherit">
            <SpaceBetween size="s">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
      />
    </Container>
  );
};
