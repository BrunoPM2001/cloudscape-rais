import { Button, SpaceBetween, Box } from "@cloudscape-design/components";

const rowT = {
  border: "1px solid #ddd",
  textAlign: "left",
  padding: "8px",
};

const justifyText = {
  textAlign: "justify",
};

const styles = {
  container: {
    marginTop: "15px",
    marginBottom: "20px",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    margin: "0 auto",
    borderCollapse: "collapse",
    fontFamily: "Times New Roman, serif",
    fontSize: "12pt",
    lineHeight: "1.5",
  },
  thead: {
    backgroundColor: "#f2f2f2",
  },
  th: {
    textAlign: "left",
    padding: "0px",
  },
  td: {
    padding: "2px",
    borderBottom: "1px solid #000",
  },
  rowT: {
    textAlign: "left",
    padding: "8px",
    borderBottom: "1px solid #000",
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  },
  rowEven: {
    backgroundColor: "#ffffff", // Color para las filas pares
  },
  rowOdd: {
    backgroundColor: "#f2f2f2", // Color para las filas impares
  },
};

const Eci = ({ data }) => {
  const rows = [
    { label: "Título", value: data.proyecto?.titulo || "No disponible" },
  ];

  const resumenPresupuesto = {
    Bienes: { cantidad: 0, monto: 0 },
    Servicios: { cantidad: 0, monto: 0 },
    Otros: { cantidad: 0, monto: 0 },
  };

  data.presupuesto.forEach((item) => {
    if (resumenPresupuesto[item.tipo]) {
      resumenPresupuesto[item.tipo].cantidad += 1;
      resumenPresupuesto[item.tipo].monto += Number(item.monto); // Asegurar que es número
    }
  });

  const montoTotal = Object.values(resumenPresupuesto).reduce(
    (acc, curr) => acc + curr.monto,
    0
  );

  Object.keys(resumenPresupuesto).forEach((tipo) => {
    resumenPresupuesto[tipo].porcentaje =
      montoTotal > 0
        ? ((resumenPresupuesto[tipo].monto / montoTotal) * 100).toFixed(2)
        : "0.00";
  });

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        PROGRAMA DE EQUIPAMIENTO CIENTÍFICO PARA LA
      </h1>
      <h1 style={{ textAlign: "center" }}>
        {" "}
        INVESTIGACIÓN DE LA UNMSM (ECI) - 2025
      </h1>

      <hr />
      <br />
      <h1>Información General</h1>
      <br />

      <div style={styles.container}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}></th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
              >
                <td style={styles.td}>
                  <strong>{row.label}</strong>
                </td>
                <td style={styles.td}>: {row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <h1>
        <b></b>
      </h1>
      <br />
      <h2>
        <b>A. Resumen</b>
      </h2>
      <div
        style={justifyText}
        dangerouslySetInnerHTML={{
          __html: data.detalles.resumen,
        }}
      ></div>
      <h2>
        <b>B. Justificacion de la propuesta</b>
      </h2>
      <div
        style={justifyText}
        dangerouslySetInnerHTML={{
          __html: data.detalles.justificacion,
        }}
      ></div>
      <h2>
        <b>C. Propuesta de equipaminto científico</b>
      </h2>
      <div
        style={justifyText}
        dangerouslySetInnerHTML={{
          __html: data.detalles.propuesta,
        }}
      ></div>

      <h2>
        <b>D.Especificaciones</b>
      </h2>
      <div
        style={justifyText}
        dangerouslySetInnerHTML={{
          __html: data.detalles.justificacion,
        }}
      ></div>
      <h2>
        <b>E. Especificaciones</b>
      </h2>
      <h3>Nombre del equipo</h3>
      <div
        style={justifyText}
        dangerouslySetInnerHTML={{
          __html: data.detalles.nombre_equipo,
        }}
      ></div>
      <h3>Descripción del equipo</h3>
      <div
        style={justifyText}
        dangerouslySetInnerHTML={{
          __html: data.detalles.desc_equipo,
        }}
      ></div>
      <h3>Cotizaciones de equipo</h3>

      {data.archivocotizacion && data.archivocotizacion.length > 0 ? (
        <div style={styles.container}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.rowT}>Nombre</th>
                <th style={styles.rowT}>Comentario</th>
                <th style={styles.rowT}>Archivo</th>
              </tr>
            </thead>
            <tbody>
              {data.archivocotizacion.map((doc, index) => (
                <tr
                  key={doc.id}
                  style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
                >
                  <td style={styles.td}>{doc.nombre}</td>
                  <td style={styles.td}>{doc.comentario}</td>
                  <td style={styles.td}>
                    <a
                      href={doc.archivo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver documento
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No se han registrado documentos de colaboración externa.</p>
      )}

      <h2>
        <b>F. Impacto</b>
      </h2>
      <h3>Impacto de la Propuesta</h3>
      <div
        style={justifyText}
        dangerouslySetInnerHTML={{
          __html: data.detalles.impacto_propuesta,
        }}
      ></div>
      <h3>Plan de manejo de residuos/afluentes o emisiones</h3>
      <div
        style={justifyText}
        dangerouslySetInnerHTML={{
          __html: data.detalles.plan_manejo,
        }}
      ></div>
      <h3>Documentos complementarios</h3>

      {data.archivoeci && data.archivoeci.length > 0 ? (
        <div style={styles.container}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.rowT}>Nombre</th>
                <th style={styles.rowT}>Comentario</th>
                <th style={styles.rowT}>Archivo</th>
              </tr>
            </thead>
            <tbody>
              {data.archivoeci.map((doc, index) => (
                <tr
                  key={doc.id}
                  style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
                >
                  <td style={styles.td}>{doc.nombre}</td>
                  <td style={styles.td}>{doc.comentario}</td>
                  <td style={styles.td}>
                    <a
                      href={doc.archivo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver documento
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No se han registrado documentos de colaboración externa.</p>
      )}

      <div style={styles.container}>
        <h2>
          <b>G. Presupuesto</b>
        </h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={rowT}>Tipo</th>
              <th style={rowT}>Código</th>
              <th style={rowT}>Partida</th>
              <th style={rowT}>Justificación</th>
              <th style={rowT}>Monto S/.</th>
            </tr>
          </thead>
          <tbody>
            {data.presupuesto.map((item) => {
              return (
                <tr>
                  <td style={rowT}>{item.tipo}</td>
                  <td style={rowT}>{item.codigo}</td>
                  <td style={rowT}>{item.partida}</td>
                  <td style={rowT}>{item.justificacion}</td>
                  <td style={rowT}>{item.monto}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={rowT}>Bienes</th>
              <th style={rowT}>Servicios</th>
              <th style={rowT}>Otros</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={rowT}>
                Cantidad: {resumenPresupuesto.Bienes.cantidad}
              </td>
              <td style={rowT}>
                Cantidad: {resumenPresupuesto.Servicios.cantidad}
              </td>
              <td style={rowT}>
                Cantidad: {resumenPresupuesto.Otros.cantidad}
              </td>
            </tr>
            <tr>
              <td style={rowT}>
                Monto: S/{" "}
                {resumenPresupuesto.Bienes.monto.toLocaleString("es-PE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td style={rowT}>
                Monto: S/{" "}
                {resumenPresupuesto.Servicios.monto.toLocaleString("es-PE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td style={rowT}>
                Monto: S/{" "}
                {resumenPresupuesto.Otros.monto.toLocaleString("es-PE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
            <tr>
              <td style={rowT}>
                Porcentaje: {resumenPresupuesto.Bienes.porcentaje}%
              </td>
              <td style={rowT}>
                Porcentaje: {resumenPresupuesto.Servicios.porcentaje}%
              </td>
              <td style={rowT}>
                Porcentaje: {resumenPresupuesto.Otros.porcentaje}%
              </td>
            </tr>
            <tr>
              <td style={{ ...rowT, fontWeight: "bold" }} colSpan="3">
                Monto Total: S/{" "}
                {montoTotal.toLocaleString("es-PE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Eci;
