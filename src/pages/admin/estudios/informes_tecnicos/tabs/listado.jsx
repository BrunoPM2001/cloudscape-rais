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
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
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
    propertyLabel: "Deuda",
    key: "deuda",
    groupValuesLabel: "Deudas",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo de deuda",
    key: "tipo_deuda",
    groupValuesLabel: "Tipos de deuda",
    operators: stringOperators,
  },
  {
    propertyLabel: "Título",
    key: "titulo",
    groupValuesLabel: "Títulos",
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
    id: "deuda",
    header: "Deuda",
    cell: (item) => item.deuda,
    sortingField: "deuda",
  },
  {
    id: "tipo_deuda",
    header: "Tipo de deuda",
    cell: (item) => item.tipo_deuda,
    sortingField: "tipo_deuda",
  },

  {
    id: "titulo",
    header: "Título",
    cell: (item) => item.titulo,
    sortingField: "titulo",
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
  { id: "deuda", visible: true },
  { id: "tipo_deuda", visible: true },
  { id: "titulo", visible: true },
  { id: "responsable", visible: true },
  { id: "facultad", visible: true },
  { id: "estado", visible: true },
];

export default () => {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [loadingInformes, setLoadingInformes] = useState(true);
  const [informes, setInformes] = useState([]);
  const [distributions, setDistribution] = useState([]);
  const [selectedItems, setSelectedItems] = useState([
    {
      id: null,
    },
  ]);
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
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
    selection: {},
  });
  const [selectedOption, setSelectedOption] = useState({
    value: "2024",
  });

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/estudios/informesTecnicos/proyectosListado/" + selectedOption.value
    );
    const data = await res.data;
    setDistribution(data.data);
    setLoading(false);
  };

  const getInformes = async () => {
    setLoadingInformes(true);
    const res = await axiosBase.get(
      "admin/estudios/informesTecnicos/informes/" + selectedItems[0]?.id
    );
    const data = await res.data;
    setInformes(data.data);
    setLoadingInformes(false);
  };

  //  Effects
  useEffect(() => {
    setInformes([]);
    getData();
  }, [selectedOption]);

  useEffect(() => {
    getInformes();
  }, [selectedItems]);

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
        header={<Header>Listado de proyectos</Header>}
        selectionType="single"
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        onRowClick={({ detail }) => setSelectedItems([detail.item])}
        filter={
          <PropertyFilter
            {...propertyFilterProps}
            filteringPlaceholder="Buscar grupo"
            countText={`${filteredItemsCount} coincidencias`}
            expandToViewport
            virtualScroll
            customControl={
              <FormField label="Año:">
                <Select
                  disabled={loading}
                  expandToViewport
                  selectedOption={selectedOption}
                  onChange={({ detail }) =>
                    setSelectedOption(detail.selectedOption)
                  }
                  options={[
                    { value: "2024" },
                    { value: "2023" },
                    { value: "2022" },
                    { value: "2021" },
                    { value: "2020" },
                    { value: "2019" },
                    { value: "2018" },
                    { value: "2017" },
                  ]}
                />
              </FormField>
            }
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
            cell: (item) => <Link href="#">{item.informe}</Link>,
          },
          {
            id: "fecha_envio",
            header: "Fecha de envío",
            cell: (item) => item.fecha_envio,
          },
          {
            id: "estado",
            header: "Estado",
            cell: (item) => item.estado,
          },
        ]}
        columnDisplay={[
          { id: "informe", visible: true },
          { id: "fecha_envio", visible: true },
          { id: "estado", visible: true },
        ]}
        enableKeyboardNavigation
        items={informes}
        loadingText="Cargando datos"
        loading={loadingInformes}
        resizableColumns
        trackBy="id"
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
        header={<Header>Informes</Header>}
      />
    </SpaceBetween>
  );
};
