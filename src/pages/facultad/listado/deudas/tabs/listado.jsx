import {
  Box,
  Header,
  Pagination,
  PropertyFilter,
  SpaceBetween,
  Table,
  Button,
} from "@cloudscape-design/components";
import { useState, useEffect, useContext } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "Código Docente",
    key: "coddoc",
    groupValuesLabel: "Códigos Docente",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo de Proyecto",
    key: "ptipo",
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
    key: "pcodigo",
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
    key: "detalle",
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
    id: "coddoc",
    header: "Código Docente",
    cell: (item) => item.coddoc,
    sortingField: "coddoc",
    minWidth: 150,
  },
  {
    id: "ptipo",
    header: "Tipo de Proyecto",
    cell: (item) => item.ptipo,
    sortingField: "ptipo",
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
    id: "pcodigo",
    header: "Código de Proyecto",
    cell: (item) => item.pcodigo,
    sortingField: "pcodigo",
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
    id: "detalle",
    header: "Detalle de Deuda",
    cell: (item) => item.detalle,
    sortingField: "detalle",
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
  { id: "coddoc", visible: true },
  { id: "ptipo", visible: true },
  { id: "categoria", visible: true },
  { id: "pcodigo", visible: true },
  { id: "condicion", visible: true },
  { id: "detalle", visible: true },
  { id: "periodo", visible: true },
];

export default () => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

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
