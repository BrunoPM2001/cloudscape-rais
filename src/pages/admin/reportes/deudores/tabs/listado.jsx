import {
  Badge,
  Box,
  Button,
  CollectionPreferences,
  FormField,
  Header,
  Pagination,
  PropertyFilter,
  Select,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useState, useEffect, useContext } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import queryString from "query-string";
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
    propertyLabel: "Código de docente",
    key: "codigo",
    groupValuesLabel: "Códigos de docente",
    operators: stringOperators,
  },
  {
    propertyLabel: "N° documento",
    key: "doc_numero",
    groupValuesLabel: "N° documentos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Nombres",
    key: "nombres",
    groupValuesLabel: "Nombres",
    operators: stringOperators,
  },
  {
    propertyLabel: "Facultad de investigador",
    key: "facultad_investigador",
    groupValuesLabel: "Facultades de investigador",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo de docente",
    key: "tipo",
    groupValuesLabel: "Tipos de docente",
    operators: stringOperators,
  },
  {
    propertyLabel: "Licencia",
    key: "licencia_tipo",
    groupValuesLabel: "Licencias",
    operators: stringOperators,
  },
  {
    propertyLabel: "Condición",
    key: "condicion",
    groupValuesLabel: "Condiciones",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo de proyecto",
    key: "tipo_proyecto",
    groupValuesLabel: "Tipos de proyecto",
    operators: stringOperators,
  },
  {
    propertyLabel: "Código de proyecto",
    key: "codigo_proyecto",
    groupValuesLabel: "Códigos de proyecto",
    operators: stringOperators,
  },
  {
    propertyLabel: "Título",
    key: "titulo",
    groupValuesLabel: "Títulos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Facultad de proyecto",
    key: "facultad_proyecto",
    groupValuesLabel: "Facultades de proyecto",
    operators: stringOperators,
  },
  {
    propertyLabel: "Periodo",
    key: "periodo",
    groupValuesLabel: "Periodos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Categoría",
    key: "categoria",
    groupValuesLabel: "Categorías",
    operators: stringOperators,
  },
  {
    propertyLabel: "Detalle",
    key: "detalle",
    groupValuesLabel: "Detalles",
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
    id: "codigo",
    header: "Código de docente",
    cell: (item) => item.codigo,
    sortingField: "codigo",
    minWidth: 150,
  },
  {
    id: "doc_numero",
    header: "N° documento",
    cell: (item) => item.doc_numero,
    sortingField: "doc_numero",
    minWidth: 150,
  },
  {
    id: "nombres",
    header: "Nombres",
    cell: (item) => item.nombres,
    sortingField: "nombres",
    minWidth: 150,
  },
  {
    id: "facultad_investigador",
    header: "Facultad de investigador",
    cell: (item) => item.facultad_investigador,
    sortingField: "facultad_investigador",
    minWidth: 200,
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
    sortingField: "tipo",
    minWidth: 150,
  },
  {
    id: "licencia_tipo",
    header: "Licencia",
    cell: (item) => item.licencia_tipo,
    sortingField: "licencia_tipo",
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
    id: "tipo_proyecto",
    header: "Tipo de proyecto",
    cell: (item) => item.tipo_proyecto,
    sortingField: "tipo_proyecto",
    minWidth: 120,
  },
  {
    id: "codigo_proyecto",
    header: "Código de proyecto",
    cell: (item) => item.codigo_proyecto,
    sortingField: "codigo_proyecto",
    minWidth: 150,
  },
  {
    id: "titulo",
    header: "Título",
    cell: (item) => item.titulo,
    sortingField: "titulo",
    minWidth: 300,
  },
  {
    id: "facultad_proyecto",
    header: "Facultad de proyecto",
    cell: (item) => item.facultad_proyecto,
    sortingField: "facultad_proyecto",
    minWidth: 200,
  },
  {
    id: "periodo",
    header: "Periodo",
    cell: (item) => item.periodo,
    sortingField: "periodo",
    minWidth: 120,
  },
  {
    id: "categoria",
    header: "Categoría",
    cell: (item) => item.categoria,
    sortingField: "categoria",
    minWidth: 140,
  },
  {
    id: "detalle",
    header: "Detalle",
    cell: (item) => item.detalle,
    sortingField: "detalle",
    minWidth: 150,
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "codigo", visible: true },
  { id: "doc_numero", visible: true },
  { id: "nombres", visible: true },
  { id: "facultad_investigador", visible: true },
  { id: "tipo", visible: true },
  { id: "licencia_tipo", visible: true },
  { id: "condicion", visible: true },
  { id: "tipo_proyecto", visible: true },
  { id: "codigo_proyecto", visible: true },
  { id: "titulo", visible: true },
  { id: "facultad_proyecto", visible: true },
  { id: "periodo", visible: true },
  { id: "categoria", visible: true },
  { id: "detalle", visible: true },
];

