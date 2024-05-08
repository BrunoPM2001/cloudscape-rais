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
import { useLocation } from "react-router-dom";
import queryString from "query-string";
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
    propertyLabel: "Facultad",
    key: "facultad",
    groupValuesLabel: "Facultades",
    operators: stringOperators,
  },
  {
    propertyLabel: "Cupos",
    key: "cupos",
    groupValuesLabel: "Cantidad de cupos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Puntaje mínimo",
    key: "puntaje_minimo",
    groupValuesLabel: "Puntajes mínimos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de inicio",
    key: "fecha_inicio",
    groupValuesLabel: "Fechas de inicio",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de fin",
    key: "fecha_fin",
    groupValuesLabel: "Fechas de fin",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de inicio de evaluación",
    key: "evaluacion_fecha_inicio",
    groupValuesLabel: "Fechas de inicio de evaluación",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de fin de evaluación",
    key: "evaluacion_fecha_fin",
    groupValuesLabel: "Fechas de fin de evaluación",
    operators: stringOperators,
  },
  {
    propertyLabel: "Evaluadores",
    key: "evaluadores",
    groupValuesLabel: "Cantidad de evaluadores",
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
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
  },
  {
    id: "cupos",
    header: "Cupos",
    cell: (item) => item.cupos,
    sortingField: "cupos",
  },
  {
    id: "puntaje_minimo",
    header: "Puntaje mínimo",
    cell: (item) => item.puntaje_minimo,
    sortingField: "puntaje_minimo",
  },
  {
    id: "fecha_inicio",
    header: "Fecha de inicio",
    cell: (item) => item.fecha_inicio,
    sortingField: "fecha_inicio",
  },
  {
    id: "fecha_fin",
    header: "Fecha de fin",
    cell: (item) => item.fecha_fin,
    sortingField: "fecha_fin",
  },
  {
    id: "evaluacion_fecha_inicio",
    header: "Fecha de inicio de evaluación",
    cell: (item) => item.evaluacion_fecha_inicio,
    sortingField: "evaluacion_fecha_inicio",
  },
  {
    id: "evaluacion_fecha_fin",
    header: "Fecha de fin de evaluación",
    cell: (item) => item.evaluacion_fecha_fin,
    sortingField: "evaluacion_fecha_fin",
  },
  {
    id: "evaluadores",
    header: "Cantidad de evaluadores",
    cell: (item) => item.evaluadores,
    sortingField: "evaluadores",
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "facultad", visible: true },
  { id: "cupos", visible: true },
  { id: "puntaje_minimo", visible: true },
  { id: "fecha_inicio", visible: true },
  { id: "fecha_fin", visible: true },
  { id: "evaluacion_fecha_inicio", visible: true },
  { id: "evaluacion_fecha_fin", visible: true },
  { id: "evaluadores", visible: true },
];

export default () => {
  //  Data states
  const [loadingConvocatorias, setLoadingConvocatorias] = useState(true);
  const [loadingEvaluadores, setLoadingEvaluadores] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [evaluadores, setEvaluadores] = useState([]);
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
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
    selection: {},
  });

  //  Url
  const location = useLocation();
  const { periodo, tipo_proyecto } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoadingConvocatorias(true);
    const res = await axiosBase.get(
      "admin/facultad/convocatorias/getDetalleConvocatoria/" +
        periodo +
        "/" +
        tipo_proyecto
    );
    const data = await res.data;
    setDistribution(data.data);
    setLoadingConvocatorias(false);
  };

  const getEvaluadores = async () => {
    setLoadingEvaluadores(true);
    const res = await axiosBase.get(
      "admin/facultad/convocatorias/getEvaluadoresConvocatoria/" +
        selectedItems[0].id
    );
    const data = await res.data;
    setEvaluadores(data.data);
    setLoadingEvaluadores(false);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getEvaluadores();
  }, [selectedItems]);

  return (
    <SpaceBetween size="m">
      <Table
        {...collectionProps}
        trackBy="id"
        items={items}
        columnDefinitions={columnDefinitions}
        columnDisplay={columnDisplay}
        loading={loadingConvocatorias}
        loadingText="Cargando datos"
        resizableColumns
        enableKeyboardNavigation
        selectionType="single"
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        onRowClick={({ detail }) => setSelectedItems([detail.item])}
        header={
          <Header
            counter={
              selectedItems.length
                ? "(" + selectedItems.length + "/" + items.length + ")"
                : "(" + items.length + ")"
            }
          >
            Listado de convocatorias
          </Header>
        }
        filter={
          <PropertyFilter
            {...propertyFilterProps}
            filteringPlaceholder="Buscar grupo"
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
      <Table
        columnDefinitions={[
          {
            id: "tipo",
            header: "Tipo",
            cell: (item) => item.tipo,
          },
          {
            id: "apellidos",
            header: "Apellidos",
            cell: (item) => item.apellidos,
          },
          {
            id: "nombres",
            header: "Nombres",
            cell: (item) => item.nombres,
          },
          {
            id: "institucion",
            header: "Institución",
            cell: (item) => item.institucion,
          },
          {
            id: "cargo",
            header: "Cargo",
            cell: (item) => item.cargo,
          },
          {
            id: "codigo_regina",
            header: "Código regina",
            cell: (item) => item.codigo_regina,
          },
        ]}
        columnDisplay={[
          { id: "tipo", visible: true },
          { id: "apellidos", visible: true },
          { id: "nombres", visible: true },
          { id: "institucion", visible: true },
          { id: "cargo", visible: true },
          { id: "codigo_regina", visible: true },
        ]}
        trackBy="apellidos"
        enableKeyboardNavigation
        items={evaluadores}
        loadingText="Cargando datos"
        loading={loadingEvaluadores}
        resizableColumns
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
        header={<Header variant="h3">Evaluadores</Header>}
      />
    </SpaceBetween>
  );
};
