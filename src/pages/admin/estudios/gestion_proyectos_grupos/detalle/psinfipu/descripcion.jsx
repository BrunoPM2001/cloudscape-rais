import {
  ExpandableSection,
  Container,
  Spinner,
  Link,
  ColumnLayout,
} from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <Container>
      <ColumnLayout columns={2}>
        <ExpandableSection headerText="Tipo de investigación" defaultExpanded>
          {loading ? (
            <Spinner />
          ) : (
            <div>{data.descripcion.tipo_investigacion}</div>
          )}
        </ExpandableSection>
        <ExpandableSection
          headerText="Editorial de la publicación"
          defaultExpanded
        >
          {loading ? (
            <Spinner />
          ) : (
            <div>{data.descripcion.publicacion_editorial}</div>
          )}
        </ExpandableSection>
        <ExpandableSection headerText="Url de la publicación" defaultExpanded>
          {loading ? (
            <Spinner />
          ) : (
            <Link
              href={data.descripcion.publicacion_url}
              target="_blank"
              external
            >
              Ir a la publicación
            </Link>
          )}
        </ExpandableSection>
        <ExpandableSection headerText="Tipo de publicación" defaultExpanded>
          {loading ? (
            <Spinner />
          ) : (
            <div>{data.descripcion.publicacion_tipo}</div>
          )}
        </ExpandableSection>
      </ColumnLayout>
    </Container>
  );
};
