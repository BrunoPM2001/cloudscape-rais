import {
  Link,
  Container,
  ColumnLayout,
  Header,
  Box,
  Icon,
} from "@cloudscape-design/components";

export default () => {
  return (
    <Container header={<Header variant="h2">Extras</Header>}>
      <ColumnLayout columns={2} variant="text-grid">
        <div>
          <Box variant="awsui-key-label">
            Ambientes físicos {"  "}
            <Icon name="external" variant="link" />
          </Box>
          <div>
            Es la oficina de la dirección de aproximadamente 20 metros
            cuadrados.
          </div>
        </div>
        <div>
          <Box variant="awsui-key-label">
            Resoluciones decanales o constancias {"  "}
            <Icon name="external" variant="link" />
          </Box>
          <Link to="#">013569-2023-R</Link>
        </div>
      </ColumnLayout>
    </Container>
  );
};
