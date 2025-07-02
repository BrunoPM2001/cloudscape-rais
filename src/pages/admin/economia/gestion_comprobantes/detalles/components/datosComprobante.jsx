import { useCollection } from "@cloudscape-design/collection-hooks";
import {
  Box,
  ColumnLayout,
  FormField,
  Header,
  Select,
  SpaceBetween,
  Table,
  Tabs,
  Textarea,
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

const ObsTab = ({ obs }) => {
  return (
    <FormField label="Observación" stretch>
      <Textarea disabled value={obs} />
    </FormField>
  );
};

export default ({
  item,
  datos,
  loading,
  distributions,
  formValues,
  formErrors,
  handleChange,
  optsEstado,
}) => {
  const obs = JSON.parse(item.observacion);

  const tabs = [
    {
      id: "obs",
      label: "Nueva observación",
      content: (
        <FormField
          label="Observación"
          stretch
          errorText={formErrors.observacion}
        >
          <Textarea
            placeholder="Escriba algo"
            value={formValues.observacion}
            onChange={({ detail }) => handleChange("observacion", detail.value)}
          />
        </FormField>
      ),
    },
  ];

  //  Tabs de observación
  obs.map((item, index) => {
    tabs.push({
      id: "obs_" + index,
      label: "Observación " + (index + 1),
      content: <ObsTab obs={item.observacion} />,
    });
  });

  //  Hooks
  const { items, collectionProps } = useCollection(distributions, {
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
  });

  return (
    <SpaceBetween size="m">
      <ColumnLayout columns={2}>
        {datos.tipo == "OTROS" ? (
          <>
            <SpaceBetween size="s">
              <div>
                <Box variant="awsui-key-label">País emisor</Box>
                <div>{datos?.pais_emisor}</div>
              </div>
              <div>
                <Box variant="awsui-key-label">Tipo de moneda</Box>
                <div>{datos?.tipo_moneda}</div>
              </div>
            </SpaceBetween>
            <SpaceBetween size="s">
              <div>
                <Box variant="awsui-key-label">Tipo documento</Box>
                <div>{datos?.tipo_documento}</div>
              </div>
              <div>
                <Box variant="awsui-key-label">Fecha</Box>
                <div>{datos?.fecha}</div>
              </div>
            </SpaceBetween>
          </>
        ) : (
          <>
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
          </>
        )}
      </ColumnLayout>
      <ColumnLayout columns={1}>
        <SpaceBetween size="m">
          <FormField label="Descripción de compra" stretch>
            <Textarea disabled={true} value={item.descripcion_compra} />
          </FormField>
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
      {formValues.estado?.value == 3 && <Tabs tabs={tabs} />}
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
