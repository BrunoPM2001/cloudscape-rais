import {
  ExpandableSection,
  Container,
  Spinner,
} from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <Container>
      <ExpandableSection headerText="Resumen" defaultExpanded>
        {loading ? (
          <Spinner />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: data.resumen }} />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Justificacion de la propuesta">
        {loading ? (
          <Spinner />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: data.justificacion }} />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Propuesta de equipamiento científico">
        {loading ? (
          <Spinner />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: data.propuesta }} />
        )}
      </ExpandableSection>
    </Container>
  );
};
