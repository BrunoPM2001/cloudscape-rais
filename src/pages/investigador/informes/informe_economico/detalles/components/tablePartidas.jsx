import { useCollection } from "@cloudscape-design/collection-hooks";
import {
  Box,
  FormField,
  Header,
  SpaceBetween,
  Table,
  Tabs,
  Textarea,
} from "@cloudscape-design/components";

const columnDefinitions = [
  {
    id: "partida",
    header: "Partida",
    cell: (item) => item.partida.label,
    sortingField: "partida",
  },
  {
    id: "total",
    header: "Monto",
    cell: (item) => item.monto,
    sortingField: "total",
  },
];

const columnDisplay = [
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

export default ({ distributions, item }) => {
  //  Hooks
  const { items, collectionProps } = useCollection(distributions, {
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
  });

  const obs = JSON.parse(item?.observacion ?? "[]");

  const tabs = [];

  //  Tabs de observación
  obs.map((item, index) => {
    tabs.push({
      id: "obs_" + index,
      label: "Observación " + (index + 1),
      content: <ObsTab obs={item.observacion} />,
    });
  });

  return (
    <SpaceBetween size="m">
      <Table
        {...collectionProps}
        trackBy="id"
        items={items}
        columnDefinitions={columnDefinitions}
        columnDisplay={columnDisplay}
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
      {tabs.length > 0 && <Tabs tabs={tabs} />}
    </SpaceBetween>
  );
};
