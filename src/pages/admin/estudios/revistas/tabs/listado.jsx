import {
  Box,
  Button,
  Header,
  Pagination,
  PropertyFilter,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "ID",
    key: "id",
    groupValuesLabel: "IDs",
    operators: stringOperators,
  },
  {
    propertyLabel: "ISSN",
    key: "issn",
    groupValuesLabel: "ISSNs",
    operators: stringOperators,
  },
  {
    propertyLabel: "ISSNE",
    key: "issne",
    groupValuesLabel: "ISSNEs",
    operators: stringOperators,
  },
  {
    propertyLabel: "Revista",
    key: "revista",
    groupValuesLabel: "Revistas",
    operators: stringOperators,
  },
  {
    propertyLabel: "Casa",
    key: "casa",
    groupValuesLabel: "Casas",
    operators: stringOperators,
  },
  {
    propertyLabel: "ISI",
    key: "isi",
    groupValuesLabel: "ISIs",
    operators: stringOperators,
  },
  {
    propertyLabel: "País",
    key: "pais",
    groupValuesLabel: "Países",
    operators: stringOperators,
  },
  {
    propertyLabel: "Cobertura",
    key: "cobertura",
    groupValuesLabel: "Coberturas",
    operators: stringOperators,
  },
];

const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item) => item.id,
    sortingField: "id",
    isRowHeader: true,
  },
  {
    id: "issn",
    header: "ISSN",
    cell: (item) => item.issn,
    sortingField: "issn",
  },
  {
    id: "issne",
    header: "ISSNE",
    cell: (item) => item.issne,
    sortingField: "issne",
  },
  {
    id: "revista",
    header: "Revista",
    cell: (item) => item.revista,
    sortingField: "revista",
  },
  {
    id: "casa",
    header: "Casa",
    cell: (item) => item.casa,
    sortingField: "casa",
  },
  {
    id: "isi",
    header: "Isi",
    cell: (item) => item.isi,
    sortingField: "isi",
  },
  {
    id: "pais",
    header: "País",
    cell: (item) => item.pais,
    sortingField: "pais",
  },
  {
    id: "cobertura",
    header: "Cobertura",
    cell: (item) => item.cobertura,
    sortingField: "cobertura",
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "issn", visible: true },
  { id: "issne", visible: true },
  { id: "revista", visible: true },
  { id: "casa", visible: true },
  { id: "isi", visible: true },
  { id: "pais", visible: true },
  { id: "cobertura", visible: true },
];

export default () => {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [distributions, setDistribution] = useState([]);
  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    paginationProps,
    propertyFilterProps,
  } = useCollection(distributions, {
    propertyFiltering: {
      filteringProperties: FILTER_PROPS,
      empty: (
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay registros...</b>
          </SpaceBetween>
        </Box>
      ),
      noMatch: (
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay coincidencias</b>
          </SpaceBetween>
        </Box>
      ),
    },
    pagination: { pageSize: 10 },
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
    selection: {},
  });
  const [enableBtn, setEnableBtn] = useState(true);

  //  Functions
  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/api/admin/estudios/revistas/listado",
        {
          headers: {
            Authorization: localStorage.getItem("Auth"),
          },
        }
      );
      if (!res.ok) {
        setDistribution([]);
        setLoading(false);
        throw new Error("Error in fetch");
      } else {
        const data = await res.json();
        setDistribution(data.data);
        setLoading(false);
      }
    } catch (error) {
      setDistribution([]);
      setLoading(false);
      console.log(error);
    }
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (selectedItems.length > 0) {
      setEnableBtn(true);
    } else {
      setEnableBtn(false);
    }
  }, [selectedItems]);

  return (
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
      selectionType="single"
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      header={
        <Header
          actions={
            <SpaceBetween direction="horizontal" size="s">
              <Button
                disabled={!enableBtn}
                variant="normal"
                onClick={() => {
                  console.log("Editar");
                }}
              >
                Editar
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  console.log("Editar");
                }}
              >
                Nuevo
              </Button>
            </SpaceBetween>
          }
        >
          Revistas
        </Header>
      }
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar revista"
          countText={`${filteredItemsCount} coincidencias`}
          expandToViewport
        />
      }
      pagination={<Pagination {...paginationProps} />}
      empty={
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay registros...</b>
          </SpaceBetween>
        </Box>
      }
    />
  );
};
