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
    propertyLabel: "ID",
    key: "id",
    groupValuesLabel: "IDS",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo de proyecto",
    key: "tipo_proyecto",
    groupValuesLabel: "Tipos de proyectos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Código",
    key: "codigo_proyecto",
    groupValuesLabel: "Códigos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Línea",
    key: "linea",
    groupValuesLabel: "Líneas",
    operators: stringOperators,
  },
  {
    propertyLabel: "Título",
    key: "titulo",
    groupValuesLabel: "Títulos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Responsable",
    key: "responsable",
    groupValuesLabel: "Coordinadores",
    operators: stringOperators,
  },
  {
    propertyLabel: "Nombre del grupo",
    key: "grupo_nombre",
    groupValuesLabel: "Nombres de los grupos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Facultad",
    key: "facultad",
    groupValuesLabel: "Facultades",
    operators: stringOperators,
  },
  {
    propertyLabel: "Monto",
    key: "monto",
    groupValuesLabel: "Montos",
    operators: stringOperators,
  },
  {
    propertyLabel: "R.R",
    key: "resolucion_rectoral",
    groupValuesLabel: "Resoluciones",
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
    id: "tipo_proyecto",
    header: "Tipo de proyecto",
    cell: (item) => item.tipo_proyecto,
    sortingField: "tipo_proyecto",
  },
  {
    id: "codigo_proyecto",
    header: "Código",
    cell: (item) => item.codigo_proyecto,
    sortingField: "codigo_proyecto",
  },
  {
    id: "linea",
    header: "Línea",
    cell: (item) => item.linea,
    sortingField: "linea",
  },
  {
    id: "titulo",
    header: "Título",
    cell: (item) => item.titulo,
    sortingField: "titulo",
  },
  {
    id: "responsable",
    header: "Responsable",
    cell: (item) => item.responsable,
    sortingField: "responsable",
  },
  {
    id: "grupo_nombre",
    header: "Nombre del grupo",
    cell: (item) => item.grupo_nombre,
    sortingField: "grupo_nombre",
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
  },
  {
    id: "monto",
    header: "Monto",
    cell: (item) => item.monto,
    sortingField: "monto",
  },
  {
    id: "resolucion_rectoral",
    header: "R.R",
    cell: (item) => item.resolucion_rectoral,
    sortingField: "resolucion_rectoral",
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge
        color={
          item.estado == "Eliminado"
            ? "red"
            : item.estado == "No aprobado"
            ? "grey"
            : item.estado == "Aprobado"
            ? "green"
            : item.estado == "Observado"
            ? "grey"
            : item.estado == "En evaluación"
            ? "blue"
            : item.estado == "Enviado"
            ? "blue"
            : item.estado == "En proceso"
            ? "grey"
            : item.estado == "Anulado"
            ? "red"
            : item.estado == "Sustentado"
            ? "blue"
            : item.estado == "En ejecución"
            ? "blue"
            : item.estado == "Ejecutado"
            ? "green"
            : item.estado == "Concluido"
            ? "green"
            : "red"
        }
      >
        {item.estado}
      </Badge>
    ),
    sortingField: "estado",
    minWidth: 135,
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "tipo_proyecto", visible: true },
  { id: "codigo_proyecto", visible: true },
  { id: "linea", visible: true },
  { id: "titulo", visible: true },
  { id: "responsable", visible: true },
  { id: "grupo_nombre", visible: true },
  { id: "facultad", visible: true },
  { id: "monto", visible: true },
  { id: "resolucion_rectoral", visible: true },
  { id: "estado", visible: true },
];

