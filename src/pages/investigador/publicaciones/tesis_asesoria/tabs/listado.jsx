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
import { useState, useEffect, useContext } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import queryString from "query-string";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";
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
    propertyLabel: "Título",
    key: "titulo",
    groupValuesLabel: "Títulos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Observaciones",
    key: "observaciones_usuario",
    groupValuesLabel: "Observaciones",
    operators: stringOperators,
  },
  {
    propertyLabel: "Año de publicación",
    key: "año_publicacion",
    groupValuesLabel: "Años de publicación",
    operators: stringOperators,
  },
  {
    propertyLabel: "Puntaje",
    key: "puntaje",
    groupValuesLabel: "Puntajes",
    operators: stringOperators,
  },
  {
    propertyLabel: "Filiación UNMSM",
    key: "filiacion",
    groupValuesLabel: "filiacion",
    operators: stringOperators,
  },
  {
    propertyLabel: "Filiación única UNMSM",
    key: "filiacion_unica",
    groupValuesLabel: "filiacion_unica",
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
    id: "titulo",
    header: "Título",
    cell: (item) => item.titulo,
    sortingField: "titulo",
    minWidth: 400,
  },
  {
    id: "año_publicacion",
    header: "Año de publicación",
    cell: (item) => item.año_publicacion,
    sortingField: "año_publicacion",
    minWidth: 30,
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
  },
  {
    id: "filiacion",
    header: "Filiación UNMSM",
    cell: (item) => (
      <Badge
        color={
          item.filiacion == "No"
            ? "red"
            : item.filiacion == "Si"
            ? "blue"
            : item.filiacion == "Sin Especificar"
            ? "grey"
            : "grey"
        }
      >
        {item.filiacion}
      </Badge>
    ),
    sortingField: "filiacion",
    minWidth: 150,
  },
  {
    id: "filiacion_unica",
    header: "Filiación única UNMSM",
    cell: (item) => (
      <Badge
        color={
          item.filiacion_unica == "No"
            ? "red"
            : item.filiacion_unica == "Si"
            ? "blue"
            : item.filiacion_unica == "Sin Especificar"
            ? "grey"
            : "grey"
        }
      >
        {item.filiacion_unica}
      </Badge>
    ),
    sortingField: "filiacion_unica",
    minWidth: 150,
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
    minWidth: 150,
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "titulo", visible: true },
  { id: "año_publicacion", visible: true },
  { id: "puntaje", visible: true },
  { id: "observaciones_usuario", visible: true },
  { id: "filiacion", visible: true },
  { id: "filiacion_unica", visible: true },
  { id: "estado", visible: true },
];

export default () => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Data states
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
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
    const res = await axiosBase.get(
      "investigador/publicaciones/tesisAsesoria/listado"
    );
    const data = res.data;
    setDistribution(data.data);
    setLoading(false);
  };

  const reporte = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.get(
      "investigador/publicaciones/utils/reporte",
      {
        params: {
          publicacion_id: collectionProps.selectedItems[0].id,
          tipo: "tesis-asesoria",
        },
        responseType: "blob",
      }
    );
    const blob = res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingBtn(false);
  };

  const eliminar = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.delete(
      "investigador/publicaciones/utils/eliminarPublicacion",
      {
        params: {
          id: collectionProps.selectedItems[0].id,
        },
      }
    );
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    setLoadingBtn(false);
    getData();
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
              <SpaceBetween direction="horizontal" size="s">
                <ButtonDropdown
                  loading={loadingBtn}
                  disabled={collectionProps.selectedItems.length == 0}
                  onItemClick={async ({ detail }) => {
                    if (detail.id == "action_1") {
                      const query = queryString.stringify({
                        publicacion_id: collectionProps.selectedItems[0].id,
                        tipo: "tesis_asesoria",
                      });
                      window.location.href =
                        "registrar/paso" +
                        collectionProps.selectedItems[0].step +
                        "?" +
                        query;
                    } else if (detail.id == "action_2") {
                      eliminar();
                    } else if (detail.id == "action_3") {
                      reporte();
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
                    {
                      text: "Reporte",
                      id: "action_3",
                      disabled:
                        collectionProps.selectedItems[0]?.estado ==
                          "En proceso" ||
                        collectionProps.selectedItems[0]?.estado == "Observado",
                    },
                  ]}
                >
                  Acciones para publicaciones
                </ButtonDropdown>
                <Button
                  loading={loadingBtn}
                  variant="primary"
                  onClick={() => {
                    const query = queryString.stringify({
                      tipo: "tesis_asesoria",
                    });
                    window.location.href = "registrar/paso1?" + query;
                  }}
                >
                  Registrar
                </Button>
              </SpaceBetween>
            }
            info={
              <Link variant="info" onClick={() => setModal("info")}>
                Ver Información Importante
              </Link>
            }
          >
            Publicaciones ({distributions.length})
          </Header>
        }
        filter={
          <PropertyFilter
            {...propertyFilterProps}
            filteringPlaceholder="Buscar artículo"
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
      {modal === "info" ? (
        <ModalInformacion close={() => setModal("")} />
      ) : null}
    </>
  );
};
