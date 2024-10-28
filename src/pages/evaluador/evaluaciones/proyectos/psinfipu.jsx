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

const Psinfipu = ({ data }) => {


    const rows = [
        { label: "Título", value: data.proyecto?.titulo || "-" },
        { label: "Grupo de Investigación", value: data.proyecto?.grupo || "-" },
        { label: "Área académica", value: data.proyecto?.area || "-" },
        { label: "Unidad de investigación", value: data.proyecto?.facultad || "-" },
        { label: "Facultad", value: data.proyecto?.facultad || "-" },
        { label: "Línea de investigación", value: data.proyecto?.linea_investigacion || "-" },
        { label: "Tipo de investigación", value: data.proyecto?.linea || "-" },
        { label: "Localización", value: data.proyecto?.localizacion || "-" },
        { label: "Línea OCDE", value: data.proyecto?.ocde || "-" },
    ];

    const descripcion = [
        { label:" Responsable de la investigación previa" , value: data.responsable?.responsable || "-" },
        { label:" Responsable del proyecto de redacción académica" , value: data.responsable?.responsable || "-" },
        { label:" ORCID" , value: data.responsable?.orcid || "-" },
        { label:" SCOPUS" , value: data.responsable?.scopus_id || "-" },
        { label:" GOOGLE SCOLAR" , value: data.responsable?.google_scholar || "-" },
        { label:" Editorial o revista en la que se publicará" , value: data.responsable?.editorial || "-" },
        { label:" URL en donde que se publicará" , value: data.responsable?.url || "-" },
        { label:" Tipo de publicación que realizará la propuesta" , value: data.responsable?.tipo_publicacion || "-" },
    ];

    const investigación_base = [
        {label: "Tesis maestria", value: "Documento sustentatorio recibido el 2024-10-02 09:42:02 (Click para Ver)"},
        {label: "Tesis Doctorado", value: "Documento sustentatorio recibido el 2024-10-02 09:42:02 (Click para Ver)"},
        {label: "Investigación UNMSM", value: "C19070811 - PCONFIGI - ESTUDIO FENOMENOLOGICO TEÓRICO-EXPERIMENTAL DE LAS PROPIEDADES ELECTRÓNICAS EN NANOESTRUCTURAS TIPO MOLIBDENO-COBRE (Mo-Cu) Y MOLIBDENO PLATA (Mo-Ag) APLICANDO RADIACIÓN MICROONDAS (Click para Ver)"},
    ];
     

    return (
        <div>

            <h1 style={{ textAlign: "center" }}>Proyecto de Publicación Academica (PSINFIPU)</h1>

            <hr /><br />
            <h2>Información del Grupo de Investigación</h2><br />

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
            <h2><b>Descripción del proyecto</b></h2><br />
            <div style={styles.container}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.thead}>
                            <th style={styles.th}></th>
                            <th style={styles.th}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {descripcion.map((row, index) => (
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
            <h2><b>Investigación base</b></h2><br />
            <div style={styles.container}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.thead}>
                            <th style={styles.th}></th>
                            <th style={styles.th}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {investigación_base.map((row, index) => (
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

export default Psinfipu;