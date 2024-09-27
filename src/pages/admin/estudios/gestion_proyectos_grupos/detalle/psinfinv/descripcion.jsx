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
            dangerouslySetInnerHTML={{
              __html: data.descripcion.resumen_ejecutivo ?? "",
            }}
          />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Palabras clave">
        {loading ? <Spinner /> : <div>{data.palabras_clave}</div>}
      </ExpandableSection>
      <ExpandableSection headerText="Antecedentes">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.descripcion.antecedentes ?? "",
            }}
          />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Objetivos generales">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.descripcion.objetivos_generales ?? "",
            }}
          />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Objetivos específicos">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.descripcion.objetivos_especificos ?? "",
            }}
          />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Justificacion">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.descripcion.justificacion ?? "",
            }}
          />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Hipótesis">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.descripcion.hipotesis ?? "",
            }}
          />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Metodología de trabajo">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.descripcion.metodologia_trabajo ?? "",
            }}
          />
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
          />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Resultado esperado">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.descripcion.resumen_esperado,
            }}
          />
        )}
      </ExpandableSection>
    </Container>
  );
};
