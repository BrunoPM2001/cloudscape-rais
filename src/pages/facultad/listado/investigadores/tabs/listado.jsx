import {
  Box,
  Header,
  Pagination,
  PropertyFilter,
  SpaceBetween,
  Table,
  ButtonDropdown,
} from "@cloudscape-design/components";
import { useState, useEffect, useContext } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";

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
    minWidth: 200,
  },
  {
    id: "docente",
    header: "Apellidos y Nombres",
    cell: (item) => item.docente,
    sortingField: "docente",
    minWidth: 300,
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
    minWidth: 200,
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

export default () => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  const [loading, setLoading] = useState(true);
  const [loadingReport, setLoadingReport] = useState(false);
  const [distributions, setDistribution] = useState([]);
  const {
    items,
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
    sorting: {},
    selection: {},
  });

  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("facultad/listado/investigadores/listado");
    setDistribution(res.data);
    setLoading(false);
  };

  const exportExcel = async () => {
    if (allPageItems.length > 15000) {
      pushNotification(
        "La cantidad de items a exportar es demasiada, redúzcala a menos de 15000",
        "warning",
        notifications.length + 1
      );
    } else {
      const visibleColumns = columnDisplay
        .filter((item) => item.visible)
        .map((item) => item.id);
      const filteredItems = allPageItems.map((item) =>
        Object.fromEntries(
          Object.entries(item).filter(([key]) => visibleColumns.includes(key))
        )
      );

      setLoadingReport(true);
      const res = await axiosBase.post(
        "facultad/reportes/excel",
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

  const exportPdf = async () => {
    setLoadingReport(true);
    const res = await axiosBase.get(
      "facultad/listado/investigadores/pdfInvestigadores",
      {
        responseType: "blob",
      }
    );
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingReport(false);
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
            counter={"(" + distributions.length + ")"}
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <ButtonDropdown
                  disabled={loading}
                  loading={loadingReport}
                  variant="primary"
                  items={[
                    {
                      text: "Reporte de puntaje de pub.",
                      id: "action_2_1",
                    },
                    {
                      text: "Descargar excel",
                      id: "action_2_2",
                    },
                  ]}
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_2_1") {
                      exportPdf();
                    } else if (detail.id == "action_2_2") {
                      exportExcel();
                    }
                  }}
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
