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
          id: "tipo_integrante",
          header: "Tipo de integrante",
          cell: (item) => item.tipo_integrante,
        },
        {
          id: "nombre",
          header: "Nombre",
          cell: (item) => item.nombre,
        },
        {
          id: "tipo",
          header: "Tipo",
          cell: (item) => item.tipo,
        },
        {
          id: "facultad",
          header: "Facultad",
          cell: (item) => item.facultad,
        },
        {
          id: "url",
          header: "Carta de compromiso",
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
        { id: "tipo_integrante", visible: true },
        { id: "nombre", visible: true },
        { id: "tipo", visible: true },
        { id: "facultad", visible: true },
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