export default () => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Data states
  const [loading, setLoading] = useState(true);
  const [distributions, setDistribution] = useState([]);
  const [loadingReport, setLoadingReport] = useState(false);
  const [preferences, setPreferences] = useState({
    pageSize: 10,
    contentDisplay: columnDisplay,
    stripedRows: false,
    contentDensity: "comfortable",
    stickyColumns: {
      first: 0,
      last: 0,
    },
  });

  const {
    items,
    actions,
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

  const reporteExcel = async () => {
    if (allPageItems.length > 15000) {
      pushNotification(
        "La cantidad de items a exportar es demasiada, redúzcala a menos de 15000",
        "warning",
        notifications.length + 1
      );
    } else {
      const visibleColumns = preferences.contentDisplay
        .filter((item) => item.visible)
        .map((item) => item.id);
      const filteredItems = allPageItems.map((item) =>
        Object.fromEntries(
          Object.entries(item).filter(([key]) => visibleColumns.includes(key))
        )
      );

      setLoadingReport(true);
      const res = await axiosBase.post(
        "admin/reportes/listadoDeudoresExcel",
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

  //  Functions
  const getData = async () => {
    setLoading(true);
    setDistribution([]);
    const res = await axiosBase.get("admin/reportes/listadoDeudores");
    const data = res.data;
    setDistribution(data);
    setLoading(false);
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
      columnDisplay={preferences.contentDisplay}
      loading={loading}
      loadingText="Cargando datos"
      resizableColumns
      enableKeyboardNavigation
      stripedRows={preferences.stripedRows}
      contentDensity={preferences.contentDensity}
      stickyColumns={preferences.stickyColumns}
      selectionType="single"
      wrapLines
      onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
      header={
        <Header
          counter={"(" + distributions.length + ")"}
          actions={
            <Button
              variant="primary"
              loading={loadingReport}
              onClick={reporteExcel}
              disabled={loading}
            >
              Exportar en excel
            </Button>
          }
        >
          Deuda de investigadores
        </Header>
      }
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar investigador"
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
      preferences={
        <CollectionPreferences
          title="Preferencias de tabla"
          confirmLabel="Confirmar"
          cancelLabel="Cancelar"
          preferences={preferences}
          onConfirm={({ detail }) => setPreferences(detail)}
          stripedRowsPreference
          contentDensityPreference
          contentDisplayPreference={{
            options: columnDefinitions.map((item) => ({
              id: item.id,
              label: item.header,
            })),
          }}
          pageSizePreference={{
            options: [
              { value: 10, label: "10 filas" },
              { value: 20, label: "20 filas" },
              { value: 25, label: "25 filas" },
              { value: 50, label: "50 filas" },
            ],
          }}
          stickyColumnsPreference={{
            firstColumns: {
              title: "Fijar primera(s) columna(s)",
              description:
                "Mantén visible las primeras columnas al deslizar el contenido de la tabla de forma horizontal.",
              options: [
                { label: "Ninguna", value: 0 },
                { label: "Primera columna", value: 1 },
                { label: "Primeras 2 columnas", value: 2 },
              ],
            },
            lastColumns: {
              title: "Fijar última columna",
              description:
                "Mantén visible la última columna al deslizar el contenido de la tabla de forma horizontal.",
              options: [
                { label: "Ninguna", value: 0 },
                { label: "Última columna", value: 1 },
              ],
            },
          }}
        />
      }
    />
  );
};
