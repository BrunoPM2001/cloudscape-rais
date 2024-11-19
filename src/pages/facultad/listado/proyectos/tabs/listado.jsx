import {
  Box,
  Header,
  Pagination,
  PropertyFilter,
  SpaceBetween,
  Table,
  ButtonDropdown,
  Badge,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import axiosBase from "../../../../../api/axios";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "Tipo",
    key: "tipo_proyecto",
    groupValuesLabel: "Tipos",
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
    propertyLabel: "Periodo",
    key: "periodo",
    groupValuesLabel: "Periodos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Resolución",
    key: "resolucion_rectoral",
    groupValuesLabel: "Resoluciones",
    operators: stringOperators,
  },
  {
    propertyLabel: "Responsable",
    key: "responsable",
    groupValuesLabel: "Responsables",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de Inscripción",
    key: "fecha_inscripcion",
    groupValuesLabel: "Fechas de Inscripción",
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
    minWidth: 400,
  },
  {
    id: "resolucion_rectoral",
    header: "Resolución",
    cell: (item) => item.resolucion_rectoral,
    sortingField: "resolucion_rectoral",
  },
  {
    id: "periodo",
    header: "Periodo",
    cell: (item) => item.periodo,
    sortingField: "periodo",
  },
  {
    id: "deuda",
    header: "Deuda",
    cell: (item) => (
      <Badge
        color={
          item.deuda == "Sin deuda"
            ? "green"
            : item.deuda == "Deuda Académica"
            ? "severity-medium"
            : item.deuda == "Deuda Económica"
            ? "severity-low"
            : item.deuda == "Deuda Académica y Económica"
            ? "red"
            : item.deuda == "Subsanado"
            ? "blue"
            : "grey"
        }
      >
        {item.deuda}
      </Badge>
    ),

    sortingField: "deuda",
    minWidth: "180px",
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
    minWidth: "200px",
  },
  {
    id: "estado",
    header: "Estado ",
    cell: (item) => (
      <Badge
        color={
          item.estado == "Eliminado"
            ? "red"
            : item.estado == "No aprobado"
            ? "severity-high"
            : item.estado == "Aprobado"
            ? "green"
            : item.estado == "En evaluación"
            ? "grey"
            : item.estado == "Enviado"
            ? "blue"
            : item.estado == "En proceso"
            ? "grey"
            : item.estado == "Anulado"
            ? "severity-critical"
            : item.estado == "Sustentado"
            ? "blue"
            : item.estado == "En ejecución"
            ? "blue"
            : item.estado == "Ejecutado"
            ? "green"
            : item.estado == "Concluido"
            ? "severity-low"
            : "red"
        }
      >
        {item.estado}
      </Badge>
    ),
    sortingField: "estado",
    minWidth: 135,
  },
];

const columnDisplay = [
  { id: "tipo_proyecto", visible: true },
  { id: "codigo_proyecto", visible: true },
  { id: "titulo", visible: true },
  { id: "periodo", visible: true },
  { id: "deuda", visible: true },
  { id: "responsable", visible: true },
  { id: "fecha_inscripcion", visible: true },
  { id: "estado", visible: true },
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
    const res = await axiosBase.get("facultad/listado/proyectos/listado");
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
      wrapLines
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar proyecto"
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
              <ButtonDropdown
                disabled={loading}
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
