import {
  Container,
  ColumnLayout,
  Header,
  Box,
  Spinner,
  SpaceBetween,
} from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <Container header={<Header variant="h2">Extras</Header>}>
      <ColumnLayout columns={2} variant="text-grid">
        <div>
          <SpaceBetween size="s">
            <div>
              <Box variant="awsui-key-label">Presentación</Box>
              {loading ? (
                <Spinner />
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: data.presentacion }}
                ></div>
              )}
            </div>
            <div>
              <Box variant="awsui-key-label">Ambientes físicos</Box>
              {loading ? (
                <Spinner />
              ) : (
                <div>{data.infraestructura_ambientes}</div>
              )}
            </div>
          </SpaceBetween>
        </div>
        <div>
          <SpaceBetween size="s">
            <div>
              <Box variant="awsui-key-label">Objetivos</Box>
              {loading ? (
                <Spinner />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: data.objetivos }}></div>
              )}
            </div>
            <div>
              <Box variant="awsui-key-label">Servicios</Box>
              {loading ? (
                <Spinner />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: data.servicios }}></div>
              )}
            </div>
          </SpaceBetween>
        </div>
      </ColumnLayout>
    </Container>
  );
};
