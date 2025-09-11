import {
  ExpandableSection,
  Container,
  Spinner,
} from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <Container>
      <ExpandableSection headerText="Resumen ejecutivo">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: data.resumen_ejecutivo ?? "" }}
          />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Antecedentes">
        {loading ? (
          <Spinner />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: data.antecedentes ?? "" }} />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Objetivos">
        {loading ? (
          <Spinner />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: data.objetivos ?? "" }} />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Justificacion">
        {loading ? (
          <Spinner />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: data.justificacion ?? "" }} />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Hipótesis">
        {loading ? (
          <Spinner />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: data.hipotesis ?? "" }} />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Metodología de trabajo">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: data.metodologia_trabajo ?? "" }}
          />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Referencias bibliográficas">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.referencias_bibliograficas,
            }}
          />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Contribución">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: data.contribucion_impacto }}
          />
        )}
      </ExpandableSection>
    </Container>
  );
};
