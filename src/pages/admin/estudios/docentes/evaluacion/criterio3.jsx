import {
  Badge,
  Box,
  Container,
  Header,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";

export default ({ data }) => {
  return (
    <Container
      header={
        <Header
          variant="h3"
          actions={
            <Badge color={data.cumple ? "green" : "red"}>
              {data.cumple ? "Sí cumple" : "No cumple"}
            </Badge>
          }
        >
          D3
        </Header>
      }
    >
      <Table
        variant="embedded"
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
