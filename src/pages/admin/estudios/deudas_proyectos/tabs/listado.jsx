import {
  Badge,
  Box,
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
    key: "proyecto_id",
    groupValuesLabel: "IDS",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo de proyecto",
    key: "tipo_proyecto",
    groupValuesLabel: "Tipos de proyecto",
    operators: stringOperators,
  },
  {
    propertyLabel: "Código",
    key: "codigo_proyecto",
    groupValuesLabel: "Códigos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Título",
    key: "titulo",
    groupValuesLabel: "Títulos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Facultad",
    key: "facultad",
    groupValuesLabel: "Facultades",
    operators: stringOperators,
  },
  {
    propertyLabel: "Deuda",
    key: "deuda",
    groupValuesLabel: "Deudas",
    operators: stringOperators,
  },
];

const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item) => item.proyecto_id,
    sortingField: "id",
    isRowHeader: true,
    maxSize: 5,
  },
  {
    id: "proyecto_origen",
    header: "Tabla",
    cell: (item) => item.proyecto_origen,
    sortingField: "proyecto_origen",
  },
  {
    id: "tipo_proyecto",
    header: "Tipo de proyecto",
    cell: (item) => item.tipo_proyecto,
    sortingField: "tipo_proyecto",
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
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
  },
  {
    id: "deuda",
    header: "Deuda",
    cell: (item) => (
      <Badge color={item.deuda == "Sí" || item.deuda == "SI" ? "red" : "green"}>
        {item.deuda}
      </Badge>
    ),
    sortingField: "deuda",
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "proyecto_origen", visible: true },
  { id: "tipo_proyecto", visible: true },
  { id: "codigo_proyecto", visible: true },
  { id: "titulo", visible: true },
  { id: "facultad", visible: true },
  { id: "deuda", visible: true },
];

export default () => {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [loadingIntegrantes, setLoadingIntegrantes] = useState(false);
  const [integrantes, setIntegrantes] = useState([]);
  const [distributions, setDistribution] = useState([]);

  const {
    items,
    actions,
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

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/estudios/deudaProyecto/listadoProyectos"
    );
    const data = res.data;
    setDistribution(data);
    setLoading(false);
  };

  const getIntegrantes = async () => {
    setLoadingIntegrantes(true);
    const res = await axiosBase.get(
      "admin/estudios/deudaProyecto/listadoIntegrantes",
      {
        params: {
          id: collectionProps.selectedItems[0].proyecto_id,
          tabla: collectionProps.selectedItems[0].proyecto_origen,
        },
      }
    );
    const data = res.data;
    setIntegrantes(data);
    setLoadingIntegrantes(false);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (collectionProps.selectedItems.length != 0) {
      getIntegrantes();
    }
  }, [collectionProps.selectedItems]);

  return (
    <SpaceBetween size="l">
      <Table
        {...collectionProps}
        trackBy="id"
        items={items}
        columnDefinitions={columnDefinitions}
        columnDisplay={columnDisplay}
        loading={loading}
        loadingText="Cargando datos"
        enableKeyboardNavigation
        header={<Header>Listado de proyectos</Header>}
        selectionType="single"
        onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
        wrapLines
        filter={
          <PropertyFilter
            {...propertyFilterProps}
            filteringPlaceholder="Buscar proyecto"
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
      <Table
        columnDefinitions={[
          {
            id: "id",
            header: "ID",
            cell: (item) => item.id,
          },
          {
            id: "doc_numero",
            header: "N° de documento",
            cell: (item) => item.doc_numero,
          },
          {
            id: "apellido1",
            header: "Ap. Paterno",
            cell: (item) => item.apellido1,
          },
          {
            id: "apellido2",
            header: "Ap. Materno",
            cell: (item) => item.apellido2,
          },
          {
            id: "nombres",
            header: "Nombres",
            cell: (item) => item.nombres,
          },
          {
            id: "condicion",
            header: "Condición",
            cell: (item) => item.condicion,
          },
          {
            id: "licencia",
            header: "Licencia",
            cell: (item) => item.licencia,
          },
          {
            id: "tipo_deuda",
            header: "Tipo de deuda",
            cell: (item) => item.tipo_deuda,
          },
          {
            id: "informe",
            header: "Informe",
            cell: (item) => item.informe,
          },
          {
            id: "detalle",
            header: "Detalle",
            cell: (item) => item.detalle,
          },
          {
            id: "fecha_sub",
            header: "Fecha de subsanación",
            cell: (item) => item.fecha_sub,
          },
        ]}
        columnDisplay={[
          { id: "id", visible: true },
          { id: "doc_numero", visible: true },
          { id: "apellido1", visible: true },
          { id: "apellido2", visible: true },
          { id: "nombres", visible: true },
          { id: "condicion", visible: true },
          { id: "licencia", visible: true },
          { id: "tipo_deuda", visible: true },
          { id: "informe", visible: true },
          { id: "detalle", visible: true },
          { id: "fecha_sub", visible: true },
        ]}
        enableKeyboardNavigation
        items={integrantes}
        loadingText="Cargando datos"
        loading={loadingIntegrantes}
        resizableColumns
        trackBy="id"
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
        header={<Header>Integrantes</Header>}
      />
    </SpaceBetween>
  );
};
