import {
  Table,
  Box,
  SpaceBetween,
  Header,
  Button,
  Badge,
} from "@cloudscape-design/components";
import { useState } from "react";
import ModalCreateCriterio from "../components/modalCreateCriterio";
import ModalEditCriterio from "../components/modalEditCriterio";
import { useCollection } from "@cloudscape-design/collection-hooks";

const columnDefinitions = [
  {
    id: "opcion",
    header: "Criterio de evaluación",
    cell: (item) =>
      item.nivel == 2 ? (
        <Badge color="blue">
          <div dangerouslySetInnerHTML={{ __html: item.opcion }}></div>
        </Badge>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: item.opcion }}></div>
      ),
  },
  {
    id: "puntaje_max",
    header: "Puntaje máximo",
    cell: (item) => item.puntaje_max,
    width: 90,
  },
  {
    id: "editable",
    header: "Editable",
    cell: (item) => item.editable,
    width: 60,
  },
  {
    id: "otipo",
    header: "Tipo de restricción",
    cell: (item) => item.otipo,
  },
  {
    id: "puntos_adicionales",
    header: "Puntos adicionales",
    cell: (item) => item.puntos_adicionales,
    width: 100,
  },
];

const columnDisplay = [
  { id: "opcion", visible: true },
  { id: "puntaje_max", visible: true },
  { id: "editable", visible: true },
  { id: "otipo", visible: true },
  { id: "puntos_adicionales", visible: true },
];

export default ({ data, estado, loading, reload }) => {
  //  State
  const [type, setType] = useState("");

  //  Hooks
  const { items, collectionProps } = useCollection(data, {
    sorting: {},
    selection: {},
  });

  return (
    <>
      <Table
        {...collectionProps}
        wrapLines
        columnDefinitions={columnDefinitions}
        columnDisplay={columnDisplay}
        enableKeyboardNavigation
        items={items}
        loadingText="Cargando datos"
        loading={loading}
        trackBy="id"
        selectionType=""
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
        header={
          <Header
            actions={
              !loading &&
              estado != "APROBADO" && (
                <SpaceBetween size="xs" direction="horizontal">
                  <Button
                    disabled={collectionProps.selectedItems.length == 0}
                    onClick={() => setType("editCriterio")}
                  >
                    Editar
                  </Button>
                  <Button onClick={() => setType("addCriterio")}>
                    Agregar
                  </Button>
                </SpaceBetween>
              )
            }
          >
            Criterios de evaluación
          </Header>
        }
      />
      {type == "addCriterio" ? (
        <ModalCreateCriterio close={() => setType("")} reload={reload} />
      ) : type == "editCriterio" ? (
        <ModalEditCriterio
          close={() => setType("")}
          reload={reload}
          data={collectionProps.selectedItems[0]}
        />
      ) : (
        <></>
      )}
    </>
  );
};
