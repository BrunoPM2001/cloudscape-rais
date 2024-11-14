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
    propertyLabel: "Código",
    key: "codigo",
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
    propertyLabel: "Deuda",
    key: "deuda",
    groupValuesLabel: "Deudas",
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
    id: "codigo",
    header: "Código",
    cell: (item) => item.codigo,
    sortingField: "codigo",
  },
  {
    id: "titulo",
    header: "Título",
    cell: (item) => item.xtitulo,
    sortingField: "titulo",
    minWidth: "400px",
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
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
    minWidth: "250px",
  },
  {
    id: "responsable",
    header: "Responsable",
    cell: (item) => item.responsable,
    sortingField: "responsable",
    minWidth: "300px",
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
  },
];

const columnDisplay = [
  { id: "codigo", visible: true },
  { id: "titulo", visible: true },
  { id: "deuda", visible: true },
  { id: "facultad", visible: true },
  { id: "responsable", visible: true },
  { id: "fecha_inscripcion", visible: true },
  { id: "estado", visible: true },
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
    const res = await axiosBase.get("facultad/listado/proyectos/listado");
    const sanitizedData = res.data.proyectos.map((item) => ({
      ...item,
      codigo: item.codigo || "-",
      xtitulo: item.xtitulo || "-",
      deuda: item.deuda || "-",
      facultad: item.facultad || "-",
      responsable: item.responsable || "-",
      fecha_inscripcion: item.fecha_inscripcion || "-",
      estado: item.estado || "-",
    }));
    setDistribution(sanitizedData);
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
      enableKeyboardNavigation
      wrapLines
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar investigador"
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
