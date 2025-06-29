import {
  Table,
  Box,
  SpaceBetween,
  Header,
  Button,
  Badge,
  ButtonDropdown,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import ModalCreateCriterio from "../components/modalCreateCriterio";
import ModalEditCriterio from "../components/modalEditCriterio";
import { useCollection } from "@cloudscape-design/collection-hooks";
import NotificationContext from "../../../../../providers/notificationProvider";
import axiosBase from "../../../../../api/axios";

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
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  State
  const [type, setType] = useState("");

  //  Hooks
  const [criterios, setCriterios] = useState(data);
  const [index, setIndex] = useState(null);
  const { items, collectionProps, actions } = useCollection(criterios, {
    sorting: {},
    selection: {},
  });

  const reOrdenar = async () => {
    const res = await axiosBase.put(
      "admin/estudios/convocatorias/reOrdenarCriterios",
      {
        criterios,
      }
    );
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    reload();
  };

  const swapAutores = (direction) => {
    setCriterios((prevItems) => {
      const newItems = [...prevItems];
      if (direction === "next" && index < newItems.length - 1) {
        [newItems[index], newItems[index + 1]] = [
          newItems[index + 1],
          newItems[index],
        ];
        setIndex(index + 1);
      } else if (direction === "back" && index > 0) {
        [newItems[index], newItems[index - 1]] = [
          newItems[index - 1],
          newItems[index],
        ];
        setIndex(index - 1);
      }
      return newItems;
    });
  };

  useEffect(() => {
    setCriterios(data);
  }, [data]);

  return (
    <>
      <Table
        {...collectionProps}
        trackBy="id"
        wrapLines
        columnDefinitions={columnDefinitions}
        columnDisplay={columnDisplay}
        enableKeyboardNavigation
        items={items}
        loadingText="Cargando datos"
        loading={loading}
        selectionType="single"
        onRowClick={({ detail }) => {
          actions.setSelectedItems([detail.item]);
          setIndex(detail.rowIndex);
        }}
        stickyHeader
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
                  <ButtonDropdown
                    items={[
                      {
                        id: "action1_1",
                        text: "Subir",
                        iconName: "angle-up",
                      },
                      {
                        id: "action1_2",
                        text: "Bajar",
                        iconName: "angle-down",
                      },
                      {
                        id: "action1_3",
                        text: "Aplicar cambios",
                        iconName: "edit",
                      },
                    ]}
                    onItemClick={({ detail }) => {
                      if (detail.id == "action1_1") {
                        swapAutores("back");
                      } else if (detail.id == "action1_2") {
                        swapAutores("next");
                      } else if (detail.id == "action1_3") {
                        reOrdenar();
                      }
                    }}
                    disabled={!collectionProps.selectedItems.length}
                  >
                    Reordenar
                  </ButtonDropdown>
                  <Button
                    disabled={collectionProps.selectedItems.length == 0}
                    onClick={() => setType("editCriterio")}
                    variant="primary"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => setType("addCriterio")}
                    variant="primary"
                  >
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
