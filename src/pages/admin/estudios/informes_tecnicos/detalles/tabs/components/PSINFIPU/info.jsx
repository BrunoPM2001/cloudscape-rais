import {
  Box,
  ColumnLayout,
  Container,
  Header,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";

export default ({ proyecto, miembros }) => {
  return (
    <SpaceBetween size="l">
      <Container>
        <ColumnLayout columns={4}>
          <div>
            <div>
              <Box variant="awsui-key-label">Título</Box>
              <Box>{proyecto?.titulo}</Box>
            </div>
          </div>
          <div>
            <div>
              <Box variant="awsui-key-label">Código</Box>
              <Box>{proyecto?.codigo_proyecto}</Box>
            </div>
            <div>
              <Box variant="awsui-key-label">Año</Box>
              <Box>{proyecto?.periodo}</Box>
            </div>
            <div>
              <Box variant="awsui-key-label">Grupo</Box>
              <Box>{proyecto?.grupo_nombre}</Box>
            </div>
          </div>
          <div>
            <div>
              <Box variant="awsui-key-label">Línea de investigación</Box>
              <Box>{proyecto?.linea}</Box>
            </div>
            <div>
              <Box variant="awsui-key-label">Resolución</Box>
              <Box>{proyecto?.resolucion_rectoral}</Box>
            </div>
          </div>
          <div>
            <div>
              <Box variant="awsui-key-label">Facultad</Box>
              <Box>{proyecto?.facultad}</Box>
            </div>
          </div>
        </ColumnLayout>
      </Container>
      <Table
        trackBy="id"
        header={<Header>Miembros del equipo de investigación</Header>}
        columnDefinitions={[
          {
            id: "condicion",
            header: "Condición",
            cell: (item) => item.condicion,
          },
          {
            id: "nombres",
            header: "Integrante",
            cell: (item) => item.nombres,
          },
        ]}
        columnDisplay={[
          { id: "condicion", visible: true },
          { id: "nombres", visible: true },
        ]}
        items={miembros}
      />
    </SpaceBetween>
  );
};
