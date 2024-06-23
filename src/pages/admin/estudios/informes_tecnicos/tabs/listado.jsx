import {
  Badge,
  Box,
  Link,
  FormField,
  Header,
  Pagination,
  PropertyFilter,
  Select,
  SpaceBetween,
  Table,
  Button,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import axiosBase from "../../../../../api/axios";
import queryString from "query-string";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "ID",
    key: "id",
    groupValuesLabel: "IDS",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo de proyecto",
    key: "tipo_proyecto",
    groupValuesLabel: "Tipos de proyecto",
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
    propertyLabel: "N° de informes",
    key: "cantidad_informes",
    groupValuesLabel: "N° de informes",
    operators: stringOperators,
  },
  {
    propertyLabel: "Responsable",
    key: "responsable",
    groupValuesLabel: "Responsables",
    operators: stringOperators,
  },
  {
    propertyLabel: "Facultad",
    key: "facultad",
    groupValuesLabel: "Facultades",
    operators: stringOperators,
  },
  {
    propertyLabel: "Periodo",
    key: "periodo",
    groupValuesLabel: "Periodos",
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
    id: "id",
    header: "ID",
    cell: (item) => item.id,
    sortingField: "id",
    isRowHeader: true,
  },
  {
    id: "tipo_proyecto",
    header: "Tipo de proyecto",
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
  },
  {
    id: "cantidad_informes",
    header: "N° informes",
    cell: (item) => item.cantidad_informes,
    sortingField: "cantidad_informes",
  },
  {
    id: "responsable",
    header: "Responsable",
    cell: (item) => item.responsable,
    sortingField: "responsable",
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
  },
  {
    id: "periodo",
    header: "Periodo",
    cell: (item) => item.periodo,
    sortingField: "periodo",
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge
        color={
          item.estado == -1
            ? "red"
            : item.estado == 1
            ? "grey"
            : item.estado == 2
            ? "grey"
            : item.estado == 4
            ? "green"
            : item.estado == 5
            ? "blue"
            : item.estado == 6
            ? "grey"
            : "red"
        }
      >
        {item.estado == -1
          ? "Eliminado"
          : item.estado == 1
          ? "Reconocido"
          : item.estado == 2
          ? "Observado"
          : item.estado == 4
          ? "Registrado"
          : item.estado == 5
          ? "Enviado"
          : item.estado == 6
          ? "En proceso"
          : "Error"}
      </Badge>
    ),
    sortingField: "estado",
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "tipo_proyecto", visible: true },
  { id: "codigo_proyecto", visible: true },
  { id: "titulo", visible: true },
  { id: "cantidad_informes", visible: true },
  { id: "responsable", visible: true },
  { id: "facultad", visible: true },
  { id: "periodo", visible: true },
  { id: "estado", visible: true },
];

export default () => {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [loadingInformes, setLoadingInformes] = useState(true);
  const [informes, setInformes] = useState([]);
  const [distributions, setDistribution] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
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
    sorting: {
      defaultState: { sortingColumn: columnDefinitions[0], isDescending: true },
    },
    selection: {},
  });
  const [selectedOption, setSelectedOption] = useState({
    value: "nuevos",
    label: "Nuevos (2017 en adelante)",
  });

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/estudios/informesTecnicos/proyectosListado"
    );
    const data = res.data;
    setDistribution(data);
    setLoading(false);
  };

  const getInformes = async () => {
    setLoadingInformes(true);
    const res = await axiosBase.get(
      "admin/estudios/informesTecnicos/informes/" +
        collectionProps.selectedItems[0]?.id
    );
    const data = res.data;
    setInformes(data);
    setLoadingInformes(false);
  };

  //  Effects
  useEffect(() => {
    setInformes([]);
    getData();
  }, [selectedOption]);

  useEffect(() => {
    getInformes();
  }, [collectionProps.selectedItems]);

  return (
    <SpaceBetween size="l">
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
        onRowClick={({ detail }) => setSelectedItems([detail.item])}
        header={
          <Header
            actions={
              <FormField label="Proyectos:" stretch>
                <Select
                  disabled={loading}
                  expandToViewport
                  selectedOption={selectedOption}
                  onChange={({ detail }) =>
                    setSelectedOption(detail.selectedOption)
                  }
                  options={[
                    { value: "nuevos", label: "Nuevos (2017 en adelante)" },
                    {
                      value: "antiguos",
                      label: "Antiguos (2016 y anteriores)",
                    },
                  ]}
                />
              </FormField>
            }
          >
            Listado de proyectos
          </Header>
        }
        filter={
          <PropertyFilter
            {...propertyFilterProps}
            filteringPlaceholder="Buscar grupo"
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
      <Table
        columnDefinitions={[
          {
            id: "informe",
            header: "Informe",
            cell: (item) => item.informe,
          },
          {
            id: "fecha_envio",
            header: "Fecha de envío",
            cell: (item) => item.fecha_envio,
          },
          {
            id: "estado",
            header: "Estado",
            cell: (item) => (
              <Badge
                color={
                  item.estado == 1
                    ? "green"
                    : item.estado == 2
                    ? "blue"
                    : item.estado == 3
                    ? "red"
                    : "grey"
                }
              >
                {item.estado == 1
                  ? "Aprobado"
                  : item.estado == 2
                  ? "Presentado"
                  : item.estado == 3
                  ? "Observado"
                  : "En proceso"}
              </Badge>
            ),
          },
          {
            id: "created_at",
            header: "Fecha de creación",
            cell: (item) => item.created_at,
          },
          {
            id: "updated_at",
            header: "Fecha de actualización",
            cell: (item) => item.updated_at,
          },
        ]}
        columnDisplay={[
          { id: "informe", visible: true },
          { id: "fecha_envio", visible: true },
          { id: "estado", visible: true },
          { id: "created_at", visible: true },
          { id: "updated_at", visible: true },
        ]}
        enableKeyboardNavigation
        items={informes}
        loadingText="Cargando datos"
        loading={loadingInformes}
        resizableColumns
        selectionType="single"
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        trackBy="id"
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
        header={
          <Header
            actions={
              <SpaceBetween size="s">
                <Button
                  variant="primary"
                  disabled={selectedItems.length == 0}
                  onClick={() => {
                    const query = queryString.stringify({
                      id: selectedItems[0]["id"],
                      tipo_proyecto:
                        collectionProps.selectedItems[0].tipo_proyecto,
                    });
                    window.location.href = "informes_tecnicos/detalle?" + query;
                  }}
                >
                  Editar informe
                </Button>
              </SpaceBetween>
            }
          >
            Informes
          </Header>
        }
      />
    </SpaceBetween>
  );
};
