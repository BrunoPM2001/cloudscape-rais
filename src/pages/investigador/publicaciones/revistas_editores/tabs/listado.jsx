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
  Link,
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
    propertyLabel: "Puntaje",
    key: "puntaje",
    groupValuesLabel: "Puntajes",
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
    id: "puntaje",
    header: "Puntaje",
    cell: (item) => item.puntaje,
    sortingField: "puntaje",
  },
  {
    id: "observaciones_usuario",
    header: "Observaciones",
    cell: (item) => item.observaciones_usuario,
    sortingField: "observaciones_usuario",
    minWidth: 400,
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge
        color={
          item.estado == "Eliminado"
            ? "red"
            : item.estado == "Registrado"
              ? "green"
              : item.estado == "Observado"
                ? "grey"
                : item.estado == "Enviado"
                  ? "blue"
                  : item.estado == "En proceso"
                    ? "grey"
                    : item.estado == "Anulado"
                      ? "red"
                      : item.estado == "No registrado"
                        ? "grey"
                        : item.estado == "Duplicado"
                          ? "red"
                          : "grey"
        }
      >
        {item.estado}
      </Badge>
    ),
    sortingField: "estado",
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "revista", visible: true },
  { id: "puntaje", visible: true },
  { id: "observaciones_usuario", visible: true },
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
    setDistribution(data.data);
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
              <SpaceBetween direction="horizontal" size="s">
                <ButtonDropdown
                  loading={loadingBtn}
                  disabled={collectionProps.selectedItems.length == 0}
                  onItemClick={async ({ detail }) => {
                    if (detail.id == "action_1") {
                      const query = queryString.stringify({
                        publicacion_id: collectionProps.selectedItems[0].id,
                        tipo: "revista",
                      });
                      window.location.href =
                        "registrar/paso" +
                        collectionProps.selectedItems[0].step +
                        "?" +
                        query;
                    } else if (detail.id == "action_2") {
                      setModal("eliminarPublicacion");
                    }
                  }}
                  items={[
                    {
                      text: "Editar",
                      id: "action_1",
                      disabled:
                        collectionProps.selectedItems[0]?.estado !=
                          "Observado" &&
                        collectionProps.selectedItems[0]?.estado != "En proceso"
                          ? true
                          : false,
                    },
                    {
                      text: "Eliminar",
                      id: "action_2",
                      disabled:
                        collectionProps.selectedItems[0]?.estado != "En proceso"
                          ? true
                          : false,
                    },
                  ]}
                >
                  Acciones para revista
                </ButtonDropdown>
                <Button
                  loading={loadingBtn}
                  variant="primary"
                  onClick={() => {
                    const query = queryString.stringify({
                      tipo: "revista",
                    });
                    window.location.href = "revistas_editores/registrar";
                  }}
                >
                  Registrar
                </Button>
              </SpaceBetween>
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
