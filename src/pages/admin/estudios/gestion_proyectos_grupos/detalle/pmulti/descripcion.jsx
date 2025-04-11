import {
  ExpandableSection,
  Container,
  Spinner,
  Link,
  Box,
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
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.palabras_clave ?? "",
            }}
          />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Estado del arte">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div
              dangerouslySetInnerHTML={{
                __html: data.descripcion.estado_arte ?? "",
              }}
            />
            <Box variant="awsui-key-label">Archivo</Box>
            {data.archivos?.estado_arte ? (
              <Link href={data.archivos.estado_arte} external target="_blank">
                Ver archivo
              </Link>
            ) : (
              <p>No ha cargado ningún archivo</p>
            )}
          </>
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Planteamiento del problema">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.descripcion.planteamiento_problema ?? "",
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
      <ExpandableSection headerText="Contribución e impacto">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.descripcion.contribucion_impacto ?? "",
            }}
          />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Objetivos">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.descripcion.objetivos ?? "",
            }}
          />
        )}
      </ExpandableSection>
      <ExpandableSection headerText="Metodología de trabajo">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div
              dangerouslySetInnerHTML={{
                __html: data.descripcion.metodologia_trabajo ?? "",
              }}
            />
            <Box variant="awsui-key-label">Archivo</Box>
            {data.archivos?.metodologia && (
              <Link href={data.archivos.metodologia} external target="_blank">
                Ver archivo
              </Link>
            )}
          </>
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
    </Container>
  );
};
