import {
  Badge,
  Box,
  Button,
  FormField,
  Header,
  Pagination,
  PropertyFilter,
  Select,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import axiosBase from "../../../../../api/axios";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "ID",
    key: "id",
    groupValuesLabel: "IDS",
    operators: stringOperators,
  },
  {
    propertyLabel: "Evaluador",
    key: "evaluador",
    groupValuesLabel: "Evaluadores",
    operators: stringOperators,
  },
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
    propertyLabel: "Título",
    key: "titulo",
    groupValuesLabel: "Títulos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Facultad",
    key: "facultad",
    groupValuesLabel: "Facultades",
    operators: stringOperators,
  },
  {
    propertyLabel: "Linea",
    key: "linea",
    groupValuesLabel: "Lineas",
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
    id: "evaluador",
    header: "Evaluador",
    cell: (item) => item.evaluador,
    sortingField: "evaluador",
  },
  {
    id: "tipo_proyecto",
    header: "Tipo de proyecto",
    cell: (item) => item.tipo_proyecto,
    sortingField: "tipo_proyecto",
  },
  {
    id: "titulo",
    header: "Título",
    cell: (item) => item.titulo,
    sortingField: "titulo",
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
  },
  {
    id: "periodo",
    header: "Periodo",
    cell: (item) => item.periodo,
    sortingField: "periodo",
  },
  {
    id: "criterios",
    header: "Criterios",
    cell: (item) => item.criterios,
    sortingField: "criterios",
  },
  {
    id: "criterios_evaluados",
    header: "Criterios evaluados",
    cell: (item) => item.criterios_evaluados,
    sortingField: "criterios_evaluados",
  },
  {
    id: "evaluado",
    header: "Evaluado",
    cell: (item) => (
      <Badge color={item.evaluado == "Sí" ? "green" : "red"}>
        {item.evaluado}
      </Badge>
    ),
    sortingField: "evaluado",
  },
  {
    id: "ficha",
    header: "Ficha",
    cell: (item) => (
      <Badge color={item.ficha == "Sí" ? "green" : "red"}>{item.ficha}</Badge>
    ),
    sortingField: "ficha",
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "evaluador", visible: true },
  { id: "tipo_proyecto", visible: true },
  { id: "titulo", visible: true },
  { id: "facultad", visible: true },
  { id: "periodo", visible: true },
  { id: "criterios", visible: true },
  { id: "criterios_evaluados", visible: true },
  { id: "evaluado", visible: true },
  { id: "ficha", visible: true },
];

export default () => {
  //  States
  const [loading, setLoading] = useState(true);
  const [loadingFicha, setLoadingFicha] = useState(false);
  const [distributions, setDistribution] = useState([]);
  const [periodo, setPeriodo] = useState({ value: "2024" });
  const [optPeriodos, setOptPeriodos] = useState([]);

  const [tipo_proyecto, setTipo_proyecto] = useState({ value: "PRO-CTIE" });
  const [optTipos, setOptTipos] = useState([]);

  //  Hooks
  const {
    items,
    filteredItemsCount,
    collectionProps,
    paginationProps,
    actions,
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
    sorting: {},
    selection: {},
  });

  //  Functions
  const opciones = async () => {
    const res = await axiosBase.get("admin/facultad/evaluaciones/opciones");
    const data = res.data;
    //  Periodos
    const uniqueYears = [...new Set(data.map((item) => item.periodo))];
    setOptPeriodos(uniqueYears.map((item) => ({ value: item })));

    //  Tipos de proyecto
    const uniqueTipos = [...new Set(data.map((item) => item.tipo_proyecto))];
    setOptTipos(uniqueTipos.map((item) => ({ value: item })));
  };

  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/facultad/evaluaciones/listado", {
      params: {
        periodo: periodo.value,
        tipo_proyecto: tipo_proyecto.value,
      },
    });
    const data = res.data;
    setDistribution(data);
    setLoading(false);
  };

  const ver = async () => {
    const res = await axiosBase.get("admin/facultad/evaluaciones/verFicha", {
      params: {
        id: collectionProps.selectedItems[0].id,
      },
      responseType: "blob",
    });
    setLoadingFicha(false);
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  //  Effects
  useEffect(() => {
    opciones();
  }, []);

  useEffect(() => {
    getData();
  }, [periodo, tipo_proyecto]);

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
      onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
      header={
        <Header
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button
                onClick={() => {
                  window.open(collectionProps.selectedItems[0].url, "_blank");
                }}
                disabled={
                  collectionProps.selectedItems == 0 ||
                  collectionProps.selectedItems[0]?.ficha == "No"
                }
              >
                Descargar ficha
              </Button>
              <Button
                onClick={ver}
                loading={loadingFicha}
                disabled={collectionProps.selectedItems == 0}
              >
                Ver ficha
              </Button>
            </SpaceBetween>
          }
        >
          Proyectos ({distributions.length})
        </Header>
      }
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar por otros campos"
          countText={`${filteredItemsCount} coincidencias`}
          expandToViewport
          virtualScroll
          customControl={
            <SpaceBetween size="s" direction="horizontal">
              <FormField label="Periodo">
                <Select
                  placeholder="Escoja una opción"
                  disabled={loading}
                  expandToViewport
                  selectedOption={periodo}
                  onChange={({ detail }) => setPeriodo(detail.selectedOption)}
                  statusType={optPeriodos.length == 0 ? "loading" : "finished"}
                  options={optPeriodos}
                />
              </FormField>
              <FormField label="Tipo de proyecto">
                <Select
                  placeholder="Escoja una opción"
                  disabled={loading}
                  expandToViewport
                  selectedOption={tipo_proyecto}
                  onChange={({ detail }) =>
                    setTipo_proyecto(detail.selectedOption)
                  }
                  statusType={optTipos.length == 0 ? "loading" : "finished"}
                  options={optTipos}
                />
              </FormField>
            </SpaceBetween>
          }
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
