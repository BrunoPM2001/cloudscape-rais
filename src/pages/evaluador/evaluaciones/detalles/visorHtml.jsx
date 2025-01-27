import { Box, Spinner } from "@cloudscape-design/components";
import Psinfinv from "../proyectos/psinfinv";
import Psinfipu from "../proyectos/psinfipu";
import Pconfigi from "../proyectos/pconfigi";

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
            {data.proyecto.tipo_proyecto === "PSINFINV" ? (
              <Psinfinv data={data} />
            ) : data.proyecto.tipo_proyecto === "PSINFIPU" ? (
              <Psinfipu data={data} />
            ) : data.proyecto.tipo_proyecto === "PCONFIGI" ? (
              <Pconfigi data={data} />
            ) : (
              <p>Proyecto no reconocido</p>
            )}
            {/* <Psinfinv data={data} /> Uso del componente importado */}
            {/* <div
              style={{
                padding: "10px",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            > */}
            {/* <Box variant="h3">I. Presupuesto</Box>
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
              </table> */}
            {/* </div> */}
          </>
        )}
      </div>
    </Box>
  );
};
