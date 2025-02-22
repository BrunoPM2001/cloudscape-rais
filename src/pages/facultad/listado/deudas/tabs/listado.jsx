import {
  Box,
  Header,
  Pagination,
  PropertyFilter,
  SpaceBetween,
  Table,
  Button,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import axiosBase from "../../../../../api/axios";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "Código Docente",
    key: "codigo_docente",
    groupValuesLabel: "Códigos Docente",
    operators: stringOperators,
  },
  {
    propertyLabel: "Docente",
    key: "docente",
    groupValuesLabel: "Docentes",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo de Proyecto",
    key: "tipo_proyecto",
    groupValuesLabel: "Tipos de Proyecto",
    operators: stringOperators,
  },
  {
    propertyLabel: "Categoría",
    key: "categoria",
    groupValuesLabel: "Categorías",
    operators: stringOperators,
  },
  {
    propertyLabel: "Código de Proyecto",
    key: "codigo_proyecto",
    groupValuesLabel: "Códigos de Proyecto",
    operators: stringOperators,
  },
  {
    propertyLabel: "Condición",
    key: "condicion",
    groupValuesLabel: "Condiciones",
    operators: stringOperators,
  },
  {
    propertyLabel: "Detalle de Deuda",
    key: "detalle_deuda",
    groupValuesLabel: "Detalles de Deuda",
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
    header: "ID",
    cell: (item) => item.id,
    sortingField: "id",
    minWidth: 100,
  },
  {
    id: "codigo_docente",
    header: "Código Docente",
    cell: (item) => item.coddoc,
    sortingField: "codigo_docente",
    minWidth: 150,
  },
  {
    id: "tipo_proyecto",
    header: "Tipo de Proyecto",
    cell: (item) => item.ptipo,
    sortingField: "tipo_proyecto",
    minWidth: 140,
  },
  {
    id: "categoria",
    header: "Categoría",
    cell: (item) => item.categoria,
    sortingField: "categoria",
    minWidth: 200,
  },
  {
    id: "codigo_proyecto",
    header: "Código de Proyecto",
    cell: (item) => item.pcodigo,
    sortingField: "codigo_proyecto",
    minWidth: 150,
  },
  {
    id: "condicion",
    header: "Condición",
    cell: (item) => item.condicion,
    sortingField: "condicion",
    minWidth: 150,
  },
  {
    id: "detalle_deuda",
    header: "Detalle de Deuda",
    cell: (item) => item.detalle,
    sortingField: "detalle_deuda",
    minWidth: 200,
  },
  {
    id: "periodo",
    header: "Periodo",
    cell: (item) => item.periodo,
    sortingField: "periodo",
    minWidth: 180,
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "codigo_docente", visible: true },
  { id: "tipo_proyecto", visible: true },
  { id: "categoria", visible: true },
  { id: "codigo_proyecto", visible: true },
  { id: "condicion", visible: true },
  { id: "detalle_deuda", visible: true },
  { id: "periodo", visible: true },
];

export default () => {
  const [loading, setLoading] = useState(true);
  const [loadingReport, setLoadingReport] = useState(false);
  const [distributions, setDistribution] = useState([]);
  const {
    items,
    filteredItemsCount,
    collectionProps,
    paginationProps,
    propertyFilterProps,
  } = useCollection(distributions, {
    propertyFiltering: {
      filteringProperties: FILTER_PROPS,
      empty: (
        <Box margin={{ vertical: "xs" }} textAlign="center">
          <SpaceBetween size="m">
            <b>No hay registros...</b>
          </SpaceBetween>
        </Box>
      ),
      noMatch: (
        <Box margin={{ vertical: "xs" }} textAlign="center">
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

  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("facultad/listado/deudas/listado");
    setDistribution(res.data);
    setLoading(false);
  };

  const reporte = async () => {
    setLoadingReport(true);
    const res = await axiosBase.get("facultad/listado/deudas/pdfDeudas", {
      responseType: "blob",
    });
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingReport(false);
  };

  const reporteExcel = async () => {
    setLoadingReport(true);
    const res = await axiosBase.get("facultad/reportes/excelDeudas", {
      responseType: "blob",
    });
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingReport(false);
  };

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
          filteringPlaceholder="Buscar deuda..."
          countText={`${filteredItemsCount} coincidencias`}
          expandToViewport
        />
      }
      header={
        <Header
          counter={"(" + distributions.length + ")"}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                disabled={loading}
                loading={loadingReport}
                onClick={reporteExcel}
              >
                Excel
              </Button>
              <Button
                variant="primary"
                disabled={loading}
                loading={loadingReport}
                onClick={reporte}
              >
                Reporte
              </Button>
            </SpaceBetween>
          }
        >
          Deudas de Proyectos
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
