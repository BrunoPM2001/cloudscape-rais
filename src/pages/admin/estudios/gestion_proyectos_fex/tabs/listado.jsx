import {
  Badge,
  Box,
  Button,
  ButtonDropdown,
  Header,
  Pagination,
  PropertyFilter,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import axiosBase from "../../../../../api/axios";
import queryString from "query-string";

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
    propertyLabel: "Aporte externo",
    key: "financiamiento_fuente_externa",
    groupValuesLabel: "Aportes externo",
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
  {
    propertyLabel: "Registrado",
    key: "registrado",
    groupValuesLabel: "Registrado",
    operators: stringOperators,
  },
  {
    propertyLabel: "Actualizado",
    key: "actualizado",
    groupValuesLabel: "Actualizado",
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
    minWidth: 250,
  },
  {
    id: "responsable",
    header: "Responsable",
    cell: (item) => item.responsable,
    sortingField: "responsable",
    minWidth: 200,
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
    header: "Aporte externo",
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
    id: "fecha_inicio",
    header: "Fecha inicio",
    cell: (item) => item.fecha_inicio,
    sortingField: "fecha_inicio",
  },
  {
    id: "fecha_fin",
    header: "Fecha fin",
    cell: (item) => item.fecha_fin,
    sortingField: "fecha_fin",
  },
  {
    id: "resolucion_rectoral",
    header: "Resolución rectoral",
    cell: (item) => item.resolucion_rectoral,
    sortingField: "resolucion_rectoral",
  },
  {
    id: "resolucion_fecha",
    header: "Resolución fecha",
    cell: (item) => item.resolucion_fecha,
    sortingField: "resolucion_fecha",
  },
  {
    id: "entidad_asociada",
    header: "Entidad asociada",
    cell: (item) => item.entidad_asociada,
    sortingField: "entidad_asociada",
  },
  {
    id: "pais",
    header: "País",
    cell: (item) => item.pais,
    sortingField: "pais",
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
            ? "red"
            : item.estado == "En evaluación"
            ? "blue"
            : item.estado == "Enviado"
            ? "blue"
            : item.estado == "En proceso"
            ? "severity-low"
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
  },
  {
    id: "registrado",
    header: "Registrado",
    cell: (item) => item.registrado,
    sortingField: "registrado",
  },
  {
    id: "actualizado",
    header: "Actualizado",
    cell: (item) => item.actualizado,
    sortingField: "actualizado",
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
  { id: "registrado", visible: true },
  { id: "actualizado", visible: true },
];

export default () => {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
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

  const reporte = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.get("admin/estudios/proyectosFEX/reporte", {
      params: {
        id: collectionProps.selectedItems[0].id,
      },
      responseType: "blob",
    });
    setLoadingBtn(false);
    const blob = res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const reporteExcel = async () => {
    if (allPageItems.length > 15000) {
      pushNotification(
        "La cantidad de items a exportar es demasiada, redúzcala a menos de 15000",
        "warning",
        notifications.length + 1
      );
    } else {
      const filteredItems = allPageItems.map((item) => ({ ...item }));

      setLoadingReport(true);
      const res = await axiosBase.post(
        "admin/estudios/proyectosFEX/excel",
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
      wrapLines
      selectionType="single"
      onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
      enableKeyboardNavigation
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
              <ButtonDropdown
                items={[
                  {
                    id: "action_1",
                    text: "Editar",
                  },
                  {
                    id: "action_2",
                    text: "Reporte",
                  },
                ]}
                onItemClick={({ detail }) => {
                  const query = queryString.stringify({
                    id: collectionProps.selectedItems[0]["id"],
                  });
                  if (detail.id == "action_1") {
                    window.open("proyectos_fex/detalle?" + query, "_blank");
                  } else if (detail.id == "action_2") {
                    reporte();
                  }
                }}
                loading={loadingBtn}
                disabled={loading || !collectionProps.selectedItems.length}
              >
                Acciones
              </ButtonDropdown>

              <Button
                variant="primary"
                onClick={() => (window.location.href = "proyectos_fex/paso_1")}
              >
                Nuevo
              </Button>
            </SpaceBetween>
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
