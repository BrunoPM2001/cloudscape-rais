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
import { useState, useEffect } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import axiosBase from "../../../../../api/axios";

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
    key: "updated_at",
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
    key: "tipo_proyecto",
    groupValuesLabel: "Tipos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Grupo",
    key: "grupo_nombre",
    groupValuesLabel: "Grupos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Programa",
    key: "programa",
    groupValuesLabel: "Programas",
    operators: stringOperators,
  },
  {
    propertyLabel: "Línea",
    key: "linea",
    groupValuesLabel: "Líneas",
    operators: stringOperators,
  },
  {
    propertyLabel: "Total",
    key: "total",
    groupValuesLabel: "Totales",
    operators: stringOperators,
  },
  {
    propertyLabel: "RR",
    key: "resolucion",
    groupValuesLabel: "RR",
    operators: stringOperators,
  },
];

const columnDefinitions = [
  {
    id: "proyecto_id",
    header: "proyecto_id",
    cell: (item) => item.proyecto_id,
    sortingField: "id",
    minWidth: 100,
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
    header: "Título del Proyecto",
    cell: (item) => item.titulo,
    sortingField: "titulo",
    minWidth: 400,
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <span
        style={{
          display: "inline-block",
          padding: "0.2em 0.5em",
          borderRadius: "4px",
          color: "white",
          backgroundColor:
            item.estado === "Eliminado"
              ? "#FF4D4F" // custom red
              : item.estado === "No aprobado"
              ? "#595959" // dark grey
              : item.estado === "Aprobado"
              ? "#4CAF50" // green
              : item.estado === "En evaluación"
              ? "#1890FF" // blue
              : item.estado === "Enviado"
              ? "#007ACC" // light blue
              : item.estado === "En proceso"
              ? "#BFBFBF" // light grey
              : item.estado === "Anulado"
              ? "#A8071A" // dark red
              : item.estado === "Sustentado"
              ? "#2F54EB" // navy blue
              : item.estado === "En ejecución"
              ? "#13C2C2" // teal
              : item.estado === "Ejecutado"
              ? "#237804" // dark green
              : item.estado === "Concluido"
              ? "#52C41A" // emerald green
              : "#D9D9D9", // default color
        }}
      >
        {item.estado}
      </span>
    ),
    sortingField: "estado",
    minWidth: 150,
  },
  {
    id: "updated_at",
    header: "Fecha de Actualización",
    cell: (item) => item.updated_at,
    sortingField: "updated_at",
    minWidth: 200,
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
    minWidth: 250,
  },
  {
    id: "responsable",
    header: "Responsable",
    cell: (item) => item.responsable,
    sortingField: "responsable",
    minWidth: 250,
  },
  {
    id: "tipo_proyecto",
    header: "Tipo",
    cell: (item) => item.tipo_proyecto,
    sortingField: "tipo_proyecto",
    minWidth: 150,
  },
  {
    id: "grupo_nombre",
    header: "Grupo",
    cell: (item) => item.grupo_nombre,
    sortingField: "grupo_nombre",
    minWidth: 300,
  },
  {
    id: "programa",
    header: "Programa",
    cell: (item) => item.programa,
    sortingField: "programa",
    width: 200,
  },
  {
    id: "linea",
    header: "Línea",
    cell: (item) => item.linea,
    sortingField: "linea",
    minWidth: 300,
  },
  {
    id: "total",
    header: "Total",
    cell: (item) => item.total,
    sortingField: "total",
    width: 130,
  },
  {
    id: "resolucion",
    header: "Resolucion Rectoral",
    cell: (item) => item.resolucion,
    sortingField: "resolucion",
    minWidth: 250,
  },
];

const columnDisplay = [
  { id: "proyecto_id", visible: false },
  { id: "codigo_proyecto", visible: true },
  { id: "titulo", visible: true },
  { id: "estado", visible: true },
  { id: "updated_at", visible: true },
  { id: "facultad", visible: true },
  { id: "responsable", visible: true },
  { id: "tipo_proyecto", visible: true },
  { id: "grupo_nombre", visible: true },
  { id: "programa", visible: false },
  { id: "linea", visible: true },
  { id: "total", visible: true },
  { id: "resolucion", visible: true },
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
    const res = await axiosBase.get("facultad/listado/proyectos_gi/");
    setDistribution(res.data.proyectos); // Accede directamente al array de proyectos
    console.log(res.data.proyectos);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Table
      {...collectionProps}
      trackBy="proyecto_id"
      items={items}
      columnDefinitions={columnDefinitions}
      columnDisplay={columnDisplay}
      loading={loading}
      loadingText="Cargando datos"
      // resizableColumns
      enableKeyboardNavigation
      selectionType="single"
      wrapLines
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar proyectos..."
          countText={`${filteredItemsCount} coincidencias`}
          expandToViewport
        />
      }
      header={
        <Header
          // counter={"(" + distributions.length + ")"}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <ButtonDropdown
                // disabled={!enableBtn || grupo_estado < 0}
                variant="primary"
                items={[
                  {
                    text: "Reporte en PDF",
                    id: "action_2_1",
                    disabled: false,
                  },
                  {
                    text: "Reporte en Excel",
                    id: "action_2_2",
                    disabled: false,
                  },
                ]}
                // onItemClick={({ detail }) => {
                //     if (detail.id == "action_2_1") {
                //         setIncluirVisible(true);
                //         setTypeModal("Excluir");
                //     } else if (detail.id == "action_2_2") {
                //         setIncluirVisible(true);
                //         setTypeModal("Visualizar");
                //     } else if (detail.id == "action_2_3") {
                //         setIncluirVisible(true);
                //         setTypeModal("Condicion");
                //     } else if (detail.id == "action_2_4") {
                //         setIncluirVisible(true);
                //         setTypeModal("Cargo");
                //     }
                // }}
              >
                Reportes
              </ButtonDropdown>
            </SpaceBetween>
          }
        >
          Proyectos de Investigación
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

export default Listado;
