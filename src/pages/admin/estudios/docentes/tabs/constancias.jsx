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
import axiosBase from "../../../../../api/axios";
import queryString from "query-string";
import NotificationContext from "../../../../../providers/notificationProvider";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "Estado",
    key: "estado",
    groupValuesLabel: "Estados",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo",
    key: "tipo",
    groupValuesLabel: "Tipos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha constancia",
    key: "fecha_constancia",
    groupValuesLabel: "Fechas de constancia",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de fin de constancia",
    key: "fecha_fin",
    groupValuesLabel: "Fechas de fin de constancia",
    operators: stringOperators,
  },
  {
    propertyLabel: "Facultad",
    key: "facultad",
    groupValuesLabel: "Facultades",
    operators: stringOperators,
  },
  {
    propertyLabel: "Orcid",
    key: "codigo_orcid",
    groupValuesLabel: "Orcid",
    operators: stringOperators,
  },
  {
    propertyLabel: "Categoria",
    key: "docente_categoria",
    groupValuesLabel: "Categorías",
    operators: stringOperators,
  },
  {
    propertyLabel: "Clase",
    key: "clase",
    groupValuesLabel: "Clases",
    operators: stringOperators,
  },
  {
    propertyLabel: "renacyt",
    key: "renacyt",
    groupValuesLabel: "Renacyt",
    operators: stringOperators,
  },
  {
    propertyLabel: "renacyt_nivel",
    key: "renacyt_nivel",
    groupValuesLabel: "Niveles de renacyt",
    operators: stringOperators,
  },
  {
    propertyLabel: "Apellido paterno",
    key: "apellido1",
    groupValuesLabel: "Apellidos paternos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Apellido materno",
    key: "apellido2",
    groupValuesLabel: "Apellidos maternos",
    operators: stringOperators,
  },

  {
    propertyLabel: "Nombres",
    key: "nombres",
    groupValuesLabel: "Nombres",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo de documento",
    key: "doc_tipo",
    groupValuesLabel: "Tipos de documento",
    operators: stringOperators,
  },
  {
    propertyLabel: "N° de documento",
    key: "doc_numero",
    groupValuesLabel: "N° de documento",
    operators: stringOperators,
  },
];

const columnDefinitions = [
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Box textAlign="center">
        <Badge
          color={
            item.estado == "Vigente"
              ? "green"
              : item.estado == "No vigente"
              ? "red"
              : "grey"
          }
        >
          <div style={{ textAlign: "center" }}>{item.estado}</div>
        </Badge>
      </Box>
    ),
    sortingField: "estado",
    isRowHeader: true,
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
    sortingField: "tipo",
  },
  {
    id: "fecha_constancia",
    header: "Fecha de aprobación",
    cell: (item) => item.fecha_constancia,
    sortingField: "fecha_constancia",
    minWidth: 120,
  },
  {
    id: "fecha_fin",
    header: "Fecha de vencimiento",
    cell: (item) => item.fecha_fin,
    sortingField: "fecha_fin",
    minWidth: 120,
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
    minWidth: 180,
  },
  {
    id: "docente_categoria",
    header: "Categoría",
    cell: (item) => item.docente_categoria,
    sortingField: "docente_categoria",
    minWidth: 100,
  },
  {
    id: "clase",
    header: "Clase",
    cell: (item) => item.clase,
    sortingField: "clase",
    minWidth: 200,
  },
  {
    id: "renacyt",
    header: "Renacyt",
    cell: (item) => item.renacyt,
    sortingField: "renacyt",
    minWidth: 100,
  },
  {
    id: "renacyt_nivel",
    header: "Nivel de renacyt",
    cell: (item) => item.renacyt_nivel,
    sortingField: "renacyt_nivel",
    minWidth: 100,
  },
  {
    id: "codigo_orcid",
    header: "Orcid",
    cell: (item) => item.codigo_orcid,
    sortingField: "codigo_orcid",
    minWidth: 120,
  },
  {
    id: "apellido1",
    header: "Ap. paterno",
    cell: (item) => item.apellido1,
    sortingField: "apellido1",
  },
  {
    id: "apellido2",
    header: "Ap. materno",
    cell: (item) => item.apellido2,
    sortingField: "apellido2",
  },
  {
    id: "nombres",
    header: "Nombres",
    cell: (item) => item.nombres,
    sortingField: "nombres",
  },
  {
    id: "doc_tipo",
    header: "Tipo de documento",
    cell: (item) => item.doc_tipo,
    sortingField: "doc_tipo",
  },
  {
    id: "doc_numero",
    header: "N° de documento",
    cell: (item) => item.doc_numero,
    sortingField: "doc_numero",
  },
  {
    id: "telefono_movil",
    header: "Móvil",
    cell: (item) => item.telefono_movil,
    sortingField: "telefono_movil",
  },
  {
    id: "email3",
    header: "Correo institucional",
    cell: (item) => item.email3,
    sortingField: "email3",
  },
];

const columnDisplay = [
  { id: "estado", visible: true },
  { id: "tipo", visible: true },
  { id: "fecha_constancia", visible: true },
  { id: "fecha_fin", visible: true },
  { id: "facultad", visible: true },
  { id: "codigo_orcid", visible: true },
  { id: "docente_categoria", visible: true },
  { id: "clase", visible: true },
  { id: "renacyt", visible: true },
  { id: "renacyt_nivel", visible: true },
  { id: "apellido1", visible: true },
  { id: "apellido2", visible: true },
  { id: "nombres", visible: true },
  { id: "doc_tipo", visible: true },
  { id: "doc_numero", visible: true },
  { id: "telefono_movil", visible: true },
  { id: "email3", visible: true },
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

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/docentes/constancias");
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
        "admin/estudios/docentes/excel",
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
    <>
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
                  variant="primary"
                  disabled={collectionProps.selectedItems.length == 0}
                  onClick={() => {
                    const query = queryString.stringify({
                      id: collectionProps.selectedItems[0]["id"],
                    });
                    window.location.href =
                      "docente_investigador/evaluacion?" + query;
                  }}
                >
                  Ver detalles
                </Button>
              </SpaceBetween>
            }
          >
            Listado
          </Header>
        }
        filter={
          <PropertyFilter
            {...propertyFilterProps}
            filteringPlaceholder="Buscar docente investigador"
            countText={`${filteredItemsCount} coincidencias`}
            expandToViewport
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
    </>
  );
};
