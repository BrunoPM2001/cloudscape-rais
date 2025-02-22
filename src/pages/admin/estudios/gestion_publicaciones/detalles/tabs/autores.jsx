import {
  Box,
  Button,
  ButtonDropdown,
  Container,
  Header,
  Pagination,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalAutorEstudiante from "../../components/modalAutorEstudiante";
import ModalAutorDocente from "../../components/modalAutorDocente";
import ModalAutorExterno from "../../components/modalAutorExterno";
import ModalEditarAutor from "../../components/modalEditarAutor";
import ModalEliminarAutor from "../../components/modalEliminarAutor";
import axiosBase from "../../../../../../api/axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import NotificationContext from "../../../../../../providers/notificationProvider";
import ModalConvertirAutor from "../../components/modalConvertirAutor";

const columnDefinitions = [
  {
    id: "presentado",
    header: "Presentado",
    cell: (item) => (item.presentado ? "Sí" : "No"),
  },
  {
    id: "categoria",
    header: "Categoría",
    cell: (item) => item.categoria,
  },
  {
    id: "autor",
    header: "Nombre en la publicación",
    cell: (item) => item.autor,
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
  },
  {
    id: "nombres",
    header: "Nombres",
    cell: (item) => item.nombres,
  },
  {
    id: "filiacion",
    header: "Filiación UNMSM",
    cell: (item) => item.filiacion,
  },
  {
    id: "filiacion_unica",
    header: "Filiación única",
    cell: (item) => item.filiacion_unica,
  },
  {
    id: "puntaje",
    header: "Puntaje",
    cell: (item) => item.puntaje,
  },
  {
    id: "created_at",
    header: "Fecha creación",
    cell: (item) => item.created_at,
  },
  {
    id: "updated_at",
    header: "Fecha actualización",
    cell: (item) => item.updated_at,
  },
];

const columnDisplay = [
  { id: "presentado", visible: true },
  { id: "categoria", visible: true },
  { id: "autor", visible: true },
  { id: "tipo", visible: true },
  { id: "nombres", visible: true },
  { id: "filiacion", visible: true },
  { id: "filiacion_unica", visible: true },
  { id: "puntaje", visible: true },
  { id: "created_at", visible: true },
  { id: "updated_at", visible: true },
];

export default function ({ data, loading, tipo, reload }) {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  State
  const [autores, setAutores] = useState(data);
  const [index, setIndex] = useState(null);
  const [type, setType] = useState("");
  const [optAutor, setOptAutor] = useState([]);
  const [tipoAutor, setTipoAutor] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false);

  //  Hooks
  const { items, actions, collectionProps, paginationProps } = useCollection(
    autores,
    {
      pagination: { pageSize: 10 },
      sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
      selection: {},
    }
  );

  const recalcular = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.put(
      "admin/estudios/publicaciones/recalcularPuntaje",
      {
        id,
      }
    );
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    setLoadingBtn(false);
    reload();
  };

  const convertirPrincipal = async () => {
    const res = await axiosBase.put(
      "admin/estudios/publicaciones/convertirPrincipal",
      {
        id: collectionProps.selectedItems[0].id,
        publicacion_id: id,
      }
    );
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    reload();
  };

  const reOrdenar = async () => {
    const res = await axiosBase.put("admin/estudios/publicaciones/reOrdenar", {
      autores,
      publicacion_id: id,
    });
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    reload();
  };

  const swapAutores = (direction) => {
    setAutores((prevItems) => {
      const newItems = [...prevItems]; // Clonar el array
      if (direction === "next" && index < newItems.length - 1) {
        // Intercambiar con el siguiente elemento
        [newItems[index], newItems[index + 1]] = [
          newItems[index + 1],
          newItems[index],
        ];
        setIndex(index + 1);
      } else if (direction === "back" && index > 0) {
        // Intercambiar con el elemento anterior
        [newItems[index], newItems[index - 1]] = [
          newItems[index - 1],
          newItems[index],
        ];
        setIndex(index - 1);
      }
      return newItems; // Actualizar el estado
    });
  };

  //  Effect
  useEffect(() => {
    if (tipo == "articulo") {
      setOptAutor([{ value: "Autor" }, { value: "Autor de correspondencia" }]);
      setTipoAutor([
        { text: "Docente", id: "action_2_1" },
        { text: "Estudiante", id: "action_2_2" },
        { text: "Externo", id: "action_2_3" },
      ]);
    } else if (["libro", "capitulo", "evento"].includes(tipo)) {
      setOptAutor([{ value: "Autor" }]);
      setTipoAutor([
        { text: "Docente", id: "action_2_1" },
        { text: "Estudiante", id: "action_2_2" },
        { text: "Externo", id: "action_2_3" },
      ]);
    } else if (tipo == "tesis") {
      setOptAutor([{ value: "Asesor" }, { value: "Co-Asesor" }]);
      setTipoAutor([
        { text: "Asesor / co-asesor interno", id: "action_2_1" },
        { text: "Asesor / co-asesor externo", id: "action_2_3" },
      ]);
    } else if (tipo == "tesis-asesoria") {
      setOptAutor([{ value: "Tesista" }]);
      setTipoAutor([
        { text: "Asesor / co-asesor docente UNMSM", id: "action_2_1" },
        { text: "Agregar autor estudiante UNMSM", id: "action_2_2" },
      ]);
    }
  }, [loading]);

  useEffect(() => {
    setAutores(data);
  }, [data]);

  return (
    <Container>
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
        variant="embedded"
        onRowClick={({ detail }) => {
          actions.setSelectedItems([detail.item]);
          setIndex(detail.rowIndex);
        }}
        header={
          <Header
            counter={"(" + data.length + ")"}
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button
                  iconName="angle-up"
                  disabled={!collectionProps.selectedItems.length}
                  onClick={() => swapAutores("back")}
                >
                  Subir
                </Button>
                <Button
                  iconName="angle-down"
                  disabled={!collectionProps.selectedItems.length}
                  onClick={() => swapAutores("next")}
                >
                  Bajar
                </Button>
                <ButtonDropdown
                  variant="normal"
                  loading={loadingBtn}
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_2_1") {
                      recalcular();
                    } else if (detail.id == "action_2_2") {
                      reOrdenar();
                    }
                  }}
                  items={[
                    {
                      id: "action_2_1",
                      text: "Recalcular puntajes",
                    },
                    {
                      id: "action_2_2",
                      text: "Re ordenar",
                    },
                  ]}
                >
                  Más acciones
                </ButtonDropdown>
                <ButtonDropdown
                  disabled={!collectionProps.selectedItems.length}
                  variant="normal"
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_1_1") {
                      if (tipo == "tesis-asesoria") {
                        setOptAutor([
                          { value: "Asesor" },
                          { value: "Tesista" },
                        ]);
                      }
                      setType("edit");
                    } else if (detail.id == "action_1_2") {
                      setType("delete");
                    } else if (detail.id == "action_1_3") {
                      setType("convertir");
                    }
                  }}
                  items={[
                    {
                      id: "action_1_1",
                      text: "Editar",
                    },
                    {
                      id: "action_1_2",
                      text: "Eliminar",
                      disabled: collectionProps.selectedItems[0]?.presentado,
                    },
                    {
                      id: "action_1_3",
                      text: "Convertir en autor",
                      disabled:
                        collectionProps.selectedItems[0]?.tipo ==
                        "DOCENTE PERMANENTE",
                      disabledReason:
                        "Solo puede convertir en autor a los miembros que no figuren como docente permanente",
                    },
                  ]}
                >
                  Acciones
                </ButtonDropdown>
                <ButtonDropdown
                  variant="primary"
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_2_1") {
                      if (tipo == "tesis-asesoria") {
                        setOptAutor([{ value: "Asesor" }]);
                      }
                      setType("add_docente");
                    } else if (detail.id == "action_2_2") {
                      if (tipo == "tesis-asesoria") {
                        setOptAutor([{ value: "Tesista" }]);
                      }
                      setType("add_estudiante");
                    } else if (detail.id == "action_2_3") {
                      setType("add_externo");
                    }
                  }}
                  items={tipoAutor}
                >
                  Agregar
                </ButtonDropdown>
              </SpaceBetween>
            }
          >
            Autores
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
      {type == "add_docente" ? (
        <ModalAutorDocente
          id={id}
          reload={reload}
          close={() => setType("")}
          optAutor={optAutor}
        />
      ) : type == "add_estudiante" ? (
        <ModalAutorEstudiante
          id={id}
          reload={reload}
          close={() => setType("")}
          optAutor={optAutor}
        />
      ) : type == "add_externo" ? (
        <ModalAutorExterno
          id={id}
          reload={reload}
          close={() => setType("")}
          optAutor={optAutor}
        />
      ) : type == "edit" ? (
        <ModalEditarAutor
          item={collectionProps.selectedItems[0]}
          reload={reload}
          close={() => setType("")}
          optAutor={optAutor}
        />
      ) : type == "delete" ? (
        <ModalEliminarAutor
          id={collectionProps.selectedItems[0].id}
          reload={reload}
          close={() => setType("")}
        />
      ) : (
        type == "convertir" && (
          <ModalConvertirAutor
            item={collectionProps.selectedItems[0]}
            reload={reload}
            close={() => setType("")}
            optAutor={optAutor}
          />
        )
      )}
    </Container>
  );
}
