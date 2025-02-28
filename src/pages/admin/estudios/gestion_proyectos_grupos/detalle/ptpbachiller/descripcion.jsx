import {
  ExpandableSection,
  Container,
  Spinner,
} from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <Container>
      <ExpandableSection headerText="Resumen del proyecto" defaultExpanded>
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.descripcion.resumen_ejecutivo,
            }}
          ></div>
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Planteamiento del problema e hipótesis">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.descripcion.planteamiento_problema,
            }}
          ></div>
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Justificación de la investigación">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: data.descripcion.justificacion }}
          ></div>
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Estado del arte">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: data.descripcion.estado_arte }}
          ></div>
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Objetivos">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: data.descripcion.objetivos }}
          ></div>
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Metodología de trabajo">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.descripcion.metodologia_trabajo,
            }}
          ></div>
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Referencias bibliográficas">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.descripcion.referencias_bibliograficas,
            }}
          ></div>
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Justificación del presupuesto">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.descripcion.presupuesto_justificacion,
            }}
          ></div>
        )}
      </ExpandableSection>
    </Container>
  );
};
