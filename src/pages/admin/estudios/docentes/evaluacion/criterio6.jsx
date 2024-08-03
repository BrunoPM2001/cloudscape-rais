import {
  Badge,
  Box,
  Button,
  Container,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";

export default ({ data }) => {
  return (
    <Container
      header={
        <SpaceBetween size="xxs" alignItems="center" direction="horizontal">
          <Box variant="h3">D6</Box>
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
