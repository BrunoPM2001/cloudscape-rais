import {
  Alert,
  Badge,
  Box,
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
    header: "Presupuesto (S/)",
    cell: (item) =>
      item.partida == null ? "" : parseFloat(item.monto).toFixed(3),
    sortingField: "monto",
  },
  {
    id: "operacion",
    header: "Transferencia (S/)",
    cell: (item) =>
      item.operacion == null ? (
        ""
      ) : item.operacion == "+" ? (
        <Badge color="blue">+{item.transferencia}</Badge>
      ) : item.operacion == "-" ? (
        <Badge color="red">-{item.transferencia}</Badge>
      ) : (
        ""
      ),
    sortingField: "operacion",
  },
  {
    id: "monto_nuevo",
    header: "Nuevo presupuesto (S/)",
    cell: (item) =>
      item.operacion == null ? "" : parseFloat(item.monto_nuevo).toFixed(3),
    sortingField: "monto_nuevo",
  },
];

const columnDisplay = [
  { id: "tipo", visible: true },
  { id: "partida", visible: true },
  { id: "monto", visible: true },
  { id: "operacion", visible: true },
  { id: "monto_nuevo", visible: true },
];

export default ({ data, loading, estado }) => {
  return (
    <SpaceBetween size="m">
      {estado == 3 && (
        <Alert header="Se ha solicitado este nuevo presupuesto para su aprobación" />
      )}
      <Table
        trackBy="tipo"
        items={data}
        columnDefinitions={columnDefinitions}
        columnDisplay={columnDisplay}
        loading={loading}
        loadingText="Cargando datos"
        resizableColumns
        expandedItems={[
          { tipo: "Bienes" },
          { tipo: "Servicios" },
          { tipo: "Otros" },
        ]}
        expandableRows={{
          getItemChildren: (item) => item.children,
          isItemExpandable: (item) => Boolean(item.children),
          expandedItems: [
            { tipo: "Bienes" },
            { tipo: "Servicios" },
            { tipo: "Otros" },
          ],
        }}
        header={
          <Header counter={"(" + data.length + ")"}>Listado de partidas</Header>
        }
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
      />
    </SpaceBetween>
  );
};
