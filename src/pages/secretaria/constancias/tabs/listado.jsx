import {
  Badge,
  Box,
  Button,
  Header,
  Pagination,
  PropertyFilter,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import queryString from "query-string";
import axiosBase from "../../../../api/axios";
import ModalCargarDocumento from "../components/modalCargarDocumento";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "ID",
    key: "id",
    groupValuesLabel: "IDS",
    operators: stringOperators,
  },
  {
    propertyLabel: "Nombre",
    key: "nombres",
    groupValuesLabel: "Nombres",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo",
    key: "tipo",
    groupValuesLabel: "Tipos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Estado",
    key: "estado",
    groupValuesLabel: "Estado",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de solicitud",
    key: "created_at",
    groupValuesLabel: "Fechas de solicitud",
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
    id: "nombres",
    header: "Nombres",
    cell: (item) => item.nombres,
    sortingField: "nombres",
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
    sortingField: "tipo",
  },
  {
    id: "archivo_original",
    header: "Documento original",
    cell: (item) => (
      <Button
        iconName="download"
        variant="inline-icon"
        href={item.archivo_original}
        target="_blank"
      />
    ),
    sortingField: "archivo_original",
  },
  {
    id: "archivo_firmado",
    header: "Documento firmado",
    cell: (item) =>
      item.estado == "Firmado" && (
        <Button
          iconName="download"
          variant="inline-icon"
          href={item.archivo_firmado}
          target="_blank"
        />
      ),
    sortingField: "archivo_firmado",
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge color={item.estado == "Firmado" ? "green" : "red"}>
        {item.estado}
      </Badge>
    ),
    sortingField: "estado",
  },
  {
    id: "created_at",
    header: "Fecha de solicitud",
    cell: (item) => item.created_at,
    sortingField: "created_at",
  },
  {
    id: "updated_at",
    header: "Fecha de carga del documento",
    cell: (item) => item.estado == "Firmado" && item.updated_at,
    sortingField: "updated_at",
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "nombres", visible: true },
  { id: "tipo", visible: true },
  { id: "archivo_original", visible: true },
  { id: "archivo_firmado", visible: true },
  { id: "estado", visible: true },
  { id: "created_at", visible: true },
  { id: "updated_at", visible: true },
];

export default () => {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState("");
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

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("secretaria/constancias/listado");
    const data = res.data;
    setDistribution(data);
    setLoading(false);
  };

  //  Effects
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
        wrapLines
        enableKeyboardNavigation
        selectionType="single"
        onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
        header={
          <Header
            actions={
              <Button
                disabled={
                  !collectionProps.selectedItems.length ||
                  collectionProps?.selectedItems[0]?.estado != "Pendiente"
                }
                variant="primary"
                onClick={() => {
                  setModal("cargar");
                }}
              >
                Cargar constancia
              </Button>
            }
          >
            Solicitudes ({distributions.length})
          </Header>
        }
        filter={
          <PropertyFilter
            {...propertyFilterProps}
            filteringPlaceholder="Buscar constancia"
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
      {modal == "cargar" && (
        <ModalCargarDocumento
          id={collectionProps.selectedItems[0]?.id}
          nombre={collectionProps.selectedItems[0]?.nombres}
          archivo_firmado={collectionProps.selectedItems[0]?.archivo_firmado}
          close={() => setModal("")}
          reload={() => {
            getData();
            actions.setSelectedItems([]);
          }}
        />
      )}
    </>
  );
};
