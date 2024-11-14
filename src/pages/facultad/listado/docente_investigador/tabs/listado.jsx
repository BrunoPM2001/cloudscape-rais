import {
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
    propertyLabel: "Tipo de Evaluación",
    key: "tipo_evaluacion",
    groupValuesLabel: "Tipos de Evaluaciones",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de Constancia",
    key: "fecha_constancia",
    groupValuesLabel: "Fechas de Constancia",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha Fin",
    key: "fecha_fin",
    groupValuesLabel: "Fecha Fins",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo de Docente",
    key: "tipo_docente",
    groupValuesLabel: "Tipos de Docentes",
    operators: stringOperators,
  },
  {
    propertyLabel: "Codigo Orcid",
    key: "codigo_orcid",
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
    propertyLabel: "Movil",
    key: "telefono_celular",
    groupValuesLabel: "Móviles",
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
    id: "estado",
    header: "Estado",
    cell: (item) => item.estado,
    sortingField: "estado",
  },
  {
    id: "tipo_evaluacion",
    header: "Tipo de Evaluación",
    cell: (item) => item.tipo_eval,
    sortingField: "tipo_evaluacion",
  },
  {
    id: "fecha_constancia",
    header: "Fecha de Constancia",
    cell: (item) => item.fecha_constancia,
    sortingField: "fecha_constancia",
  },
  {
    id: "fecha_fin",
    header: "Fecha Fin",
    cell: (item) => item.fecha_fin,
    sortingField: "fecha_fin",
  },
  {
    id: "tipo_docente",
    header: "Tipo de Docente",
    cell: (item) => item.tipo_docente,
    sortingField: "tipo_docente",
  },
  {
    id: "codigo_orcid",
    header: "Codigo Orcid",
    cell: (item) => item.codigo_orcid,
    sortingField: "codigo_orcid",
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
    id: "telefono_celular",
    header: "Movil",
    cell: (item) => item.telefono_movil,
    sortingField: "telefono_celular",
  },
];

const columnDisplay = [
  { id: "estado", visible: true },
  { id: "tipo_evaluacion", visible: true },
  { id: "fecha_constancia", visible: true },
  { id: "fecha_fin", visible: true },
  { id: "tipo_docente", visible: true },
  { id: "codigo_orcid", visible: true },
  { id: "apellido_paterno", visible: true },
  { id: "apellido_materno", visible: true },
  { id: "nombres", visible: true },
  { id: "tipo_documento", visible: true },
  { id: "num_documento", visible: true },
  { id: "telefono_celular", visible: true },
];

const Listado = () => {
  const [loading, setLoading] = useState(true);
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
      wrapLines
      header={
        <Header
          counter={"(" + distributions.length + ")"}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="primary">Reporte en xlsx</Button>
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

export default Listado;
