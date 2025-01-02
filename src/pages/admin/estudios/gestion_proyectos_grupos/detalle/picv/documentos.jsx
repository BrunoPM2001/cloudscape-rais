import {
  Table,
  Box,
  SpaceBetween,
  Header,
  Button,
} from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <Box>
    <Header title="Carta de Compromiso" />
    <SpaceBetween size="m">
      <h4>Carta de Compromiso</h4>
      {data && data.url ? (
  <Button
    ariaLabel="Carta de Compromiso"
    href={data.url}
    iconAlign="right"
    iconName="external"
    target="_blank"
  >
    Descargar Carta de Compromiso
  </Button>
) : (
  <span>No hay carta de compromiso disponible</span>
)}
       
    </SpaceBetween>
  </Box>
  );
};
