import {
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
    propertyLabel: "Fecha de Inscripción",
    key: "fecha_inscripcion",
    groupValuesLabel: "Fechas de Inscripción",
    operators: stringOperators,
  },
  {
    propertyLabel: "Periodo",
    key: "periodo",
    groupValuesLabel: "Periodos",
    operators: stringOperators,
  },
  {
    propertyLabel: "N° de Informe",
    key: "cantidad_informes",
    groupValuesLabel: "Números de Informe",
    operators: stringOperators,
  },
  {
    propertyLabel: "Responsable",
    key: "responsable",
    groupValuesLabel: "Responsables",
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
    id: "tipo_proyecto",
    header: "Tipo",
    cell: (item) => item.tipo_proyecto,
    sortingField: "tipo_proyecto",
  },
  {
    id: "codigo_proyecto",
    header: "Código",
    cell: (item) => item.codigo_proyecto,
    sortingField: "codigo_proyecto",
    minWidth: 150,
  },
  {
    id: "titulo",
    header: "Título",
    cell: (item) => item.titulo,
    sortingField: "titulo",
    minWidth: 400,
  },
  {
    id: "responsable",
    header: "Responsable",
    cell: (item) => item.responsable,
    sortingField: "responsable",
    minWidth: 300,
  },
  {
    id: "fecha_inscripcion",
    header: "Fecha de Inscripción",
    cell: (item) => item.fecha_inscripcion,
    sortingField: "fecha_inscripcion",
    minWidth: 150,
  },
  {
    id: "periodo",
    header: "Periodo",
    cell: (item) => item.periodo,
    sortingField: "periodo",
    minWidth: 100,
  },
  {
    id: "cantidad_informes",
    header: "N° de Informes",
    cell: (item) => item.cantidad_informes,
    sortingField: "cantidad_informes",
    minWidth: 100,
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "tipo_proyecto", visible: true },
  { id: "codigo_proyecto", visible: true },
  { id: "titulo", visible: true },
  { id: "responsable", visible: true },
  { id: "fecha_inscripcion", visible: true },
  { id: "periodo", visible: true },
  { id: "cantidad_informes", visible: true },
];

export default () => {
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
    const res = await axiosBase.get("facultad/listado/informes/listado");
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
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar Informe Académico ..."
          countText={`${filteredItemsCount} coincidencias`}
          expandToViewport
        />
      }
      header={
        <Header counter={"(" + distributions.length + ")"}>
          Informes Académicos
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
