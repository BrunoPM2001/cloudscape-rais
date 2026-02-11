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
import ModalEliminarFiliacion from "../../components/modalEliminarFiliacion";
import ModalEliminarPublicacion from "../../components/modalEliminarPublicacion";
import ModalInformacion from "../../components/modalInformacion";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "ID",
    key: "id",
    groupValuesLabel: "IDs",
    operators: stringOperators,
  },
  {
    propertyLabel: "Revista",
    key: "revista",
    groupValuesLabel: "Revistas",
    operators: stringOperators,
  },
  {
    propertyLabel: "ISSN",
    key: "issn",
    groupValuesLabel: "ISSN",
    operators: stringOperators,
  },
  {
    propertyLabel: "ISSN-E",
    key: "issne",
    groupValuesLabel: "ISSN-E",
    operators: stringOperators,
  },
  {
    propertyLabel: "ISSN-E",
    key: "issne",
    groupValuesLabel: "ISSN-E",
    operators: stringOperators,
  },
  {
    propertyLabel: "Casa",
    key: "casa",
    groupValuesLabel: "Casa",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de inicio",
    key: "fecha_inicio",
    groupValuesLabel: "Fecha de inicio",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de fin",
    key: "fecha_fin",
    groupValuesLabel: "Fecha de fin",
    operators: stringOperators,
  },
  {
    propertyLabel: "País",
    key: "pais",
    groupValuesLabel: "Países",
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
    minWidth: 50,
  },
  {
    id: "revista",
    header: "Revista",
    cell: (item) => item.revista,
    sortingField: "revista",
    minWidth: 200,
  },
  {
    id: "issn",
    header: "ISSN",
    cell: (item) => item.issn,
    sortingField: "issn",
    minWidth: 100,
  },
  {
    id: "issne",
    header: "ISSN-E",
    cell: (item) => item.issne,
    sortingField: "issne",
    minWidth: 100,
  },
  {
    id: "casa",
    header: "Casa",
    cell: (item) => item.casa,
    sortingField: "casa",
    minWidth: 200,
  },
  {
    id: "fecha_inicio",
    header: "Fecha de inicio",
    cell: (item) => item.fecha_inicio,
    sortingField: "fecha_inicio",
    minWidth: 200,
  },
  {
    id: "fecha_fin",
    header: "Fecha de fin",
    cell: (item) => item.fecha_fin,
    sortingField: "fecha_fin",
    minWidth: 200,
  },
  {
    id: "pais",
    header: "País",
    cell: (item) => item.pais,
    sortingField: "pais",
    minWidth: 200,
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => item.estado,
    sortingField: "estado",
    minWidth: 200,
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "revista", visible: true },
  { id: "issn", visible: true },
  { id: "issne", visible: true },
  { id: "casa", visible: true },
  { id: "fecha_inicio", visible: true },
  { id: "fecha_fin", visible: true },
  { id: "pais", visible: true },
  { id: "estado", visible: true },
];

export default () => {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [distributions, setDistribution] = useState([]);
  const [modal, setModal] = useState("");
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
    const res = await axiosBase.get(
      "investigador/publicaciones/revistas/listado",
    );
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
        enableKeyboardNavigation
        selectionType="single"
        wrapLines
        onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
        header={
          <Header
            actions={
              <Button
                loading={loadingBtn}
                variant="primary"
                onClick={() => {
                  window.location.href = "revistas_editores/registrar";
                }}
              >
                Registrar
              </Button>
            }
          >
            Revistas ({distributions.length})
          </Header>
        }
        filter={
          <PropertyFilter
            {...propertyFilterProps}
            filteringPlaceholder="Buscar revista"
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

      {modal === "eliminarPublicacion" && (
        <ModalEliminarPublicacion
          close={() => setModal("")}
          reload={getData}
          id={collectionProps.selectedItems[0].id}
        />
      )}
    </>
  );
};
