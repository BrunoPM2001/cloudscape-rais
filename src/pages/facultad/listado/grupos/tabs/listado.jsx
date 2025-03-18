import {
  Badge,
  Box,
  Button,
  Header,
  Pagination,
  PropertyFilter,
  SpaceBetween,
  Table,
  ButtonDropdown,
} from "@cloudscape-design/components";
import { useState, useEffect, useContext } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "Código",
    key: "codigo_proyecto",
    groupValuesLabel: "Códigos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Título del Proyecto",
    key: "titulo",
    groupValuesLabel: "Títulos de Proyecto",
    operators: stringOperators,
  },
  {
    propertyLabel: "Estado",
    key: "estado",
    groupValuesLabel: "Estados",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de Actualización",
    key: "fecha_actualizacion",
    groupValuesLabel: "Fechas de Actualización",
    operators: stringOperators,
  },
  {
    propertyLabel: "Facultad",
    key: "facultad",
    groupValuesLabel: "Facultades",
    operators: stringOperators,
  },
  {
    propertyLabel: "Responsable",
    key: "responsable",
    groupValuesLabel: "Responsables",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo",
    key: "tipo",
    groupValuesLabel: "Tipos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Grupo",
    key: "nombre_grupo",
    groupValuesLabel: "Grupos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Categoría",
    key: "categoria",
    groupValuesLabel: "Categorías",
    operators: stringOperators,
  },
  {
    propertyLabel: "Total Integrantes",
    key: "num_integrantes",
    groupValuesLabel: "Totales",
    operators: stringOperators,
  },
  {
    propertyLabel: "Resolución",
    key: "resolucion",
    groupValuesLabel: "Resoluciones",
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
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
    sortingField: "tipo",
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge
        color={
          item.estado === "Disuelto"
            ? "severity-critical"
            : item.estado === "Eliminado"
            ? "severity-high"
            : item.estado === "Reconocido"
            ? "green"
            : item.estado === "Observado"
            ? "severity-medium"
            : item.estado === "Registrado"
            ? "blue"
            : item.estado === "Enviado"
            ? "grey"
            : item.estado === "En proceso"
            ? "severity-low"
            : item.estado === "Reg. Observado"
            ? "red"
            : "red"
        }
      >
        {item.estado}
      </Badge>
    ),
    sortingField: "estado",
  },
  {
    id: "observaciones",
    header: "Observaciones",
    cell: (item) => item.observaciones,
    sortingField: "observaciones",
    minWidth: 600,
  },
  {
    id: "nombre_grupo",
    header: "Nombre del Grupo",
    cell: (item) => item.grupo_nombre,
    sortingField: "nombre_grupo",
    minWidth: 400,
  },
  {
    id: "nombre_corto",
    header: "Nombre Corto",
    cell: (item) => item.grupo_nombre_corto,
    sortingField: "nombre_corto",
  },
  {
    id: "categoria",
    header: "Categoría",
    cell: (item) => item.grupo_categoria,
    sortingField: "categoria",
  },
  {
    id: "coordinador",
    header: "Coordinador",
    cell: (item) => item.coordinador,
    sortingField: "coordinador",
    minWidth: 300,
  },
  {
    id: "num_integrantes",
    header: "Total Integrantes",
    cell: (item) => item.total_integrantes,
    sortingField: "total_integrantes",
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
    minWidth: 250,
  },
  {
    id: "resolucion",
    header: "Resolución",
    cell: (item) => item.resolucion_rectoral,
    sortingField: "resolucion",
    minWidth: 150,
  },
  {
    id: "fecha_actualizacion",
    header: "Fecha de Actualización",
    cell: (item) => item.updated_at,
    sortingField: "fecha_actualizacion",
    minWidth: 150,
  },
  {
    id: "fecha_creacion",
    header: "Fecha de Creación",
    cell: (item) => item.created_at,
    sortingField: "fecha_creacion",
    minWidth: 150,
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "tipo", visible: true },
  { id: "estado", visible: true },
  { id: "observaciones", visible: true },
  { id: "nombre_grupo", visible: true },
  { id: "nombre_corto", visible: true },
  { id: "categoria", visible: true },
  { id: "coordinador", visible: true },
  { id: "num_integrantes", visible: true },
  { id: "facultad", visible: true },
  { id: "resolucion", visible: true },
  { id: "fecha_actualizacion", visible: true },
  { id: "fecha_creacion", visible: true },
];

export default () => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  const [loading, setLoading] = useState(true);
  const [loadingReport, setLoadingReport] = useState(false);
  const [distributions, setDistribution] = useState([]);
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

  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("facultad/listado/grupos/listado");
    setDistribution(res.data);
    setLoading(false);
  };

  const reporte = async () => {
    setLoadingReport(true);
    const res = await axiosBase.get("facultad/listado/grupos/pdfGrupo", {
      params: {
        id: collectionProps.selectedItems[0].id,
      },
      responseType: "blob",
    });
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingReport(false);
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
      selectionType="single"
      onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
      wrapLines
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar grupo..."
          countText={`${filteredItemsCount} coincidencias`}
          virtualScroll
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
                onClick={exportExcel}
              >
                Exportar excel
              </Button>
              <Button
                disabled={loading || collectionProps.selectedItems.length == 0}
                loading={loadingReport}
                onClick={reporte}
                variant="primary"
              >
                Reporte de grupo
              </Button>
            </SpaceBetween>
          }
        >
          Grupos de Investigación
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
