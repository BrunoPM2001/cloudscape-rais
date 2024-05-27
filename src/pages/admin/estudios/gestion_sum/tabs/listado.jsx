import {
  Autosuggest,
  Badge,
  Box,
  Button,
  ButtonDropdown,
  Container,
  FormField,
  Header,
  Input,
  Pagination,
  PropertyFilter,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import axiosBase from "../../../../../api/axios";
import { useAutosuggest } from "../../../../../hooks/useAutosuggest";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "Código",
    key: "codigo_alumno",
    groupValuesLabel: "Códigos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Nombre",
    key: "nombres",
    groupValuesLabel: "Nombres",
    operators: stringOperators,
  },
  {
    propertyLabel: "Ap. Paterno",
    key: "apellido_paterno",
    groupValuesLabel: "Ap. Paterno",
    operators: stringOperators,
  },
  {
    propertyLabel: "Ap. Materno",
    key: "apellido_materno",
    groupValuesLabel: "Ap. Materno",
    operators: stringOperators,
  },
  {
    propertyLabel: "Dni",
    key: "dni",
    groupValuesLabel: "Dnis",
    operators: stringOperators,
  },
  {
    propertyLabel: "Sexo",
    key: "sexo",
    groupValuesLabel: "Sexo",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de nacimiento",
    key: "fecha_nacimiento",
    groupValuesLabel: "Fechas de nacimiento",
    operators: stringOperators,
  },
  {
    propertyLabel: "Lugar de nacimiento",
    key: "lugar_nacimiento",
    groupValuesLabel: "Lugares de nacimiento",
    operators: stringOperators,
  },
  {
    propertyLabel: "Teléfono",
    key: "telefono",
    groupValuesLabel: "Teléfonos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Teléfono personal",
    key: "telefono_personal",
    groupValuesLabel: "Teléfonos personales",
    operators: stringOperators,
  },
  {
    propertyLabel: "Correo electrónico",
    key: "correo_electronico",
    groupValuesLabel: "Correos electrónicos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Correo electrónico personal",
    key: "correo_electronico_personal",
    groupValuesLabel: "Correos electrónicos personales",
    operators: stringOperators,
  },
  {
    propertyLabel: "Domicilio",
    key: "domicilio",
    groupValuesLabel: "Domicilios",
    operators: stringOperators,
  },
  {
    propertyLabel: "Facultad",
    key: "facultad",
    groupValuesLabel: "Facultades",
    operators: stringOperators,
  },
  {
    propertyLabel: "Programa",
    key: "programa",
    groupValuesLabel: "Programas",
    operators: stringOperators,
  },
  {
    propertyLabel: "Año / ciclo de estudio",
    key: "año_ciclo_estudio",
    groupValuesLabel: "Años / ciclos de estudio",
    operators: stringOperators,
  },
  {
    propertyLabel: "N° de matrículas",
    key: "num_periodo_acad_matric",
    groupValuesLabel: "N° de matrículas",
    operators: stringOperators,
  },
  {
    propertyLabel: "Situación Académica",
    key: "situacion_academica",
    groupValuesLabel: "Situaciónes Académicas",
    operators: stringOperators,
  },
  {
    propertyLabel: "Última matrícula",
    key: "ultimo_periodo_matriculado",
    groupValuesLabel: "Últimas matrículas",
    operators: stringOperators,
  },
];

