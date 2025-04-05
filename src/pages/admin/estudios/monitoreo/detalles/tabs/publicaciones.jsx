import {
  Badge,
  Box,
  ButtonDropdown,
  Header,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import axiosBase from "../../../../../../api/axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import ModalAddPublicacion from "./components/modalAddPublicacion";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalDeletePublicacion from "./components/modalDeletePublicacion";

const columnDefinitions = [
  {
    id: "publicacion_id",
    header: "ID",
    cell: (item) => item.publicacion_id,
    sortingField: "publicacion_id",
  },
  {
    id: "titulo",
    header: "Título",
    cell: (item) => item.titulo,
    sortingField: "titulo",
  },
  {
    id: "tipo_publicacion",
    header: "Tipo",
    cell: (item) => item.tipo_publicacion,
    sortingField: "tipo_publicacion",
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
  { id: "publicacion_id", visible: true },
  { id: "titulo", visible: true },
  { id: "tipo_publicacion", visible: true },
  { id: "periodo", visible: true },
  { id: "estado", visible: true },
];

export default ({ data, loading, reload, disabledBtn }) => {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  States
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [type, setType] = useState("");
  const [pub, setPub] = useState("");

  //  Hooks
  const { items, actions, collectionProps } = useCollection(data, {
    sorting: {},
    selection: {},
  });

  //  Functions
  const reporte = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.get("admin/estudios/publicaciones/reporte", {
      params: {
        id: collectionProps.selectedItems[0].publicacion_id,
        tipo: collectionProps.selectedItems[0].tipo_publicacion,
      },
      responseType: "blob",
    });
    setLoadingBtn(false);
    const blob = res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

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
        selectionType="single"
        onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
        header={
          <Header
            counter={"(" + data.length + ")"}
            actions={
              <SpaceBetween size="xs" direction="horizontal">
                <ButtonDropdown
                  items={[
                    {
                      id: "action_21",
                      text: "Reporte",
                    },
                    {
                      id: "action_22",
                      text: "Eliminar",
                      disabled: disabledBtn,
                    },
                  ]}
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_21") {
                      reporte();
                    } else if (detail.id == "action_22") {
                      setType("delete");
                    }
                  }}
                  disabled={loading || !collectionProps.selectedItems.length}
                >
                  Acciones
                </ButtonDropdown>

                <ButtonDropdown
                  variant="primary"
                  items={[
                    {
                      id: "action_1",
                      text: "Artículo en revistas de investigación",
                    },
                    {
                      id: "action_2",
                      text: "Libro",
                    },
                    {
                      id: "action_3",
                      text: "Capítulo de libro",
                    },
                    {
                      id: "action_4",
                      text: "Resumen en evento científico",
                    },
                    {
                      id: "action_5",
                      text: "Tesis propias",
                    },
                    {
                      id: "action_6",
                      text: "Tesis asesoría",
                    },
                  ]}
                  onItemClick={({ detail }) => {
                    setType("add");
                    if (detail.id == "action_1") {
                      setPub("articulo");
                    } else if (detail.id == "action_2") {
                      setPub("libro");
                    } else if (detail.id == "action_3") {
                      setPub("capitulo");
                    } else if (detail.id == "action_4") {
                      setPub("evento");
                    } else if (detail.id == "action_5") {
                      setPub("tesis");
                    } else if (detail.id == "action_6") {
                      setPub("tesis-asesoria");
                    }
                  }}
                  loading={loadingBtn}
                  disabled={loading || disabledBtn}
                >
                  Agregar
                </ButtonDropdown>
              </SpaceBetween>
            }
          >
            Publicaciones asociadas al proyecto
          </Header>
        }
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
      />
      {type == "add" ? (
        <ModalAddPublicacion
          id={id}
          close={() => setType("")}
          tipo_publicacion={pub}
          reload={reload}
        />
      ) : (
        type == "delete" && (
          <ModalDeletePublicacion
            id={collectionProps.selectedItems[0].id}
            close={() => setType("")}
            reload={reload}
          />
        )
      )}
    </>
  );
};
