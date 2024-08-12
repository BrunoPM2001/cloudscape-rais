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
    header: "Filiación",
    cell: (item) => item.filiacion,
  },
];

const columnDisplay = [
  { id: "presentado", visible: true },
  { id: "categoria", visible: true },
  { id: "autor", visible: true },
  { id: "tipo", visible: true },
  { id: "nombres", visible: true },
  { id: "filiacion", visible: true },
];

export default function ({ data, loading, tipo, reload }) {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  State
  const [type, setType] = useState("");
  const [optAutor, setOptAutor] = useState([]);
  const [tipoAutor, setTipoAutor] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false);

  //  Hooks
  const { items, collectionProps, paginationProps } = useCollection(data, {
    pagination: { pageSize: 10 },
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
    selection: {},
  });

  const recalcular = async () => {
    const res = await axiosBase.put(
      "admin/estudios/publicaciones/recalcularPuntaje",
      {
        id,
      }
    );
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
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
    } else if (["libro", "capitulo_libro", "evento"].includes(tipo)) {
      setOptAutor([{ value: "Autor" }]);
      setTipoAutor([
        { text: "Docente", id: "action_2_1" },
        { text: "Estudiante", id: "action_2_2" },
        { text: "Externo", id: "action_2_3" },
      ]);
    } else if (tipo == "tesis_propia") {
      setOptAutor([{ value: "Asesor" }, { value: "Co-Asesor" }]);
      setTipoAutor([
        { text: "Asesor / co-asesor interno", id: "action_2_1" },
        { text: "Asesor / co-asesor externo", id: "action_2_3" },
      ]);
    } else if (tipo == "tesis_asesoria") {
      setOptAutor([{ value: "Tesista" }]);
      setTipoAutor([
        { text: "Agregar autor estudiante UNMSM", id: "action_2_2" },
      ]);
    }
  }, []);

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
        resizableColumns
        enableKeyboardNavigation
        selectionType="single"
        variant="embedded"
        header={
          <Header
            counter={"(" + data.length + ")"}
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button onClick={recalcular} loading={loadingBtn}>
                  Recalcular puntajes
                </Button>
                <ButtonDropdown
                  disabled={
                    collectionProps.selectedItems.length > 0 ? false : true
                  }
                  variant="normal"
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_1_1") {
                      setType("edit");
                    } else if (detail.id == "action_1_2") {
                      setType("delete");
                    } else if (detail.id == "action_1_3") {
                      convertirPrincipal();
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
                      text: "Convertir en autor principal",
                    },
                  ]}
                >
                  Acciones
                </ButtonDropdown>
                <ButtonDropdown
                  variant="primary"
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_2_1") {
                      setType("add_docente");
                    } else if (detail.id == "action_2_2") {
                      setType("add_estudiante");
                    } else if (detail.id == "action_2_3") {
                      setType("add_externo");
                    }
                  }}
                  items={tipoAutor}
                >
                  Agregar autor
                </ButtonDropdown>
              </SpaceBetween>
            }
          >
            Autores de la publicación
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
        <></>
      )}
    </Container>
  );
}
