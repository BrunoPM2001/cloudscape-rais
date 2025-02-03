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
import ModalAddPatenteDocente from "../../components/modalAddPatenteDocente";
import ModalAddPatenteEstudiante from "../../components/modalAddPatenteEstudiante";
import ModalAddPatenteExterno from "../../components/modalAddPatenteExterno";
import ModalEliminarPatenteAutor from "../../components/modalEliminarPatenteAutor";
import ModalEditarPatenteAutor from "../../components/modalEditarPatenteAutor";

const columnDefinitions = [
  {
    id: "condicion",
    header: "Condición",
    cell: (item) => item.condicion,
  },
  {
    id: "nombres",
    header: "Nombres",
    cell: (item) => item.nombres,
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
  },
  {
    id: "es_presentador",
    header: "Presentador",
    cell: (item) => item.es_presentador,
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
  { id: "condicion", visible: true },
  { id: "nombres", visible: true },
  { id: "tipo", visible: true },
  { id: "es_presentador", visible: true },
  { id: "puntaje", visible: true },
  { id: "created_at", visible: true },
  { id: "updated_at", visible: true },
];

export default function ({ data, loading, reload }) {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  State
  const [type, setType] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);

  //  Hooks
  const { items, actions, collectionProps, paginationProps } = useCollection(
    data,
    {
      pagination: { pageSize: 10 },
      sorting: {},
      selection: {},
    }
  );

  const recalcular = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.put(
      "admin/estudios/patentes/recalcularPuntaje",
      {
        id,
      }
    );
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    setLoadingBtn(false);
    reload();
  };

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
        onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
        header={
          <Header
            counter={"(" + data.length + ")"}
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button
                  variant="normal"
                  loading={loadingBtn}
                  disabled={loading}
                  onClick={() => recalcular()}
                >
                  Recalcular puntajes
                </Button>
                <ButtonDropdown
                  disabled={!collectionProps.selectedItems.length}
                  variant="normal"
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_1_1") {
                      setType("edit");
                    } else if (detail.id == "action_1_2") {
                      setType("delete");
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
                      disabled:
                        collectionProps.selectedItems[0]?.es_presentador ==
                        "Sí",
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
                  items={[
                    {
                      id: "action_2_1",
                      text: "Docente UNMSM",
                    },
                    {
                      id: "action_2_2",
                      text: "Alumno UNMSM",
                    },
                    {
                      id: "action_2_3",
                      text: "Externo",
                    },
                  ]}
                  disabled={loading}
                >
                  Agregar
                </ButtonDropdown>
              </SpaceBetween>
            }
          >
            Autores/Inventores
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
        <ModalAddPatenteDocente
          id={id}
          reload={reload}
          close={() => setType("")}
        />
      ) : type == "add_estudiante" ? (
        <ModalAddPatenteEstudiante
          id={id}
          reload={reload}
          close={() => setType("")}
        />
      ) : type == "add_externo" ? (
        <ModalAddPatenteExterno
          id={id}
          reload={reload}
          close={() => setType("")}
        />
      ) : type == "edit" ? (
        <ModalEditarPatenteAutor
          item={collectionProps.selectedItems[0]}
          reload={reload}
          close={() => setType("")}
        />
      ) : (
        type == "delete" && (
          <ModalEliminarPatenteAutor
            id={collectionProps.selectedItems[0].id}
            reload={reload}
            close={() => setType("")}
          />
        )
      )}
    </Container>
  );
}