export default () => {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [distributions, setDistribution] = useState([]);
  const [loadingReport, setLoadingReport] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
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
  const [selectedOption, setSelectedOption] = useState({
    value: "2025",
  });

  const onFilterChangeWrapper = (event) => {
    // Llama a la función interna para que el filtrado siga funcionando
    if (propertyFilterProps.onChange) {
      propertyFilterProps.onChange(event);
    }

    // Verifica si existen tokens en el detalle del evento
    const { tokens } = event.detail;
    const nuevosFiltros = {};
    if (tokens && Array.isArray(tokens) && tokens.length > 0) {
      tokens.forEach((token) => {
        // token: { propertyKey, operator, value }
        nuevosFiltros[token.propertyKey] = token.value;
      });
    }
    setAppliedFilters(nuevosFiltros);
  };

  const reporteExcel = async () => {
    setLoadingReport(true);
    const currentFilter = propertyFilterProps.filteringText || "";
    // const query = queryString.stringify({ filter: currentFilter, year: selectedOption.value });
    // console.log(query);
    const queryObject = { ...appliedFilters, year: selectedOption.value };
    const query = queryString.stringify(queryObject);
    console.log(query);
    // Envío la petición GET, agregando el query string a la URL
    const res = await axiosBase.get(
      `admin/estudios/proyectosGrupo/excel?${query}`,
      {
        responseType: "blob",
      }
    );
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingReport(false);
  };

  //  Functions
  const getData = async () => {
    setLoading(true);
    setDistribution([]);
    const res = await axiosBase.get(
      "admin/estudios/proyectosGrupo/listado/" + selectedOption.value
    );
    const data = res.data;
    setDistribution(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [selectedOption]);

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
      wrapLines
      onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
      header={
        <Header
          counter={"(" + distributions.length + ")"}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                // disabled={loading}
                // loading={loadingReport}
                onClick={reporteExcel}
              >
                Excel
              </Button>
              <Button
                disabled={!collectionProps.selectedItems.length}
                variant="primary"
                onClick={() => {
                  const query = queryString.stringify({
                    id: collectionProps.selectedItems[0]["id"],
                  });
                  if (
                    collectionProps.selectedItems[0][
                      "tipo_proyecto"
                    ].toLowerCase() == "eci"
                  ) {
                    window.location.href =
                      "proyectos_grupos/detalle/" +
                      collectionProps.selectedItems[0][
                        "tipo_proyecto"
                      ].toLowerCase() +
                      "?" +
                      query;
                  } else if (
                    collectionProps.selectedItems[0][
                      "tipo_proyecto"
                    ].toLowerCase() == "psinfinv"
                  ) {
                    window.location.href =
                      "proyectos_grupos/detalle/" +
                      collectionProps.selectedItems[0][
                        "tipo_proyecto"
                      ].toLowerCase() +
                      "?" +
                      query;
                  } else if (
                    collectionProps.selectedItems[0][
                      "tipo_proyecto"
                    ].toLowerCase() == "pinvpos"
                  ) {
                    window.location.href =
                      "proyectos_grupos/detalle/" +
                      collectionProps.selectedItems[0][
                        "tipo_proyecto"
                      ].toLowerCase() +
                      "?" +
                      query;
                  } else if (
                    collectionProps.selectedItems[0][
                      "tipo_proyecto"
                    ].toLowerCase() == "psinfipu"
                  ) {
                    window.location.href =
                      "proyectos_grupos/detalle/" +
                      collectionProps.selectedItems[0][
                        "tipo_proyecto"
                      ].toLowerCase() +
                      "?" +
                      query;
                  } else if (
                    collectionProps.selectedItems[0][
                      "tipo_proyecto"
                    ].toLowerCase() == "picv"
                  ) {
                    window.location.href =
                      "proyectos_grupos/detalle/" +
                      collectionProps.selectedItems[0][
                        "tipo_proyecto"
                      ].toLowerCase() +
                      "?" +
                      query;
                  } else {
                    window.location.href =
                      "proyectos_grupos/detalle/pconfigi" + "?" + query;
                  }
                }}
              >
                Visualizar
              </Button>
            </SpaceBetween>
          }
        >
          Proyectos de grupos de investigación
        </Header>
      }
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar proyecto de grupo"
          countText={`${filteredItemsCount} coincidencias`}
          expandToViewport
          virtualScroll
          onChange={onFilterChangeWrapper}
          customControl={
            <FormField label="Año:">
              <Select
                disabled={loading}
                expandToViewport
                selectedOption={selectedOption}
                onChange={({ detail }) =>
                  setSelectedOption(detail.selectedOption)
                }
                options={[
                  { value: "2025" },
                  { value: "2024" },
                  { value: "2023" },
                  { value: "2022" },
                  { value: "2021" },
                  { value: "2020" },
                  { value: "2019" },
                  { value: "2018" },
                  { value: "2017" },
                ]}
              />
            </FormField>
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
