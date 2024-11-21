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
    propertyLabel: "Estado",
    key: "estado",
    groupValuesLabel: "Estados",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo de evaluación",
    key: "tipo_eval",
    groupValuesLabel: "Tipos de Evaluaciones",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de constancia",
    key: "fecha_constancia",
    groupValuesLabel: "Fechas de Constancia",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha fin",
    key: "fecha_fin",
    groupValuesLabel: "Fechas Fin",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo de Docente",
    key: "tipo_docente",
    groupValuesLabel: "Tipos de Docentes",
    operators: stringOperators,
  },
  {
    propertyLabel: "Código Orcid",
    key: "orcid",
    groupValuesLabel: "Orcids",
    operators: stringOperators,
  },
  {
    propertyLabel: "docente",
    key: "docente",
    groupValuesLabel: "Apellidos paternos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo de documento",
    key: "tipo_documento",
    groupValuesLabel: "Tipos de documentos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Número de documento",
    key: "num_documento",
    groupValuesLabel: "Números de documentos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Móvil",
    key: "telefono_movil",
    groupValuesLabel: "Móviles",
    operators: stringOperators,
  },
  {
    propertyLabel: "Correo institucional",
    key: "email3",
    groupValuesLabel: "Correos",
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
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge
        color={
          item.estado == "No vigente"
            ? "severity-critical"
            : item.estado == "Observado"
            ? "severity-medium"
            : item.estado == "Anulado"
            ? "red"
            : item.estado == "Vigente"
            ? "green"
            : item.estado == "No aprobado"
            ? "severity-high"
            : "blue"
        }
      >
        {item.estado}
      </Badge>
    ),
    sortingField: "estado",
    minWidth: 130,
  },
  {
    id: "tipo_eval",
    header: "Tipo de Evaluación",
    cell: (item) => item.tipo_eval,
    sortingField: "tipo_eval",
  },
  {
    id: "fecha_constancia",
    header: "Fecha de Constancia",
    cell: (item) => item.fecha_constancia,
    sortingField: "fecha_constancia",
    minWidth: 130,
  },
  {
    id: "fecha_fin",
    header: "Fecha Fin",
    cell: (item) => item.fecha_fin,
    sortingField: "fecha_fin",
    minWidth: 130,
  },
  {
    id: "tipo_docente",
    header: "Tipo de Docente",
    cell: (item) => item.tipo_docente,
    sortingField: "tipo_docente",
  },
  {
    id: "orcid",
    header: "Codigo Orcid",
    cell: (item) => item.orcid,
    sortingField: "orcid",
    minWidth: 130,
  },
  {
    id: "apellido_paterno",
    header: "Apellido Paterno",
    cell: (item) => item.apellido1,
    sortingField: "apellido_paterno",
  },
  {
    id: "apellido_materno",
    header: "Apellido Materno",
    cell: (item) => item.apellido2,
    sortingField: "apellido_materno",
  },
  {
    id: "nombres",
    header: "Nombres",
    cell: (item) => item.nombres,
    sortingField: "nombres",
  },
  {
    id: "tipo_documento",
    header: "Tipo de documento",
    cell: (item) => item.doc_tipo,
    sortingField: "tipo_documento",
  },
  {
    id: "num_documento",
    header: "Número de documento",
    cell: (item) => item.doc_numero,
    sortingField: "num_documento",
  },
  {
    id: "telefono_movil",
    header: "Movil",
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
  { id: "tipo_eval", visible: true },
  { id: "fecha_constancia", visible: true },
  { id: "fecha_fin", visible: true },
  { id: "tipo_docente", visible: true },
  { id: "orcid", visible: true },
  { id: "apellido_paterno", visible: true },
  { id: "apellido_materno", visible: true },
  { id: "nombres", visible: true },
  { id: "tipo_documento", visible: true },
  { id: "num_documento", visible: true },
  { id: "telefono_movil", visible: true },
  { id: "email3", visible: true },
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
    const res = await axiosBase.get(
      "facultad/listado/docente_investigador/listado"
    );
    setDistribution(res.data);
    setLoading(false);
  };

  const exportExcel = async () => {
    setLoadingReport(true);
    const res = await axiosBase.get(
      "facultad/listado/docente_investigador/excelDocentes",
      {
        responseType: "blob",
      }
    );
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
      header={
        <Header
          counter={"(" + distributions.length + ")"}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                variant="primary"
                disabled={loading}
                loading={loadingReport}
                onClick={exportExcel}
              >
                Reporte en xlsx
              </Button>
            </SpaceBetween>
          }
        >
          Docentes investigadores
        </Header>
      }
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar investigador"
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
    />
  );
};
