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
import queryString from "query-string";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "Estado",
    key: "estado",
    groupValuesLabel: "Estados",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo de evaluación",
    key: "tipo_eval",
    groupValuesLabel: "Tipos de evaluación",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo",
    key: "tipo",
    groupValuesLabel: "Tipos",
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
            item.estado == "Enviado"
              ? "blue"
              : item.estado == "No aprobado"
              ? "red"
              : item.estado == "Observado"
              ? "grey"
              : item.estado == "En trámite"
              ? "green"
              : item.estado == "Pendiente"
              ? "green"
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
    id: "tipo_eval",
    header: "Tipo de evaluación",
    cell: (item) => item.tipo_eval,
    sortingField: "tipo_eval",
  },
  {
    id: "dj",
    header: "DJ",
    cell: (item) => (
      <Button
        variant="inline-icon"
        href={item.url}
        target="_blank"
        iconName="file"
      />
    ),
    sortingField: "id",
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
    sortingField: "tipo",
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
    minWidth: 180,
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
  {
    id: "created_at",
    header: "Fecha de creación",
    cell: (item) => item.created_at,
    sortingField: "created_at",
    minWidth: 120,
  },
];

const columnDisplay = [
  { id: "estado", visible: true },
  { id: "tipo_eval", visible: true },
  { id: "dj", visible: true },
  { id: "tipo", visible: true },
  { id: "facultad", visible: true },
  { id: "codigo_orcid", visible: true },
  { id: "apellido1", visible: true },
  { id: "apellido2", visible: true },
  { id: "nombres", visible: true },
  { id: "doc_tipo", visible: true },
  { id: "doc_numero", visible: true },
  { id: "telefono_movil", visible: true },
  { id: "email3", visible: true },
  { id: "created_at", visible: true },
];

export default () => {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
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

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/docentes/listado");
    const data = res.data;
    setDistribution(data);
    setLoading(false);
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
        columnDisplay={columnDisplay}
        loading={loading}
        loadingText="Cargando datos"
        wrapLines
        enableKeyboardNavigation
        selectionType="single"
        onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
        header={
          <Header
            counter={"(" + distributions.length + ")"}
            actions={
              <SpaceBetween size="s" direction="horizontal">
                <Button
                  variant="primary"
                  onClick={() => {
                    const query = queryString.stringify({
                      id: collectionProps.selectedItems[0]["id"],
                    });
                    window.location.href =
                      "docente_investigador/evaluacion?" + query;
                  }}
                  disabled={collectionProps.selectedItems.length == 0}
                >
                  Evaluar
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
            filteringPlaceholder="Buscar solicitud de docente investigador"
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
    </>
  );
};