const columnDefinitions = [
  {
    id: "codigo_alumno",
    header: "Código",
    cell: (item) => item.codigo_alumno,
    sortingField: "codigo_alumno",
    isRowHeader: true,
  },
  {
    id: "nombres",
    header: "Nombre",
    cell: (item) => item.nombres,
    sortingField: "nombres",
  },
  {
    id: "apellido_paterno",
    header: "Ap. Paterno",
    cell: (item) => item.apellido_paterno,
    sortingField: "apellido_paterno",
  },
  {
    id: "apellido_materno",
    header: "Ap. Materno",
    cell: (item) => item.apellido_materno,
    sortingField: "apellido_materno",
  },
  {
    id: "dni",
    header: "Dni",
    cell: (item) => item.dni,
    sortingField: "dni",
  },
  {
    id: "sexo",
    header: "Sexo",
    cell: (item) => item.sexo,
    sortingField: "sexo",
  },
  {
    id: "fecha_nacimiento",
    header: "Fecha de nacimiento",
    cell: (item) => item.fecha_nacimiento,
    sortingField: "fecha_nacimiento",
  },
  {
    id: "lugar_nacimiento",
    header: "Lugar de nacimiento",
    cell: (item) => item.lugar_nacimiento,
    sortingField: "lugar_nacimiento",
  },
  {
    id: "telefono",
    header: "Teléfono",
    cell: (item) => item.telefono,
    sortingField: "telefono",
  },
  {
    id: "telefono_personal",
    header: "Teléfono personal",
    cell: (item) => item.telefono_personal,
    sortingField: "telefono_personal",
  },
  {
    id: "correo_electronico",
    header: "Correo electrónico",
    cell: (item) => item.correo_electronico,
    sortingField: "correo_electronico",
  },
  {
    id: "correo_electronico_personal",
    header: "Correo electrónico personal",
    cell: (item) => item.correo_electronico_personal,
    sortingField: "correo_electronico_personal",
  },
  {
    id: "domicilio",
    header: "Domicilio",
    cell: (item) => item.domicilio,
    sortingField: "domicilio",
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
  },
  {
    id: "programa",
    header: "Programa",
    cell: (item) => item.programa,
    sortingField: "programa",
  },
  {
    id: "año_ciclo_estudio",
    header: "Año / ciclo de estudio",
    cell: (item) => item.año_ciclo_estudio,
    sortingField: "año_ciclo_estudio",
  },
  {
    id: "num_periodo_acad_matric",
    header: "N° de matrículas",
    cell: (item) => item.num_periodo_acad_matric,
    sortingField: "num_periodo_acad_matric",
  },
  {
    id: "situacion_academica",
    header: "Situación Académica",
    cell: (item) => item.situacion_academica,
    sortingField: "situacion_academica",
  },
  {
    id: "ultimo_periodo_matriculado",
    header: "Última matrícula",
    cell: (item) => item.ultimo_periodo_matriculado,
    sortingField: "ultimo_periodo_matriculado",
  },
];

const columnDisplay = [
  { id: "codigo_alumno", visible: true },
  { id: "nombres", visible: true },
  { id: "apellido_paterno", visible: true },
  { id: "apellido_materno", visible: true },
  { id: "dni", visible: true },
  { id: "sexo", visible: true },
  { id: "fecha_nacimiento", visible: true },
  { id: "lugar_nacimiento", visible: true },
  { id: "telefono", visible: true },
  { id: "telefono_personal", visible: true },
  { id: "correo_electronico", visible: true },
  { id: "correo_electronico_personal", visible: true },
  { id: "domicilio", visible: true },
  { id: "facultad", visible: true },
  { id: "programa", visible: true },
  { id: "año_ciclo_estudio", visible: true },
  { id: "num_periodo_acad_matric", visible: true },
  { id: "situacion_academica", visible: true },
  { id: "ultimo_periodo_matriculado", visible: true },
];

export default () => {
  //  States
  const [loadingData, setLoadingData] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
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
    pagination: { pageSize: 25 },
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
    selection: {},
  });

  //  Functions
  const getData = async () => {
    setLoadingData(true);
    const res = await axiosBase.get("admin/estudios/sum/listado");
    const data = await res.data;
    setDistribution(data.data);
    setLoadingData(false);
  };

  //  Effects

  return (
    <Container>
      <FormField label="Buscar por código, dni o nombre">
        <Input />
      </FormField>
      <Table
        {...collectionProps}
        trackBy="id"
        variant="embedded"
        items={items}
        columnDefinitions={columnDefinitions}
        columnDisplay={columnDisplay}
        loading={loadingData}
        loadingText="Cargando datos"
        resizableColumns
        enableKeyboardNavigation
        selectionType="single"
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        header={
          <Header counter={"(" + distributions.length + ")"}>
            Estudiantes registrados
          </Header>
        }
        // filter={
        //   <PropertyFilter
        //     {...propertyFilterProps}
        //     filteringPlaceholder="Buscar estudiante"
        //     countText={`${filteredItemsCount} coincidencias`}
        //     expandToViewport
        //   />
        // }
        pagination={<Pagination {...paginationProps} />}
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
      />
    </Container>
  );
};
