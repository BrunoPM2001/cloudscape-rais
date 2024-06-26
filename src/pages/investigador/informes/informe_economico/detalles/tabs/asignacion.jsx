import {
  Box,
  Button,
  Header,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";

const columnDefinitions = [
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
    sortingField: "tipo",
  },
  {
    id: "partida",
    header: "Partida",
    cell: (item) => item.partida,
    sortingField: "partida",
  },
  {
    id: "monto",
    header: "Presupuesto asignado (S/)",
    cell: (item) => parseFloat(item.monto).toFixed(3),
    sortingField: "monto",
  },
  {
    id: "monto_rendido_enviado",
    header: "Monto rendido enviado (S/)",
    cell: (item) => parseFloat(item.monto_rendido_enviado).toFixed(3),
    sortingField: "monto_rendido_enviado",
  },
  {
    id: "monto_rendido",
    header: "Monto rendido validado DPGIP (S/)",
    cell: (item) => parseFloat(item.monto_rendido).toFixed(3),
    sortingField: "monto_rendido",
  },
  {
    id: "saldo_rendicion",
    header: "Saldo rendición (S/)",
    cell: (item) => parseFloat(item.monto - item.monto_rendido).toFixed(3),
    sortingField: "saldo_rendicion",
  },
  {
    id: "monto_excedido",
    header: "Excedido (S/)",
    cell: (item) => parseFloat(item.monto_excedido).toFixed(3),
    sortingField: "monto_excedido",
  },
];

const columnDisplay = [
  { id: "tipo", visible: true },
  { id: "partida", visible: true },
  { id: "monto", visible: true },
  { id: "monto_rendido_enviado", visible: true },
  { id: "monto_rendido", visible: true },
  { id: "saldo_rendicion", visible: true },
  { id: "monto_excedido", visible: true },
];

export default ({ data, loading }) => {
  return (
    <>
      <Table
        trackBy="codigo"
        items={data}
        columnDefinitions={columnDefinitions}
        columnDisplay={columnDisplay}
        loading={loading}
        loadingText="Cargando datos"
        resizableColumns
        header={
          <Header
            counter={"(" + data.length + ")"}
            actions={
              <Button variant="primary" iconName="download">
                Hoja de resumen
              </Button>
            }
          >
            Listado de partidas
          </Header>
        }
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
      />
    </>
  );
};
