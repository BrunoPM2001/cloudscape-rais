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
        {
          id: "nombre",
          header: "Título del archivo",
          cell: (item) => item.nombre,
        },
        {
          id: "comentario",
          header: "Fecha de recepción",
          cell: (item) => item.comentario,
        },
        {
          id: "url",
          header: "Descargar",
          cell: (item) => (
            <Button
              variant="inline-icon"
              href={item.url}
              target="_blank"
              iconName="download"
            />
          ),
        },
      ]}
      columnDisplay={[
        { id: "nombre", visible: true },
        { id: "comentario", visible: true },
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
      header={<Header>Documentos del proyecto</Header>}
    />
  );
};
