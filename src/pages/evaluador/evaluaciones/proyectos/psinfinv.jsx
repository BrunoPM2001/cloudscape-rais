import { Button } from "@cloudscape-design/components";

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

const Psinfinv = ({ data }) => {
  console.log("🧪 data:", data);
  console.log("📂 data.documentos:", data.documentos);
  console.log("📄 METODOLOGIA_TRABAJO:", data.documentos?.METODOLOGIA_TRABAJO);
  console.log("📄 PROPIEDAD_INTELECTUAL:", data.documentos?.PROPIEDAD_INTELECTUAL);
  console.log("🔍 Archivo propiedad (archivos):", data.archivos?.propiedad);

  const rows = [
    { label: "Título", value: data.proyecto?.titulo || "No disponible" },
    {
      label: "Grupo de Investigación",
      value: data.proyecto?.grupo || "No disponible",
    },
    { label: "Área académica", value: data.proyecto?.area || "No disponible" },
    {
      label: "Unidad de investigación",
      value: data.proyecto?.facultad || "No disponible",
    },
    { label: "Facultad", value: data.proyecto?.facultad || "No disponible" },
    {
      label: "Línea de investigación",
      value: data.proyecto?.linea_investigacion || "No disponible",
    },
    {
      label: "Tipo de investigación",
      value: data.detalles["tipo_investigacion"] ?? "No disponible",
    },
    {
      label: "Localización",
      value: data.proyecto?.localizacion || "No disponible",
    },
    { label: "Línea OCDE", value: data.proyecto?.ocde || "No disponible" },
  ];

  console.log("📦 Archivos finales:", data.archivos);
  console.log("📦 Documentos finales:", data.documentos);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Proyecto de Investigación - Sin Financiamiento (PSINFINV)
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
        <b>Descripción del proyecto</b>
      </h1>
      <br />
      <h2>
        <b>A. Resumen</b>
      </h2>
      <div
        style={justifyText}
        dangerouslySetInnerHTML={{
          __html: data.detalles.resumen_ejecutivo,
        }}
      ></div>
      <h2>
        <b>B. Antecedentes</b>
      </h2>
      <div
        style={justifyText}
        dangerouslySetInnerHTML={{
          __html: data.detalles.antecedentes,
        }}
      ></div>
      <h2>
        <b>C. Objetivos</b>
      </h2>
      <h4>C.1 Objetivo General</h4>
      <div
        style={justifyText}
        dangerouslySetInnerHTML={{
          __html: data.detalles.objetivos_generales,
        }}
      ></div>
      <h4>C.2 Objetivos Específicos</h4>
      <div
        style={justifyText}
        dangerouslySetInnerHTML={{
          __html: data.detalles.objetivos_especificos,
        }}
      ></div>
      <h2>
        <b>D. Justificación</b>
      </h2>
      <div
        style={justifyText}
        dangerouslySetInnerHTML={{
          __html: data.detalles.justificacion,
        }}
      ></div>
      <h2>
        <b>E. Hipotesis</b>
      </h2>
      <div
        style={justifyText}
        dangerouslySetInnerHTML={{
          __html: data.detalles.hipotesis,
        }}
      ></div>
      <h2>
        <b>F. Metodología de Trabajo</b>
      </h2>
      <div
        style={justifyText}
        dangerouslySetInnerHTML={{
          __html: data.detalles.metodologia_trabajo,
        }}
      ></div>
      <div>
        {data.documentos.recurso == "METODOLOGIA_TRABAJO" ? (
          <Button
            ariaLabel="Archivo de metodología de trabajo"
            href={data.documentos.METODOLOGIA_TRABAJO}
            iconAlign="right"
            iconName="external"
            variant="primary"
            fontSize="body-s"
            target="_blank"
          >
            Descargar archivo
          </Button>
        ) : (
          <>No se cargó ningún archivo</>
        )}
      </div>
      <h2>
        <b>G. Propiedad Intelectual </b>
      </h2>
      <div>
        console.log("📌 Renderizando bloque de propiedad intelectual");
        console.log("📁 En documentos:", data.documentos?.PROPIEDAD_INTELECTUAL);

        {data.documentos?.PROPIEDAD_INTELECTUAL ? (
          <>
            <Button
              ariaLabel="Archivo de propiedad intelectual"
              href={data.documentos?.PROPIEDAD_INTELECTUAL}
              iconAlign="right"
              iconName="external"
              variant="primary"
              fontSize="body-s"
              target="_blank"
            >
              Descargar archivo
            </Button>
          </>
        ) : (
          <>
            <b>No se cargó ningún archivo</b>
          </>
        )}
      </div>
      <h2>
        <b>H. Referencias Bibliograficas </b>
      </h2>
      <div
        style={justifyText}
        dangerouslySetInnerHTML={{
          __html: data.detalles.referencias_bibliograficas,
        }}
      ></div>
      <div style={styles.container}>
        <h2>
          <b>I. Calendarios Actividades</b>
        </h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.rowT}>Actividad</th>
              <th style={styles.rowT}>Justificación</th>
              <th style={styles.rowT}>Fecha inicial</th>
              <th style={styles.rowT}>Fecha final</th>
            </tr>
          </thead>
          <tbody>
            {data.calendario.map((item, index) => (
              <tr
                key={index}
                style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
              >
                <td style={styles.td}>{item.actividad}</td>
                <td style={styles.td}>{item.justificacion}</td>
                <td style={styles.td}>{item.fecha_inicio}</td>
                <td style={styles.td}>{item.fecha_fin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={styles.container}>
        <h2>
          <b>J. Integrantes</b>
        </h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.rowT}>Tipo Integrante</th>
              <th style={styles.rowT}>Apellidos y Nombres</th>
              <th style={styles.rowT}>Tipo</th>
              <th style={styles.rowT}>Facultad</th>
              <th style={styles.rowT}>Tipo integrante en el grupo</th>
              <th style={styles.rowT}>Tipo Tesis</th>
              <th style={styles.rowT}>Titulo Tesis</th>
            </tr>
          </thead>
          <tbody>
            {data.integrantes.map((item, index) => (
              <tr
                key={index}
                style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
              >
                <td style={styles.td}>{item.tipo_integrante}</td>
                <td style={styles.td}>{item.integrante}</td>
                <td style={styles.td}>{item.tipo}</td>
                <td style={styles.td}>{item.facultad}</td>
                <td style={styles.td}>{item.tipo_integrante_grupo}</td>
                <td style={styles.td}>{item.tipo_tesis}</td>
                <td style={styles.td}>{item.titulo_tesis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Psinfinv;
