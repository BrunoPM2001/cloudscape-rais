import {
  Alert,
  Badge,
  Box,
  Container,
  Header,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";

export default ({ data }) => {
  return (
    <Container
      header={
        <Header
          variant="h3"
          actions={
            <Badge color={data.cumple ? "green" : "red"}>
              {data.cumple ? "Sí cumple" : "No cumple"}
            </Badge>
          }
          description="Necesita tener al menos una publicación con filiación UNMSM para cumplir este requisito (Art. 12 Procedimiento para ser evaluado y designado docente investigador de la UNMSM)"
        >
          D4
        </Header>
      }
    >
      <Alert
        dismissible
        statusIconAriaLabel="Info"
        header="Articulo 12° Procedimientos para ser evaluado y designado docente investigador de la UNMSM"
      >
        <ul style={{ paddingLeft: "16px", margin: 0 }}>
          b) El VRIP realizará la evaluación de las actividades de investigación
          de los docentes con base en la información registrada en el RAIS
          <a
            href="https://vrip.unmsm.edu.pe/wp-content/uploads/2024/07/RR_009077-2024-R.pdf"
            target="_blank"
          >
            {" "}
            (Descargar Directiva)
          </a>
        </ul>
        <ul style={{ paddingLeft: "16px", margin: 0 }}>
          <li>
            Todas las publicaciones deben tener Filiación UNMSM. En caso
            contrario la solicitud debe ser <b>OBSERVADA</b>.
          </li>
        </ul>
      </Alert>
      <Table
        variant="embedded"
        wrapLines
        columnDefinitions={[
          {
            id: "titulo",
            header: "Título",
            cell: (item) => item.titulo,
            isRowHeader: true,
          },
          {
            id: "tipo_publicacion",
            header: "Tipo",
            cell: (item) => item.tipo_publicacion,
          },
          {
            id: "periodo",
            header: "Periodo",
            cell: (item) => item.periodo,
          },
          {
            id: "codigo_registro",
            header: "Código",
            cell: (item) => item.codigo_registro,
          },
          {
            id: "indexada",
            header: "Revista indexada",
            cell: (item) => item.indexada,
          },
          {
            id: "filiacion",
            header: "Filiación UNMSM",
            cell: (item) => item.filiacion,
          },
          {
            id: "filiacion_unica",
            header: "Filiación única",
            cell: (item) => item.filiacion_unica,
          },
        ]}
        columnDisplay={[
          { id: "titulo", visible: true },
          { id: "tipo_publicacion", visible: true },
          { id: "periodo", visible: true },
          { id: "codigo_registro", visible: true },
          { id: "indexada", visible: true },
          { id: "filiacion", visible: true },
          { id: "filiacion_unica", visible: true },
        ]}
        items={data.lista}
        empty={
          <Box margin={{ vertical: "xxxs" }} textAlign="center" color="inherit">
            <SpaceBetween size="s">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
      />
    </Container>
  );
};
