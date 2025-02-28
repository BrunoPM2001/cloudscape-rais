import {
  Container,
  ColumnLayout,
  SpaceBetween,
  Header,
  Box,
} from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <Container>
      <ColumnLayout columns={4}>
        <SpaceBetween size="s">
          <Box variant="h4">Datos personales</Box>
          <div>
            <Box variant="awsui-key-label">Nombres</Box>
            {loading ? <Spinner /> : <div>{data.nombres}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Apellidos</Box>
            {loading ? <Spinner /> : <div>{data.apellidos}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">N° de documento</Box>
            {loading ? <Spinner /> : <div>{data.doc_numero}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Teléfono móvil</Box>
            {loading ? <Spinner /> : <div>{data.telefono_movil}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Teléfono de trabajo</Box>
            {loading ? <Spinner /> : <div>{data.telefono_trabajo}</div>}
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <Box variant="h4">Datos profesionales</Box>
          <div>
            <Box variant="awsui-key-label">Especialidad</Box>
            {loading ? <Spinner /> : <div>{data.especialidad}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Título profesional</Box>
            {loading ? <Spinner /> : <div>{data.titulo_profesional}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Grado</Box>
            {loading ? <Spinner /> : <div>{data.grado}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Tipo</Box>
            {loading ? <Spinner /> : <div>{data.tipo}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Categoría y clase</Box>
            {loading ? <Spinner /> : <div>{data.docente_categoria}</div>}
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <Box variant="h4">Datos institucionales</Box>
          <div>
            <Box variant="awsui-key-label">Código</Box>
            {loading ? <Spinner /> : <div>{data.codigo}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Dependencia</Box>
            {loading ? <Spinner /> : <div>{data.dependencia}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Facultad</Box>
            {loading ? <Spinner /> : <div>{data.facultad}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Correo</Box>
            {loading ? <Spinner /> : <div>{data.email3}</div>}
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <Box variant="h4">Información general</Box>
          <div>
            <Box variant="awsui-key-label">Grupo de investigación</Box>
            {loading ? <Spinner /> : <div>{data.grupo_nombre}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Área académica</Box>
            {loading ? <Spinner /> : <div>{data.area}</div>}
          </div>
        </SpaceBetween>
      </ColumnLayout>
    </Container>
  );
};
