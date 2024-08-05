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
    propertyLabel: "Código",
    key: "codigo_proyecto",
    groupValuesLabel: "Códigos de proyectos",
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
    propertyLabel: "Facultad",
    key: "facultad",
    groupValuesLabel: "Facultades",
    operators: stringOperators,
  },
  {
    propertyLabel: "Periodo",
    key: "periodo",
    groupValuesLabel: "Periodos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Moneda",
    key: "moneda",
    groupValuesLabel: "Monedas",
    operators: stringOperators,
  },
  {
    propertyLabel: "Aporte no UNMSM",
    key: "aporte_no_unmsm",
    groupValuesLabel: "Cantidad no UNMSM",
    operators: stringOperators,
  },
  {
    propertyLabel: "Aporte UNMSM",
    key: "aporte_unmsm",
    groupValuesLabel: "Cantidad UNMSM",
    operators: stringOperators,
  },
  {
    propertyLabel: "Financiamiento FEX",
    key: "financiamiento_fuente_externa",
    groupValuesLabel: "Cantidad FEX",
    operators: stringOperators,
  },
  {
    propertyLabel: "Monto asignado",
    key: "monto_asignado",
    groupValuesLabel: "Cantidades",
    operators: stringOperators,
  },
  {
    propertyLabel: "Participación UNMSM",
    key: "participacion_unmsm",
    groupValuesLabel: "Participación UNMSM",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fuente financiamiento",
    key: "fuente_fin",
    groupValuesLabel: "Fuentes financiamiento",
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
    id: "responsable",
    header: "Responsable",
    cell: (item) => item.responsable,
    sortingField: "responsable",
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
    id: "moneda",
    header: "Moneda",
    cell: (item) => item.moneda,
    sortingField: "moneda",
  },
  {
    id: "aporte_no_unmsm",
    header: "Aporte no UNMSM",
    cell: (item) => item.aporte_no_unmsm,
    sortingField: "aporte_no_unmsm",
  },
  {
    id: "aporte_unmsm",
    header: "Aporte UNMSM",
    cell: (item) => item.aporte_unmsm,
    sortingField: "aporte_unmsm",
  },
  {
    id: "financiamiento_fuente_externa",
    header: "Financiamiento FEX",
    cell: (item) => item.financiamiento_fuente_externa,
    sortingField: "financiamiento_fuente_externa",
  },
  {
    id: "monto_asignado",
    header: "Monto asignado",
    cell: (item) => item.monto_asignado,
    sortingField: "monto_asignado",
  },
  {
    id: "participacion_unmsm",
    header: "Participación UNMSM",
    cell: (item) => item.participacion_unmsm,
    sortingField: "participacion_unmsm",
  },
  {
    id: "fuente_fin",
    header: "Fuente financiamiento",
    cell: (item) => item.fuente_fin,
    sortingField: "fuente_fin",
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge
        color={
          item.estado == -1
            ? "red"
            : item.estado == 0
            ? "red"
            : item.estado == 1
            ? "green"
            : item.estado == 2
            ? "grey"
            : item.estado == 3
            ? "blue"
            : item.estado == 5
            ? "green"
            : item.estado == 6
            ? "blue"
            : item.estado == 7
            ? "grey"
            : item.estado == 8
            ? "blue"
            : item.estado == 9
            ? "blue"
            : item.estado == 10
            ? "green"
            : item.estado == 11
            ? "blue"
            : item.estado == 12
            ? "red"
            : "red"
        }
      >
        {item.estado == -1
          ? "Eliminado"
          : item.estado == 0
          ? "No aprobado"
          : item.estado == 1
          ? "Aprobado"
          : item.estado == 2
          ? "Observado"
          : item.estado == 3
          ? "En evaluación"
          : item.estado == 5
          ? "Enviado"
          : item.estado == 6
          ? "En proceso"
          : item.estado == 7
          ? "Anulado"
          : item.estado == 8
          ? "Sustentado"
          : item.estado == 9
          ? "En ejecución"
          : item.estado == 10
          ? "Ejecutado"
          : item.estado == 11
          ? "Concluido"
          : item.estado == 12
          ? "Renunció"
          : "Sin estado"}
      </Badge>
    ),
    sortingField: "estado",
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "codigo_proyecto", visible: true },
  { id: "titulo", visible: true },
  { id: "responsable", visible: true },
  { id: "facultad", visible: true },
  { id: "periodo", visible: true },
  { id: "moneda", visible: true },
  { id: "aporte_no_unmsm", visible: true },
  { id: "aporte_unmsm", visible: true },
  { id: "financiamiento_fuente_externa", visible: true },
  { id: "monto_asignado", visible: true },
  { id: "participacion_unmsm", visible: true },
  { id: "fuente_fin", visible: true },
  { id: "estado", visible: true },
];

export default () => {
  //  Data states
  const [loading, setLoading] = useState(true);
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

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/proyectosFEX/listado");
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
      resizableColumns
      enableKeyboardNavigation
      header={
        <Header
          counter={"(" + distributions.length + ")"}
          actions={
            <Button
              variant="primary"
              onClick={() => (window.location.href = "proyectos_fex/paso_1")}
            >
              Nuevo
            </Button>
          }
        >
          Proyectos FEX
        </Header>
      }
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar grupo"
          countText={`${filteredItemsCount} coincidencias`}
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
