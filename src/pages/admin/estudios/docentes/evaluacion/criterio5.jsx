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
          D5
        </Header>
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
