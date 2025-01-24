import {
  Table,
  Box,
  SpaceBetween,
  Header,
  Link,
  Badge,
  Pagination,
  PropertyFilter,
  Button,
} from "@cloudscape-design/components";
import queryString from "query-string";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosBase from "../../../../../../api/axios";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalAutorizarProyecto from "../components/modalAutorizarProyecto";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "Tipo de proyecto",
    key: "tipo_proyecto",
    groupValuesLabel: "Tipos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Código de proyecto",
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
    propertyLabel: "Periodo",
    key: "periodo",
    groupValuesLabel: "Periodos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Resolución rectoral",
    key: "resolucion_rectoral",
    groupValuesLabel: "Resoluciones rectorales",
    operators: stringOperators,
  },
  {
    propertyLabel: "Autorización de grupo",
    key: "autorizacion_grupo",
    groupValuesLabel: "Autorización de grupo",
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
    id: "tipo_proyecto",
    header: "Tipo",
    cell: (item) => item.tipo_proyecto,
    sortingField: "tipo_proyecto",
    minWidth: 120,
  },
  {
    id: "codigo_proyecto",
    header: "Código",
    cell: (item) => item.codigo_proyecto,
    sortingField: "codigo_proyecto",
    minWidth: 120,
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
    id: "periodo",
    header: "Periodo",
    cell: (item) => item.periodo,
    sortingField: "periodo",
    minWidth: 100,
  },
  {
    id: "resolucion_rectoral",
    header: "R.R.",
    cell: (item) => item.resolucion_rectoral,
    sortingField: "resolucion_rectoral",
    minWidth: 100,
  },
  {
    id: "autorizacion_grupo",
    header: "Autorización",
    cell: (item) => (
      <Box textAlign="center">
        <Badge
          color={
            item.autorizacion_grupo == "Sí"
              ? "green"
              : item.autorizacion_grupo == "No"
              ? "red"
              : "grey"
          }
        >
          {item.autorizacion_grupo}
        </Badge>
      </Box>
    ),
    sortingField: "autorizacion_grupo",
    minWidth: 100,
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
            : item.estado == "En evaluación"
            ? "blue"
            : item.estado == "Enviado"
            ? "blue"
            : item.estado == "En proceso"
            ? "grey"
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
];

const columnDisplay = [
  { id: "tipo_proyecto", visible: true },
  { id: "codigo_proyecto", visible: true },
  { id: "titulo", visible: true },
  { id: "responsable", visible: true },
  { id: "periodo", visible: true },
  { id: "resolucion_rectoral", visible: true },
  { id: "autorizacion_grupo", visible: true },
  { id: "estado", visible: true },
];

export default () => {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  States
  const [loading, setLoading] = useState(false);
  const [distributions, setDistribution] = useState([]);
  const [type, setType] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);

  //  Hooks
  const {
    items,
    actions,
    collectionProps,
    paginationProps,
    filteredItemsCount,
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
    const res = await axiosBase.get("investigador/grupo/listarProyectos", {
      params: {
        id,
      },
    });
    const data = res.data;
    setDistribution(data);
    setLoading(false);
  };

  const reporte = () => {};

  //  Data
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Table
        {...collectionProps}
        trackBy="id"
        loading={loading}
        columnDisplay={columnDisplay}
        columnDefinitions={columnDefinitions}
        items={items}
        enableKeyboardNavigation
        loadingText="Cargando datos"
        selectionType="single"
        wrapLines
        onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
        header={
          <Header
            counter={"(" + distributions.length + ")"}
            actions={
              <SpaceBetween size="xs" direction="horizontal">
                <Button
                  loading={loadingBtn}
                  onClick={reporte}
                  disabled={loading || !collectionProps.selectedItems.length}
                >
                  Reporte
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setType("autorizar")}
                  disabled={loading || !collectionProps.selectedItems.length}
                >
                  Autorizar
                </Button>
              </SpaceBetween>
            }
          >
            Proyectos
          </Header>
        }
        filter={
          <PropertyFilter
            {...propertyFilterProps}
            filteringPlaceholder="Buscar proyecto"
            countText={`${filteredItemsCount} coincidencias`}
            expandToViewport
          />
        }
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
        pagination={<Pagination {...paginationProps} />}
      />
      {type == "autorizar" && (
        <ModalAutorizarProyecto
          reload={getData}
          close={() => setType("")}
          item={collectionProps.selectedItems[0]}
        />
      )}
    </>
  );
};
