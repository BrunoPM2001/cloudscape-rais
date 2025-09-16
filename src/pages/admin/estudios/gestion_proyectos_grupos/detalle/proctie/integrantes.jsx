import {
  Table,
  Box,
  SpaceBetween,
  Header,
  Button,
} from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <Table
      columnDefinitions={[
        { id: "id", header: "Id", cell: (item) => item.id },
        {
          id: "tipo_integrante",
          header: "Tipo de integrante",
          cell: (item) => item.tipo_integrante,
        },
        { id: "nombre", header: "Nombre", cell: (item) => item.nombre },
        {
          id: "tipo_investigador",
          header: "Tipo de investigador",
          cell: (item) => item.tipo,
        },
        {
          id: "url",
          header: "Carta de compromiso",
          cell: (item) => (
            <Button
              variant="inline-icon"
              href={item.url}
              target="_blank"
              iconName="file"
            />
          ),
        },
      ]}
      columnDisplay={[
        { id: "id", visible: true },
        { id: "tipo_integrante", visible: true },
        { id: "nombre", visible: true },
        { id: "tipo_investigador", visible: true },
        { id: "url", visible: true },
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
      header={<Header>Integrantes del proyecto</Header>}
    />
  );
};
