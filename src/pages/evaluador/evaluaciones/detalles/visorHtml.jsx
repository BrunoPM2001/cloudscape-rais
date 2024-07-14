import { Box, Spinner } from "@cloudscape-design/components";

const rowT = {
  border: "1px solid #ddd",
  textAlign: "left",
  padding: "8px",
};

export default ({ loading, data }) => {
  return (
    <Box>
      <div
        style={{
          maxHeight: "400px",
          border: "1px solid #000",
          padding: "15px",
          overflow: "auto",
        }}
      >
        {loading ? (
          <>
            <Spinner /> Cargando información del proyecto
          </>
        ) : (
          <>
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
                {data.proyecto.titulo}
              </Box>
              <Box variant="p">
                <strong>Área temática: </strong>
                {data.detalles.area_tematica}
              </Box>
              <Box variant="p">
                <strong>Código OCDE: </strong>
                {data.proyecto.linea}
              </Box>
              <Box variant="p">
                <strong>Principal lugar de ejecución del proyecto: </strong>
                {data.proyecto.localizacion}
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
              <div
                dangerouslySetInnerHTML={{
                  __html: data.detalles.resumen_ejecutivo,
                }}
              ></div>
            </div>
            <div
              style={{
                padding: "10px",
                border: "1px solid #bbb",
              }}
            >
              <Box variant="h4">Palabras claves</Box>
              <div>{data.proyecto.palabras_clave}</div>
            </div>
            <div
              style={{
                padding: "10px",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <Box variant="h3">A. Estado del arte</Box>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.detalles.estado_arte,
                }}
              ></div>
            </div>
            <div
              style={{
                padding: "10px",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <Box variant="h3">B. Planteamiento del problema</Box>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.detalles.planteamiento_problema,
                }}
              ></div>
            </div>
            <div
              style={{
                padding: "10px",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <Box variant="h3">C. Justificación</Box>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.detalles.justificacion,
                }}
              ></div>
            </div>
            <div
              style={{
                padding: "10px",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <Box variant="h3">D. Contribución e impacto</Box>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.detalles.contribucion_impacto,
                }}
              ></div>
            </div>
            <div
              style={{
                padding: "10px",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <Box variant="h3">E. Objetivos</Box>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.detalles.objetivos,
                }}
              ></div>
            </div>
            <div
              style={{
                padding: "10px",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <Box variant="h3">F. Metodología de trabajo</Box>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.detalles.metodologia_trabajo,
                }}
              ></div>
            </div>
            <div
              style={{
                padding: "10px",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <Box variant="h3">G. Referencias bibliográficas</Box>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.detalles.referencias_bibliograficas,
                }}
              ></div>
            </div>
            <div
              style={{
                padding: "10px",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <Box variant="h3">H. Calendario de actividades</Box>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <tr>
                  <th style={rowT}>Actividad</th>
                  <th style={rowT}>Justificación</th>
                  <th style={rowT}>Fecha inicial</th>
                  <th style={rowT}>Fecha final</th>
                </tr>
                {data.calendario.map((item) => {
                  return (
                    <tr>
                      <td style={rowT}>{item.actividad}</td>
                      <td style={rowT}>{item.justificacion}</td>
                      <td style={rowT}>{item.fecha_inicio}</td>
                      <td style={rowT}>{item.fecha_fin}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
            {/* <div
              style={{
                padding: "10px",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <Box variant="h3">I. Colaboración externa</Box>
            </div> */}
            <div
              style={{
                padding: "10px",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <Box variant="h3">I. Presupuesto</Box>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <tr>
                  <th style={rowT}>Código</th>
                  <th style={rowT}>Partida</th>
                  <th style={rowT}>Justificación</th>
                  <th style={rowT}>Monto S/.</th>
                  <th style={rowT}>Tipo</th>
                </tr>
                {data.presupuesto.map((item) => {
                  return (
                    <tr>
                      <td style={rowT}>{item.codigo}</td>
                      <td style={rowT}>{item.partida}</td>
                      <td style={rowT}>{item.justificacion}</td>
                      <td style={rowT}>{item.monto}</td>
                      <td style={rowT}>{item.tipo}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
            {/* <div
              style={{
                padding: "10px",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <Box variant="h3">K. Tesistas</Box>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <tr>
                  <th style={rowT}>Código</th>
                  <th style={rowT}>Partida</th>
                  <th style={rowT}>Justificación</th>
                  <th style={rowT}>Monto S/.</th>
                  <th style={rowT}>Tipo</th>
                </tr>
                {data.presupuesto.map((item) => {
                  return (
                    <tr>
                      <td style={rowT}>{item.codigo}</td>
                      <td style={rowT}>{item.partida}</td>
                      <td style={rowT}>{item.justificacion}</td>
                      <td style={rowT}>{item.monto}</td>
                      <td style={rowT}>{item.tipo}</td>
                    </tr>
                  );
                })}
              </table>
            </div> */}
          </>
        )}
      </div>
    </Box>
  );
};
