import { useCollection } from "@cloudscape-design/collection-hooks";
import {
  Box,
  ColumnLayout,
  FormField,
  Header,
  Select,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";

const columnDefinitions = [
  {
    id: "codigo",
    header: "Código",
    cell: (item) => item.codigo,
    sortingField: "codigo",
    isRowHeader: true,
  },
  {
    id: "partida",
    header: "Partida",
    cell: (item) => item.partida,
    sortingField: "partida",
  },
  {
    id: "total",
    header: "Monto",
    cell: (item) => item.total,
    sortingField: "total",
  },
];

const columnDisplay = [
  { id: "codigo", visible: true },
  { id: "partida", visible: true },
  { id: "total", visible: true },
];

export default ({
  item,
  loading,
  distributions,
  formValues,
  formErrors,
  handleChange,
  optsEstado,
}) => {
  //  Hooks
  const { items, collectionProps } = useCollection(distributions, {
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
  });

  return (
    <SpaceBetween size="m">
      <ColumnLayout columns={2}>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Razón social</Box>
            <div>{item.razon_social}</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Ruc del emisor</Box>
            <div>{item.ruc}</div>
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Serie + N° comprobante</Box>
            <div>{item.numero}</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Fecha</Box>
            <div>{item.fecha}</div>
          </div>
        </SpaceBetween>
      </ColumnLayout>
      <FormField
        label="Cumple con los requisitos"
        stretch
        errorText={formErrors.estado}
      >
        <Select
          placeholder="Escoja una opción"
          selectedOption={formValues.estado}
          onChange={({ detail }) =>
            handleChange("estado", detail.selectedOption)
          }
          options={optsEstado}
        />
      </FormField>
      <Table
        {...collectionProps}
        trackBy="id"
        items={items}
        columnDefinitions={columnDefinitions}
        columnDisplay={columnDisplay}
        loading={loading}
        loadingText="Cargando datos"
        resizableColumns
        enableKeyboardNavigation
        header={<Header variant="h3">Partidas</Header>}
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
