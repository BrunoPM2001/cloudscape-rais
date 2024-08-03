import {
  Badge,
  Box,
  ColumnLayout,
  Container,
  Link,
  SpaceBetween,
} from "@cloudscape-design/components";

export default ({ data }) => {
  return (
    <Container
      header={
        <SpaceBetween size="xxs" alignItems="center" direction="horizontal">
          <Box variant="h3">D1</Box>
          <Badge color={data.cumple ? "green" : "red"}>
            {data.cumple ? "Sí cumple" : "No cumple"}
          </Badge>
        </SpaceBetween>
      }
      fitHeight
    >
      <ColumnLayout columns={2} variant="text-grid">
        <div>
          <Box variant="awsui-key-label">Código renacyt</Box>
          <div>{data.renacyt}</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Constancia</Box>
          <Link
            href={
              "https://ctivitae.concytec.gob.pe/renacyt-backend/actoRegistral/obtenerConstanciaRegistro/" +
              data.renacyt
            }
            external
            target="_blank"
          >
            Decargar
          </Link>
        </div>
      </ColumnLayout>
    </Container>
  );
};
