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
import queryString from "query-string";
import axiosBase from "../../../../../api/axios";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "Código",
    key: "codigo_proyecto",
    groupValuesLabel: "Códigos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Título",
    key: "titulo",
    groupValuesLabel: "Títulos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Estado meta",
    key: "estado_meta",
    groupValuesLabel: "Estados de meta",
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
    propertyLabel: "Estado",
    key: "estado",
    groupValuesLabel: "Estados",
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
    id: "codigo_proyecto",
    header: "Código",
    cell: (item) => item.codigo_proyecto,
    sortingField: "codigo_proyecto",
  },
  {
    id: "titulo",
    header: "Título",
    cell: (item) => item.titulo,
    sortingField: "titulo",
  },
  {
    id: "estado_meta",
    header: "Estado de meta",
    cell: (item) => item.estado_meta,
    sortingField: "estado_meta",
  },
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
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge
        color={
          item.estado == -1
            ? "red"
            : item.estado == 1
            ? "grey"
            : item.estado == 2
            ? "grey"
            : item.estado == 4
            ? "green"
            : item.estado == 5
            ? "blue"
            : item.estado == 6
            ? "grey"
            : "red"
        }
      >
        {item.estado == -1
          ? "Eliminado"
          : item.estado == 1
          ? "Reconocido"
          : item.estado == 2
          ? "Observado"
          : item.estado == 4
          ? "Registrado"
          : item.estado == 5
          ? "Enviado"
          : item.estado == 6
          ? "En proceso"
          : "Error"}
      </Badge>
    ),
    sortingField: "estado",
  },
];

const columnDisplay = [
  { id: "codigo_proyecto", visible: true },
  { id: "titulo", visible: true },
  { id: "estado_meta", visible: true },
  { id: "tipo_proyecto", visible: true },
  { id: "periodo", visible: true },
  { id: "estado", visible: true },
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
  const [periodoOption, setPeriodoOption] = useState({
    value: "2024",
  });
  const [tipoOption, setTipoOption] = useState({
    value: "PCONFIGI",
  });
  const [estadoOption, setEstadoOption] = useState({
    value: "5",
  });
  const [enableBtn, setEnableBtn] = useState(true);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/estudios/monitoreo/listadoProyectos/" +
        periodoOption.value +
        "/" +
        tipoOption.value +
        "/" +
        estadoOption.value
    );

    const data = await res.data;
    setDistribution(data.data);
    setLoading(false);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, [periodoOption, tipoOption, estadoOption]);

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
            <Button
              disabled={!enableBtn}
              variant="primary"
              onClick={() => {
                const query = queryString.stringify({
                  id: selectedItems[0]["id"],
                });
                window.location.href = "monitoreo/detalle?" + query;
              }}
            >
              Visualizar
            </Button>
          }
        >
          Proyectos
        </Header>
      }
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar proyecto"
          countText={`${filteredItemsCount} coincidencias`}
          expandToViewport
          customControl={
            <SpaceBetween direction="horizontal" size="m">
              <FormField label="Año:">
                <Select
                  disabled={loading}
                  expandToViewport
                  selectedOption={periodoOption}
                  onChange={({ detail }) =>
                    setPeriodoOption(detail.selectedOption)
                  }
                  options={[
                    { value: "2024" },
                    { value: "2023" },
                    { value: "2022" },
                    { value: "2021" },
                    { value: "2020" },
                    { value: "2019" },
                    { value: "2018" },
                  ]}
                />
              </FormField>
              <FormField label="Tipo de proyecto:">
                <Select
                  disabled={loading}
                  expandToViewport
                  selectedOption={tipoOption}
                  onChange={({ detail }) =>
                    setTipoOption(detail.selectedOption)
                  }
                  options={[
                    { value: "PCONFIGI" },
                    { value: "ECI" },
                    { value: "PINVEST" },
                  ]}
                />
              </FormField>
              <FormField label="Estado de meta:">
                <Select
                  disabled={loading}
                  expandToViewport
                  selectedOption={estadoOption}
                  onChange={({ detail }) =>
                    setEstadoOption(detail.selectedOption)
                  }
                  options={[
                    { value: "5" },
                    { value: "4" },
                    { value: "3" },
                    { value: "2" },
                    { value: "1" },
                  ]}
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
