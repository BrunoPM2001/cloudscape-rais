import {
  Badge,
  Box,
  Button,
  Header,
  Pagination,
  PropertyFilter,
  SpaceBetween,
  Table,
  Container,
  ButtonDropdown,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
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
    propertyLabel: "Código",
    key: "codigo",
    groupValuesLabel: "Códigos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo de docente",
    key: "tipo",
    groupValuesLabel: "Tipos de docentes",
    operators: stringOperators,
  },
  {
    propertyLabel: "Apellidos y Nombres",
    key: "docente",
    groupValuesLabel: "Apellidos y Nombres",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de nacimiento",
    key: "fecha_nacimiento",
    groupValuesLabel: "Fechas de nacimiento",
    operators: stringOperators,
  },

  {
    propertyLabel: "Edad",
    key: "edad",
    groupValuesLabel: "Edades",
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
    propertyLabel: "Renacyt",
    key: "renacyt",
    groupValuesLabel: "Renacyts",
    operators: stringOperators,
  },
  {
    propertyLabel: "Nivel de renacyt",
    key: "nivel_renacyt",
    groupValuesLabel: "Niveles de renacyt",
    operators: stringOperators,
  },
  {
    propertyLabel: "Código Orcid",
    key: "codigo_orcid",
    groupValuesLabel: "Códigos Orcid",
    operators: stringOperators,
  },
  {
    propertyLabel: "Sexo",
    key: "sexo",
    groupValuesLabel: "Sexos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Puntaje",
    key: "puntaje_total",
    groupValuesLabel: "Puntajes",
    operators: stringOperators,
  },
];

const columnDefinitions = [
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
    width: "200px",
  },
  {
    id: "codigo",
    header: "Código",
    cell: (item) => item.codigo,
    sortingField: "codigo",
  },
  {
    id: "tipo",
    header: "Tipo Docente",
    cell: (item) => item.tipo,
    sortingField: "tipo",
    width: "200px",
  },
  {
    id: "docente",
    header: "Apellidos y Nombres",
    cell: (item) => item.docente,
    sortingField: "docente", // Cambia a "nombre_completo" si este campo está calculado en los datos
    width: "300px",
  },
  {
    id: "fecha_nacimiento",
    header: "Fecha de nacimiento",
    cell: (item) => item.fecha_nacimiento,
    sortingField: "fecha_nacimiento",
  },
  {
    id: "edad",
    header: "Edad",
    cell: (item) => item.edad,
    sortingField: "edad",
  },
  {
    id: "tipo_documento",
    header: "Tipo Documento",
    cell: (item) => item.tipo_documento,
    sortingField: "tipo_documento",
  },
  {
    id: "num_documento",
    header: "Edad",
    cell: (item) => item.num_documento,
    sortingField: "num_documento",
  },
  {
    id: "renacyt",
    header: "Renacyt",
    cell: (item) => item.renacyt,
    sortingField: "renacyt",
  },
  {
    id: "renacyt_nivel",
    header: "Renacyt Nivel",
    cell: (item) => item.renacyt_nivel,
    sortingField: "renacyt_nivel",
  },
  {
    id: "codigo_orcid",
    header: "Código Orcid",
    cell: (item) => item.codigo_orcid,
    sortingField: "codigo_orcid",
  },
  {
    id: "sexo",
    header: "Sexo",
    cell: (item) => item.sexo,
    sortingField: "sexo",
  },

  {
    id: "puntaje_total",
    header: "Puntaje",
    cell: (item) => item.puntaje_total,
    sortingField: "puntaje_total",
  },
];

const columnDisplay = [
  { id: "facultad", visible: true },
  { id: "codigo", visible: true },
  { id: "tipo", visible: true },
  { id: "docente", visible: true },
  { id: "fecha_nacimiento", visible: true },
  { id: "edad", visible: true },
  { id: "tipo_documento", visible: true },
  { id: "num_documento", visible: true },
  { id: "renacyt", visible: true },
  { id: "nivel_renacyt", visible: true },
  { id: "codigo_orcid", visible: true },
  { id: "sexo", visible: true },
  { id: "puntaje_total", visible: true },
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
    const res = await axiosBase.get("facultad/listado/investigadores/listado");
    setDistribution(res.data);
    setLoading(false);
  };
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
            Listado de Investigadores
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
    </>
  );
};

export default Listado;
