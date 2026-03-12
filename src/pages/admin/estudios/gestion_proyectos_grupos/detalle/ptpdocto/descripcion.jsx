import {
  ExpandableSection,
  Container,
  Spinner,
} from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <Container>
      <ExpandableSection headerText="Resumen ejecutivo" defaultExpanded>
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.resumen_ejecutivo,
            }}
          ></div>
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Planteamiento del problema">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.planteamiento_problema,
            }}
          ></div>
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Hipótesis">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.hipotesis,
            }}
          ></div>
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Justificación">
        {loading ? (
          <Spinner />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: data.justificacion }}></div>
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Antecedentes">
        {loading ? (
          <Spinner />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: data.antecedentes }}></div>
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Metodología de trabajo">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.metodologia_trabajo,
            }}
          ></div>
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Objetivos">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <ExpandableSection headerText="Objetivos generales">
              <div
                dangerouslySetInnerHTML={{
                  __html: data.objetivos_generales,
                }}
              ></div>
            </ExpandableSection>
            <ExpandableSection headerText="Objetivos específicos">
              <div
                dangerouslySetInnerHTML={{
                  __html: data.objetivos_especificos,
                }}
              ></div>
            </ExpandableSection>
          </>
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
          ></div>
        )}
      </ExpandableSection>
    </Container>
  );
};
