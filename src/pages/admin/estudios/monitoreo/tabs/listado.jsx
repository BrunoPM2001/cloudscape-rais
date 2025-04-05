import {
  Badge,
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
    propertyLabel: "Id proyecto",
    key: "id",
    groupValuesLabel: "Ids",
    operators: stringOperators,
  },
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
    propertyLabel: "Responsable",
    key: "responsable",
    groupValuesLabel: "Responsables",
    operators: stringOperators,
  },
  {
    propertyLabel: "Estado",
    key: "estado",
    groupValuesLabel: "Estados",
    operators: stringOperators,
  },
  {
    propertyLabel: "Estado de meta",
    key: "estado_meta",
    groupValuesLabel: "Estados de meta",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo",
    key: "tipo_proyecto",
    groupValuesLabel: "Tipos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Periodo",
    key: "periodo",
    groupValuesLabel: "Periodos",
    operators: stringOperators,
  },
];

const columnDefinitions = [
  {
    id: "id",
    header: "ID proyecto",
    cell: (item) => item.id,
    sortingField: "id",
    minWidth: 20,
  },
  {
    id: "codigo_proyecto",
    header: "Código",
    cell: (item) => item.codigo_proyecto,
    sortingField: "codigo_proyecto",
    minWidth: 150,
  },
  {
    id: "titulo",
    header: "Título",
    cell: (item) => item.titulo,
    sortingField: "titulo",
    minWidth: 450,
  },
  {
    id: "responsable",
    header: "Responsable",
    cell: (item) => item.responsable,
    sortingField: "responsable",
    minWidth: 225,
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
    minWidth: 150,
  },
  {
    id: "estado_meta",
    header: "Estado de meta",
    cell: (item) => (
      <Badge
        color={
          item.estado_meta == "Por presentar"
            ? "grey"
            : item.estado_meta == "No aprobado"
            ? "red"
            : item.estado_meta == "Aprobado"
            ? "green"
            : item.estado_meta == "Observado"
            ? "severity-medium"
            : item.estado_meta == "Enviado"
            ? "blue"
            : item.estado_meta == "En proceso"
            ? "severity-low"
            : "red"
        }
      >
        {item.estado_meta}
      </Badge>
    ),
    sortingField: "estado_meta",
    minWidth: 150,
  },
  {
    id: "tipo_proyecto",
    header: "Tipo",
    cell: (item) => item.tipo_proyecto,
    sortingField: "tipo_proyecto",
    minWidth: 180,
  },
  {
    id: "periodo",
    header: "Periodo",
    cell: (item) => item.periodo,
    sortingField: "periodo",
    minWidth: 50,
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "codigo_proyecto", visible: true },
  { id: "titulo", visible: true },
  { id: "responsable", visible: true },
  { id: "estado", visible: true },
  { id: "estado_meta", visible: true },
  { id: "tipo_proyecto", visible: true },
  { id: "periodo", visible: true },
];

export default () => {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [distributions, setDistribution] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [loadingReport, setLoadingReport] = useState(false);
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
    sorting: {},
    selection: {},
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
    const queryObject = { ...appliedFilters };
    const query = queryString.stringify(queryObject);
    console.log(query);
    // Envío la petición GET, agregando el query string a la URL
    const res = await axiosBase.get(`admin/estudios/monitoreo/excel?${query}`, {
      responseType: "blob",
    });
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingReport(false);
  };

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/estudios/monitoreo/listadoProyectos"
    );

    const data = res.data;
    setDistribution(data);
    setLoading(false);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <Table
      {...collectionProps}
      trackBy="id"
      items={items}
      columnDefinitions={columnDefinitions}
      columnDisplay={columnDisplay}
      loading={loading}
      loadingText="Cargando datos"
      wrapLines
      enableKeyboardNavigation
      selectionType="single"
      onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
      header={
        <Header
          actions={
            <SpaceBetween direction="horizontal" size="m">
              <Button
                disabled={loading}
                variant="normal"
                onClick={reporteExcel}
                loading={loadingReport}
              >
                Exportar Excel
              </Button>
              <Button
                disabled={loading || !collectionProps.selectedItems.length}
                variant="primary"
                onClick={() => {
                  const query = queryString.stringify({
                    id: collectionProps.selectedItems[0]["id"],
                  });
                  window.open("monitoreo/detalle?" + query, "_blank");
                }}
              >
                Visualizar
              </Button>
            </SpaceBetween>
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
          onChange={onFilterChangeWrapper}
          expandToViewport
          virtualScroll
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
