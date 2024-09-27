import {
  ExpandableSection,
  Container,
  Spinner,
} from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <Container>
      <ExpandableSection headerText="Objetivo">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.objetivo ?? "",
            }}
          />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Justificación">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.justificacion ?? "",
            }}
          />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Metas específicas">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.metas ?? "",
            }}
          />
        )}
      </ExpandableSection>
    </Container>
  );
};
