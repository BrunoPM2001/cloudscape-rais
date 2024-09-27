import {
  Table,
  Box,
  SpaceBetween,
  Header,
} from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <Table
      columnDefinitions={[
        {
          id: "tipo_integrante",
          header: "Tipo de integrante",
          cell: (item) => item.tipo_integrante,
        },
        {
          id: "cargo",
          header: "Cargo",
          cell: (item) => item.cargo,
        },
        {
          id: "nombre",
          header: "Nombre",
          cell: (item) => item.nombre,
        },
        {
          id: "doc_numero",
          header: "DNI",
          cell: (item) => item.doc_numero,
        },
        {
          id: "codigo",
          header: "Código",
          cell: (item) => item.codigo,
        },
        {
          id: "email3",
          header: "Correo institucional",
          cell: (item) => item.email3,
        },
      ]}
      columnDisplay={[
        { id: "tipo_integrante", visible: true },
        { id: "cargo", visible: true },
        { id: "nombre", visible: true },
        { id: "doc_numero", visible: true },
        { id: "codigo", visible: true },
        { id: "email3", visible: true },
      ]}
      enableKeyboardNavigation
      items={data}
      loadingText="Cargando datos"
      loading={loading}
      wrapLines
      trackBy="id"
      empty={
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay registros...</b>
          </SpaceBetween>
        </Box>
      }
      header={<Header>Integrantes del comité</Header>}
    />
  );
};
