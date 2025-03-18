import {
  Box,
  Header,
  Pagination,
  PropertyFilter,
  SpaceBetween,
  Table,
  Badge,
  Button,
} from "@cloudscape-design/components";
import { useState, useEffect, useContext } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";

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
    minWidth: 300,
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
    minWidth: 200,
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
    minWidth: 100,
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
    minWidth: 200,
  },
  {
    id: "participacion_unmsm",
    header: "Participación UNMSM",
    cell: (item) => item.participacion_unmsm,
    sortingField: "participacion_unmsm",
    minWidth: 200,
  },
  {
    id: "fuente_fin",
    header: "Fuente financiamiento",
    cell: (item) => item.fuente_fin,
    sortingField: "fuente_fin",
    minWidth: 200,
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
            ? "severity-high"
            : item.estado == "Aprobado"
            ? "green"
            : item.estado == "En evaluación"
            ? "grey"
            : item.estado == "Enviado"
            ? "blue"
            : item.estado == "En proceso"
            ? "grey"
            : item.estado == "Anulado"
            ? "severity-critical"
            : item.estado == "Sustentado"
            ? "blue"
            : item.estado == "En ejecución"
            ? "blue"
            : item.estado == "Ejecutado"
            ? "green"
            : item.estado == "Concluido"
            ? "severity-low"
            : "red"
        }
      >
        {item.estado}
      </Badge>
    ),
    sortingField: "estado",
    minWidth: 150,
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
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Data states
  const [loading, setLoading] = useState(true);
  const [loadingReport, setLoadingReport] = useState(false);
  const [distributions, setDistribution] = useState([]);
  const {
    items,
    filteredItemsCount,
    collectionProps,
    paginationProps,
    propertyFilterProps,
    allPageItems,
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
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("facultad/listado/proyectos_fex/listado");
    setDistribution(res.data);
    setLoading(false);
  };

  const exportExcel = async () => {
    if (allPageItems.length > 15000) {
      pushNotification(
        "La cantidad de items a exportar es demasiada, redúzcala a menos de 15000",
        "warning",
        notifications.length + 1
      );
    } else {
      const visibleColumns = columnDisplay
        .filter((item) => item.visible)
        .map((item) => item.id);
      const filteredItems = allPageItems.map((item) =>
        Object.fromEntries(
          Object.entries(item).filter(([key]) => visibleColumns.includes(key))
        )
      );

      setLoadingReport(true);
      const res = await axiosBase.post(
        "facultad/reportes/excel",
        filteredItems,
        {
          responseType: "blob",
        }
      );
      const blob = await res.data;
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setLoadingReport(false);
    }
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
      enableKeyboardNavigation
      wrapLines
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar grupo"
          countText={`${filteredItemsCount} coincidencias`}
          expandToViewport
          virtualScroll
        />
      }
      header={
        <Header
          counter={"(" + distributions.length + ")"}
          actions={
            <Button
              disabled={loading}
              variant="primary"
              onClick={exportExcel}
              loading={loadingReport}
            >
              Exportar a excel
            </Button>
          }
        >
          Proyectos de Financiamiento Externo
        </Header>
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
