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
import queryString from "query-string";
import axiosBase from "../../../../../api/axios";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "Tipo de proyecto",
    key: "tipo_proyecto",
    groupValuesLabel: "Tipos de proyecto",
    operators: stringOperators,
  },
  {
    propertyLabel: "Periodo",
    key: "periodo",
    groupValuesLabel: "Periodos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Facultades",
    key: "facultades",
    groupValuesLabel: "Facultades",
    operators: stringOperators,
  },
  {
    propertyLabel: "Cupos",
    key: "cupos",
    groupValuesLabel: "Cantidad de cupos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de inicio",
    key: "fecha_inicio",
    groupValuesLabel: "Fechas de inicio",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de fin",
    key: "fecha_fin",
    groupValuesLabel: "Fechas de fin",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de inicio de evaluación",
    key: "fecha_inicio_evaluacion",
    groupValuesLabel: "Fechas de inicio de evaluación",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de fin de evaluación",
    key: "fecha_fin_evaluacion",
    groupValuesLabel: "Fechas de fin de evaluación",
    operators: stringOperators,
  },
];

const columnDefinitions = [
  {
    id: "tipo_proyecto",
    header: "Tipo de proyecto",
    cell: (item) => item.tipo_proyecto,
    sortingField: "tipo_proyecto",
  },
  {
    id: "periodo",
    header: "Periodo",
    cell: (item) => item.periodo,
    sortingField: "periodo",
  },
  {
    id: "facultades",
    header: "Facultades",
    cell: (item) => item.facultades,
    sortingField: "facultades",
  },
  {
    id: "cupos",
    header: "Cupos",
    cell: (item) => item.cupos,
    sortingField: "cupos",
  },
  {
    id: "fecha_inicio",
    header: "Fecha de inicio",
    cell: (item) => item.fecha_inicio,
    sortingField: "fecha_inicio",
  },
  {
    id: "fecha_fin",
    header: "Fecha de fin",
    cell: (item) => item.fecha_fin,
    sortingField: "fecha_fin",
  },
  {
    id: "fecha_inicio_evaluacion",
    header: "Fecha de inicio de evaluación",
    cell: (item) => item.fecha_inicio_evaluacion,
    sortingField: "fecha_inicio_evaluacion",
  },
  {
    id: "fecha_fin_evaluacion",
    header: "Fecha de fin de evaluación",
    cell: (item) => item.fecha_fin_evaluacion,
    sortingField: "fecha_fin_evaluacion",
  },
];

const columnDisplay = [
  { id: "tipo_proyecto", visible: true },
  { id: "periodo", visible: true },
  { id: "facultades", visible: true },
  { id: "cupos", visible: true },
  { id: "fecha_inicio", visible: true },
  { id: "fecha_fin", visible: true },
  { id: "fecha_inicio_evaluacion", visible: true },
  { id: "fecha_fin_evaluacion", visible: true },
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
    setLoading(true);
    const res = await axiosBase.get(
      "admin/facultad/convocatorias/getConvocatorias"
    );
    const data = await res.data;
    setDistribution(data.data);
    setLoading(false);
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
          counter={
            selectedItems.length
              ? "(" + selectedItems.length + "/" + items.length + ")"
              : "(" + items.length + ")"
          }
          actions={
            <Button
              disabled={!enableBtn}
              variant="primary"
              onClick={() => {
                const query = queryString.stringify({
                  periodo: selectedItems[0]["periodo"],
                  tipo_proyecto: selectedItems[0]["tipo_proyecto"],
                });
                window.location.href = "convocatorias/detalle?" + query;
              }}
            >
              Visualizar
            </Button>
          }
        >
          Listado de convocatorias
        </Header>
      }
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar grupo"
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
