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
import { useState, useEffect, useContext } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import queryString from "query-string";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";

//  For badge
const estadoConfig = {
  0: { color: "grey", text: "No activo" },
  1: { color: "green", text: "Activo" },
};

const defaultConfig = { color: "grey", text: "Sin estado" };

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
  {
    propertyLabel: "Correo institucional",
    key: "email3",
    groupValuesLabel: "Correos",
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
    minWidth: 80,
  },
  {
    id: "rrhh_status",
    header: "Rrhh estado",
    cell: (item) => {
      const config = estadoConfig[item.rrhh_status] || defaultConfig;
      return <Badge color={config.color}>{config.text}</Badge>;
    },
    sortingField: "rrhh_status",
    minWidth: 120,
  },
  {
    id: "puntaje",
    header: "Puntaje",
    cell: (item) => item.puntaje,
    sortingField: "puntaje",
    minWidth: 100,
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
    sortingField: "tipo",
    minWidth: 150,
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
    minWidth: 200,
  },
  {
    id: "codigo",
    header: "Código",
    cell: (item) => item.codigo,
    sortingField: "codigo",
    minWidth: 120,
  },
  {
    id: "codigo_orcid",
    header: "Orcid",
    cell: (item) => item.codigo_orcid,
    sortingField: "codigo_orcid",
    minWidth: 150,
  },
  {
    id: "apellido1",
    header: "Ap. paterno",
    cell: (item) => item.apellido1,
    sortingField: "apellido1",
    minWidth: 120,
  },
  {
    id: "apellido2",
    header: "Ap. materno",
    cell: (item) => item.apellido2,
    sortingField: "apellido2",
    minWidth: 120,
  },
  {
    id: "nombres",
    header: "Nombre",
    cell: (item) => item.nombres,
    sortingField: "nombres",
    minWidth: 150,
  },
  {
    id: "doc_tipo",
    header: "Tipo de doc.",
    cell: (item) => item.doc_tipo,
    sortingField: "doc_tipo",
    minWidth: 120,
  },
  {
    id: "doc_numero",
    header: "N° de doc.",
    cell: (item) => item.doc_numero,
    sortingField: "doc_numero",
    minWidth: 120,
  },
  {
    id: "fecha_nac",
    header: "Fecha de nac.",
    cell: (item) => item.fecha_nac,
    sortingField: "fecha_nac",
    minWidth: 120,
  },
  {
    id: "telefono_movil",
    header: "Teléfono móvil",
    cell: (item) => item.telefono_movil,
    sortingField: "telefono_movil",
    minWidth: 120,
  },
  {
    id: "email3",
    header: "Correo institucional",
    cell: (item) => item.email3,
    sortingField: "email3",
    minWidth: 150,
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
  { id: "email3", visible: true },
];

export default () => {
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Data states
  const [loading, setLoading] = useState(true);
  const [loadingReport, setLoadingReport] = useState(false);
  const [distributions, setDistribution] = useState([]);
  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    paginationProps,
    propertyFilterProps,
    allPageItems,
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
    const res = await axiosBase.get("admin/estudios/investigadores/listado");
    const data = res.data;
    setDistribution(data);
    setLoading(false);
  };

  const reporteExcel = async () => {
    if (allPageItems.length > 15000) {
      pushNotification(
        "La cantidad de items a exportar es demasiada, redúzcala a menos de 15000",
        "warning",
        notifications.length + 1
      );
    } else {
      const filteredItems = allPageItems.map((item) => ({ ...item }));

      setLoadingReport(true);
      const res = await axiosBase.post(
        "admin/estudios/informesTecnicos/excel",
        filteredItems,
        {
          responseType: "blob",
        }
      );
      const blob = await res.data;
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setLoadingReport(false);
    }
  };

  const reporteExcelFull = async () => {
    setLoadingReport(true);
    const res = await axiosBase.get(
      "admin/estudios/investigadores/excelComplete",
      {
        responseType: "blob",
      }
    );
    const blob = res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingReport(false);
  };

  //  Effects
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
      wrapLines
      enableKeyboardNavigation
      selectionType="single"
      onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
      header={
        <Header
          counter={"(" + distributions.length + ")"}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <ButtonDropdown
                loading={loadingReport}
                items={[
                  {
                    id: "action_9_1",
                    text: "Excel con filtros",
                  },
                  {
                    id: "action_9_2",
                    text: "Excel completo",
                  },
                ]}
                onItemClick={({ detail }) => {
                  if (detail.id == "action_9_1") {
                    reporteExcel();
                  } else if (detail.id == "action_9_2") {
                    reporteExcelFull();
                  }
                }}
              >
                Exportar
              </ButtonDropdown>
              <ButtonDropdown
                disabled={collectionProps.selectedItems.length == 0}
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
                    text: "Gestionar licencias",
                    id: "action_1_2",
                    disabled: false,
                  },
                ]}
              >
                Acciones
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
                Agregar
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
