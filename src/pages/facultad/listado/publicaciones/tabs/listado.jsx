import {
  Badge,
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
import queryString from "query-string";
import axiosBase from "../../../../../api/axios";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "Código de Registro",
    key: "codigo_registro",
    groupValuesLabel: "Códigos de Registro",
    operators: stringOperators,
  },
  {
    propertyLabel: "Título",
    key: "titulo",
    groupValuesLabel: "Títulos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Estado",
    key: "estado",
    groupValuesLabel: "Estados",
    operators: stringOperators,
  },
  {
    propertyLabel: "Año de Publicación",
    key: "year_publicacion",
    groupValuesLabel: "Años de Publicación",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de Inscripción",
    key: "fecha_inscripcion",
    groupValuesLabel: "Fechas de Inscripción",
    operators: stringOperators,
  },
  {
    propertyLabel: "ISBN",
    key: "isbn",
    groupValuesLabel: "ISBN",
    operators: stringOperators,
  },
  {
    propertyLabel: "ISSN",
    key: "issn",
    groupValuesLabel: "ISSN",
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
    id: "codigo_registro",
    header: "Código de Registro",
    cell: (item) => item.codigo_registro,
    sortingField: "codigo_registro",
    minWidth: 150,
  },
  {
    id: "tipo_publicacion",
    header: "Tipo de Publicación",
    cell: (item) => item.tipo_publicacion,
    sortingField: "tipo_publicacion",
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
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge
        color={
          item.estado === "Registrado"
            ? "green"
            : item.estado === "Observado"
            ? "severity-low"
            : item.estado === "Enviado"
            ? "blue"
            : item.estado === "En proceso"
            ? "grey"
            : item.estado === "Anulado"
            ? "red"
            : item.estado === "No Registrado"
            ? "severity-medium"
            : item.estado === "Reg. Duplicado"
            ? "severity-high"
            : "severity-critical"
        }
      >
        {item.estado}
      </Badge>
    ),
    sortingField: "estado",
    minWidth: 130,
  },

  {
    id: "year_publicacion",
    header: "Año de Publicación",
    cell: (item) => item.year_publicacion,
    sortingField: "year_publicacion",
  },
  {
    id: "fecha_inscripcion",
    header: "Fecha de Inscripción",
    cell: (item) => item.fecha_inscripcion,
    sortingField: "fecha_inscripcion",
    minWidth: 150,
  },
  {
    id: "isbn",
    header: "ISBN",
    cell: (item) => item.isbn,
    sortingField: "isbn",
    minWidth: 150,
  },
  {
    id: "issn",
    header: "ISSN",
    cell: (item) => item.issn,
    sortingField: "issn",
    minWidth: 150,
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "codigo_registro", visible: true },
  { id: "tipo_publicacion", visible: true },
  { id: "titulo", visible: true },
  { id: "estado", visible: true },
  { id: "year_publicacion", visible: true },
  { id: "fecha_inscripcion", visible: true },
  { id: "isbn", visible: true },
  { id: "issn", visible: true },
];

const Listado = () => {
  const [loading, setLoading] = useState(true);
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

  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("facultad/listado/publicaciones/listado");
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
      selectionType="single"
      onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
      enableKeyboardNavigation
      wrapLines
      header={
        <Header
          counter={"(" + distributions.length + ")"}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <ButtonDropdown
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
          Publicaciones
        </Header>
      }
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar publicaciones..."
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
  );
};

export default Listado;
