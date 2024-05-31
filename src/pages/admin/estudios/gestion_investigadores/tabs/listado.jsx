import {
  Badge,
  Box,
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

//  For badge
const estadoConfig = {
  0: { color: "grey", text: "No activo" },
  1: { color: "green", text: "Activo" },
};

const defaultConfig = { color: "red", text: "Sin estado" };

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "ID",
    key: "id",
    groupValuesLabel: "IDS",
    operators: stringOperators,
  },
  {
    propertyLabel: "Rrhh estado",
    key: "rrhh_status",
    groupValuesLabel: "Rrhh estado",
    operators: stringOperators,
  },
  {
    propertyLabel: "Puntaje",
    key: "puntaje",
    groupValuesLabel: "Puntajes",
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
    propertyLabel: "Código",
    key: "codigo",
    groupValuesLabel: "Códigos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Orcid",
    key: "codigo_orcid",
    groupValuesLabel: "Códigos orcid",
    operators: stringOperators,
  },
  {
    propertyLabel: "Ap. paterno",
    key: "apellido1",
    groupValuesLabel: "Ap. paternos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Ap. materno",
    key: "apellido2",
    groupValuesLabel: "Ap. maternos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Nombre",
    key: "nombres",
    groupValuesLabel: "Nombres",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo de doc.",
    key: "doc_tipo",
    groupValuesLabel: "Tipos de doc.",
    operators: stringOperators,
  },
  {
    propertyLabel: "N° de doc.",
    key: "doc_numero",
    groupValuesLabel: "N° de doc.",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha nacimiento",
    key: "fecha_nac",
    groupValuesLabel: "Fechas nacimiento",
    operators: stringOperators,
  },
  {
    propertyLabel: "Teléfono móvil",
    key: "telefono_movil",
    groupValuesLabel: "Teléfonos móvil",
    operators: stringOperators,
  },
];

const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item) => item.id,
    sortingField: "id",
    isRowHeader: true,
  },
  {
    id: "rrhh_status",
    header: "Rrhh estado",
    cell: (item) => {
      const config = estadoConfig[item.rrhh_status] || defaultConfig;
      return <Badge color={config.color}>{config.text}</Badge>;
    },
    sortingField: "rrhh_status",
  },
  {
    id: "puntaje",
    header: "Puntaje",
    cell: (item) => item.puntaje,
    sortingField: "puntaje",
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
  },
  {
    id: "codigo",
    header: "Código",
    cell: (item) => item.codigo,
    sortingField: "codigo",
  },
  {
    id: "codigo_orcid",
    header: "Orcid",
    cell: (item) => item.codigo_orcid,
    sortingField: "codigo_orcid",
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
    header: "Nombre",
    cell: (item) => item.nombres,
    sortingField: "nombres",
  },
  {
    id: "doc_tipo",
    header: "Tipo de doc.",
    cell: (item) => item.doc_tipo,
    sortingField: "doc_tipo",
  },
  {
    id: "doc_numero",
    header: "N° de doc.",
    cell: (item) => item.doc_numero,
    sortingField: "doc_numero",
  },
  {
    id: "fecha_nac",
    header: "Fecha de nac.",
    cell: (item) => item.fecha_nac,
    sortingField: "fecha_nac",
  },
  {
    id: "telefono_movil",
    header: "Teléfono móvil",
    cell: (item) => item.telefono_movil,
    sortingField: "telefono_movil",
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "rrhh_status", visible: true },
  { id: "puntaje", visible: true },
  { id: "tipo", visible: true },
  { id: "facultad", visible: true },
  { id: "codigo", visible: true },
  { id: "codigo_orcid", visible: true },
  { id: "apellido1", visible: true },
  { id: "apellido2", visible: true },
  { id: "nombres", visible: true },
  { id: "doc_tipo", visible: true },
  { id: "doc_numero", visible: true },
  { id: "fecha_nac", visible: true },
  { id: "telefono_movil", visible: true },
];

export default () => {
  //  Data states
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
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
    selection: {},
  });
  const [enableBtn, setEnableBtn] = useState(false);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/investigadores/listado");
    const data = await res.data;
    setDistribution(data.data);
    setLoading(false);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (collectionProps.selectedItems.length > 0) {
      setEnableBtn(true);
    } else {
      setEnableBtn(false);
    }
  }, [collectionProps.selectedItems]);

  return (
    <Table
      {...collectionProps}
      trackBy="id"
      items={items}
      columnDefinitions={columnDefinitions}
      columnDisplay={columnDisplay}
      loading={loading}
      loadingText="Cargando datos"
      resizableColumns
      enableKeyboardNavigation
      selectionType="single"
      header={
        <Header
          counter={"(" + distributions.length + ")"}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <ButtonDropdown
                disabled={!enableBtn}
                onItemClick={({ detail }) => {
                  if (detail.id == "action_1_1") {
                    const query = queryString.stringify({
                      id: collectionProps.selectedItems[0]["id"],
                    });
                    window.location.href =
                      "gestion_investigadores/editar?" + query;
                  } else if (detail.id == "action_1_2") {
                    const query = queryString.stringify({
                      investigador_id: collectionProps.selectedItems[0]["id"],
                    });
                    window.location.href =
                      "gestion_investigadores/licencias?" + query;
                  }
                }}
                items={[
                  {
                    text: "Editar",
                    id: "action_1_1",
                    disabled: false,
                  },
                  {
                    text: "Agregar licencia",
                    id: "action_1_2",
                    disabled: false,
                  },
                ]}
              >
                Acciones para un investigador
              </ButtonDropdown>
              <ButtonDropdown
                onItemClick={({ detail }) => {
                  if (detail.id == "action_2_1") {
                    const query = queryString.stringify({
                      tipo: "Docente permanente",
                    });
                    window.location.href =
                      "gestion_investigadores/agregar?" + query;
                  } else if (detail.id == "action_2_2") {
                    const query = queryString.stringify({
                      tipo: "Estudiante",
                    });
                    window.location.href =
                      "gestion_investigadores/agregar?" + query;
                  } else if (detail.id == "action_2_3") {
                    const query = queryString.stringify({
                      tipo: "Externo",
                    });
                    window.location.href =
                      "gestion_investigadores/agregar?" + query;
                  }
                }}
                items={[
                  {
                    text: "Docente permanente",
                    id: "action_2_1",
                    disabled: false,
                  },
                  {
                    text: "Estudiante",
                    id: "action_2_2",
                    disabled: false,
                  },
                  {
                    text: "Externo",
                    id: "action_2_3",
                    disabled: false,
                  },
                ]}
              >
                Agregar investigador
              </ButtonDropdown>
            </SpaceBetween>
          }
        >
          Investigadores registrados
        </Header>
      }
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar investigador"
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
  );
};
