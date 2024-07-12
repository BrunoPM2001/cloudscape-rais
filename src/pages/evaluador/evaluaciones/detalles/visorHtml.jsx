import { Box, Container, SpaceBetween } from "@cloudscape-design/components";

export default () => {
  return (
    <div
      style={{
        maxHeight: "400px",
        border: "1px solid #000",
        padding: "15px",
        overflow: "auto",
      }}
    >
      <Box variant="h3" textAlign="center">
        Programa de proyectos
      </Box>
      <hr />
      <Box variant="h3">INFORMACIÓN GENERAL</Box>
      <div
        style={{
          padding: "10px",
          marginTop: "15px",
          marginBottom: "15px",
          border: "1px solid #bbb",
        }}
      >
        <Box variant="p">
          <strong>Título: </strong>
          Agricultura
        </Box>
        <Box variant="p">
          <strong>Área temática: </strong>
          Biotecnologia
        </Box>
        <Box variant="p">
          <strong>Código OCDE: </strong>
          Ingeniería
        </Box>
        <Box variant="p">
          <strong>Objetivo de Desarrollo Sostenible (principal): </strong>
          Biotecnologia
        </Box>
        <Box variant="p">
          <strong>Principal lugar de ejecución del proyecto: </strong>
          Biotecnologia
        </Box>
      </div>
      {/* Resumen */}
      <div
        style={{
          padding: "10px",
          marginTop: "15px",
          marginBottom: "15px",
          border: "1px solid #bbb",
        }}
      >
        <Box variant="h4">Resumen Ejecutivo</Box>
        <Box variant="p">Resumen</Box>
      </div>
      <div
        style={{
          padding: "10px",
          marginTop: "15px",
          marginBottom: "15px",
          border: "1px solid #bbb",
        }}
      >
        <Box variant="h4">Palabras claves</Box>
        <Box variant="p">palabras, clave</Box>
      </div>
    </div>
  );
};
