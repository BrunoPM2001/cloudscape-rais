import {
  Box,
  ButtonDropdown,
  Header,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalAgregarDocente from "./components/modalAgregarDocente";
import ModalEliminarMiembro from "./components/modalEliminarMiembro";
import ModalAgregarTesista from "./components/modalAgregarTesista";
import ModalAgregarExterno from "./components/modalAgregarExterno";
import ModalEditarDocente from "./components/modalEditarDocente";
import ModalEditarTesista from "./components/modalEditarTesista";
import ModalEditarExterno from "./components/modalEditarExterno";

export default function Paso4({ info, loading, reload }) {
  //  States
  const [type, setType] = useState("");

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Hooks
  const { items, actions, collectionProps } = useCollection(info, {
    sorting: {},
    selection: {},
  });

  return (
    <>
      <Table
        {...collectionProps}
        trackBy="id"
        columnDefinitions={[
          {
            id: "tipo_integrante",
            header: "Tipo de integrante",
            cell: (item) => item.tipo_integrante,
            isRowHeader: true,
          },
          {
            id: "nombre",
            header: "Nombres",
            cell: (item) => item.nombre,
          },
          {
            id: "doc_numero",
            header: "N° documento",
            cell: (item) => item.doc_numero,
          },
          {
            id: "responsable",
            header: "Responsable",
            cell: (item) => item.responsable,
          },
          {
            id: "facultad",
            header: "Facultad",
            cell: (item) => item.facultad,
          },
        ]}
        columnDisplay={[
          { id: "tipo_integrante", visible: true },
          { id: "nombre", visible: true },
          { id: "doc_numero", visible: true },
          { id: "responsable", visible: true },
          { id: "facultad", visible: true },
        ]}
        selectionType="single"
        items={items}
        loading={loading}
        loadingText="Cargando datos"
        onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
        wrapLines
        header={
          <Header
            variant="h3"
            actions={
              <SpaceBetween size="xs" direction="horizontal">
                <ButtonDropdown
                  disabled={collectionProps.selectedItems.length == 0}
                  items={[
                    {
                      id: "action_4",
                      text: "Editar",
                    },
                    {
                      id: "action_5",
                      text: "Eliminar",
                    },
                  ]}
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_4") {
                      if (
                        collectionProps.selectedItems[0].tipo_integrante ==
                        "Tesista"
                      ) {
                        setType("editTe");
                      } else if (
                        collectionProps.selectedItems[0].tipo_integrante ==
                        "Externo"
                      ) {
                        setType("editExterno");
                      } else {
                        setType("editDo");
                      }
                    } else if (detail.id == "action_5") {
                      setType("delete");
                    }
                  }}
                >
                  Acciones
                </ButtonDropdown>
                <ButtonDropdown
                  variant="primary"
                  items={[
                    {
                      id: "action_1",
                      text: "Docente",
                    },
                    {
                      id: "action_2",
                      text: "Tesista",
                    },
                    {
                      id: "action_3",
                      text: "Externo",
                    },
                  ]}
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_1") {
                      setType("addDo");
                    } else if (detail.id == "action_2") {
                      setType("addTe");
                    } else if (detail.id == "action_3") {
                      setType("addExterno");
                    }
                  }}
                  disabled={loading}
                >
                  Agregar
                </ButtonDropdown>
              </SpaceBetween>
            }
          >
            Integrantes
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
      {type == "addDo" ? (
        <ModalAgregarDocente
          id={id}
          close={() => setType("")}
          reload={reload}
        />
      ) : type == "addTe" ? (
        <ModalAgregarTesista
          id={id}
          close={() => setType("")}
          reload={reload}
        />
      ) : type == "addExterno" ? (
        <ModalAgregarExterno
          close={() => setType("")}
          id={id}
          reload={reload}
        />
      ) : type == "editDo" ? (
        <ModalEditarDocente
          id={collectionProps.selectedItems[0].id}
          close={() => setType("")}
          reload={reload}
        />
      ) : type == "editTe" ? (
        <ModalEditarTesista
          id={collectionProps.selectedItems[0].id}
          close={() => setType("")}
          reload={reload}
        />
      ) : type == "editExterno" ? (
        <ModalEditarExterno
          id={collectionProps.selectedItems[0].id}
          close={() => setType("")}
          reload={reload}
        />
      ) : (
        type == "delete" && (
          <ModalEliminarMiembro
            id={collectionProps.selectedItems[0].id}
            close={() => setType("")}
            reload={reload}
          />
        )
      )}
    </>
  );
}
