import {
  Badge,
  Box,
  Button,
  CollectionPreferences,
  Header,
  Pagination,
  PropertyFilter,
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
    propertyLabel: "Nombre de grupo",
    key: "grupo_nombre",
    groupValuesLabel: "Nombres de grupo",
    operators: stringOperators,
  },
  {
    propertyLabel: "Nombre corto",
    key: "grupo_nombre_corto",
    groupValuesLabel: "Nombres cortos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Categoría",
    key: "grupo_categoria",
    groupValuesLabel: "Categorías",
    operators: stringOperators,
  },
  {
    propertyLabel: "Facultad",
    key: "facultad",
    groupValuesLabel: "Facultades",
    operators: stringOperators,
  },
  {
    propertyLabel: "Coordinador",
    key: "coordinador",
    groupValuesLabel: "Coordinadores",
    operators: stringOperators,
  },
  {
    propertyLabel: "Integrantes",
    key: "cantidad_integrantes",
    groupValuesLabel: "Cantidades",
    operators: stringOperators,
  },
  {
    propertyLabel: "R.R.",
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
    id: "grupo_nombre",
    header: "Nombre de grupo",
    cell: (item) => item.grupo_nombre,
    sortingField: "grupo_nombre",
    minWidth: 250,
  },
  {
    id: "grupo_nombre_corto",
    header: "Nombre corto",
    cell: (item) => item.grupo_nombre_corto,
    sortingField: "grupo_nombre_corto",
  },
  {
    id: "grupo_categoria",
    header: "Categoría",
    cell: (item) => item.grupo_categoria,
    sortingField: "grupo_categoria",
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
    minWidth: 200,
  },
  {
    id: "coordinador",
    header: "Coordinador",
    cell: (item) => item.coordinador,
    sortingField: "coordinador",
    minWidth: 250,
  },
  {
    id: "cantidad_integrantes",
    header: "Integrantes",
    cell: (item) => item.cantidad_integrantes,
    sortingField: "coordinador",
  },
  {
    id: "resolucion_rectoral",
    header: "R.R.",
    cell: (item) => item.resolucion_rectoral,
    sortingField: "resolucion_rectoral",
    minWidth: 150,
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge
        color={
          item.estado == "Disuelto"
            ? "red"
            : item.estado == "Registrado"
            ? "green"
            : item.estado == "Observado"
            ? "red"
            : item.estado == "Reg. observado"
            ? "grey"
            : "red"
        }
      >
        {item.estado}
      </Badge>
    ),
    sortingField: "estado",
  },
  {
    id: "created_at",
    header: "Fecha de creación",
    cell: (item) => item.created_at,
    minWidth: 130,
  },
  {
    id: "updated_at",
    header: "Fecha de actualización",
    cell: (item) => item.updated_at,
    minWidth: 130,
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "grupo_nombre", visible: true },
  { id: "grupo_nombre_corto", visible: true },
  { id: "grupo_categoria", visible: true },
  { id: "facultad", visible: true },
  { id: "coordinador", visible: true },
  { id: "cantidad_integrantes", visible: true },
  { id: "resolucion_rectoral", visible: true },
  { id: "estado", visible: true },
  { id: "created_at", visible: true },
  { id: "updated_at", visible: true },
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
    sorting: {
      defaultState: {
        sortingColumn: columnDefinitions[0],
        isDescending: true,
      },
    },
    selection: {},
  });

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/grupos/listadoGrupos");
    const data = res.data;
    setDistribution(data);
    setLoading(false);
  };

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
        "admin/estudios/grupos/excel",
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
      columnDisplay={preferences.contentDisplay}
      loading={loading}
      loadingText="Cargando datos"
      wrapLines
      enableKeyboardNavigation
      stripedRows={preferences.stripedRows}
      contentDensity={preferences.contentDensity}
      stickyColumns={preferences.stickyColumns}
      selectionType="single"
      onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
      header={
        <Header
          counter={"(" + distributions.length + ")"}
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button
                onClick={reporteExcel}
                disabled={loading}
                loading={loadingReport}
              >
                Excel
              </Button>
              <Button
                disabled={collectionProps.selectedItems.length == 0}
                variant="primary"
                onClick={() => {
                  const query = queryString.stringify({
                    id: collectionProps.selectedItems[0]["id"],
                  });
                  window.location.href = "grupos/detalle?" + query;
                }}
              >
                Visualizar
              </Button>
            </SpaceBetween>
          }
        >
          Grupos de investigación
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
