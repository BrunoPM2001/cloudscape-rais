import {
  Table,
  Box,
  SpaceBetween,
  Header,
  Button,
  Spinner,
  Grid,
  ExpandableSection,
  Container,
} from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <Container>
      <Grid
        gridDefinition={[
          {
            colspan: {
              default: 12,
              l: 4,
              m: 4,
              s: 4,
            },
          },
          {
            colspan: {
              default: 12,
              l: 7,
              m: 7,
              s: 7,
            },
            offset: {
              l: 1,
              m: 1,
              s: 1,
            },
          },
        ]}
      >
        <SpaceBetween size="s">
          <ExpandableSection
            headerText="Impacto de la propuesta"
            defaultExpanded
          >
            {loading ? (
              <Spinner />
            ) : (
              <div>{data.impacto.impacto_propuesta}</div>
            )}
          </ExpandableSection>
          <ExpandableSection headerText="Plan de manejo de residuos/afluentes o emisiones">
            {loading ? <Spinner /> : <div>{data.impacto.plan_manejo}</div>}
          </ExpandableSection>
        </SpaceBetween>
        <Table
          variant="embedded"
          columnDefinitions={[
            {
              id: "nombre",
              header: "Nombre",
              cell: (item) => item.nombre,
              width: "40%",
            },
            {
              id: "comentario",
              header: "Comentario",
              cell: (item) => item.comentario,
              width: "45%",
            },
            {
              id: "archivo",
              header: "Archivo",
              cell: (item) => (
                <Button
                  variant="inline-icon"
                  href={item.archivo}
                  target="_blank"
                  iconName="file-open"
                />
              ),
              width: "15%",
            },
          ]}
          columnDisplay={[
            { id: "nombre", visible: true },
            { id: "comentario", visible: true },
            { id: "archivo", visible: true },
          ]}
          enableKeyboardNavigation
          items={data.archivos}
          loadingText="Cargando datos"
          loading={loading}
          wrapLines
          trackBy="archivo"
          empty={
            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
              <SpaceBetween size="m">
                <b>No hay registros...</b>
              </SpaceBetween>
            </Box>
          }
          header={<Header>Documentos complementarios</Header>}
        />
      </Grid>
    </Container>
  );
};
