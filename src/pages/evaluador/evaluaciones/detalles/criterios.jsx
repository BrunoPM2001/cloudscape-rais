import {
  Box,
  Button,
  ButtonDropdown,
  Header,
  Input,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import axiosBase from "../../../../api/axios";
import NotificationContext from "../../../../providers/notificationProvider";
import ModalSubirFicha from "./components/modalSubirFicha";

export default ({
  data,
  cerrado,
  ficha,
  loading,
  proyecto_id,
  reload,
  comentario,
}) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [visible, setVisible] = useState(false);

  //  Functions
  const updateItem = async (item) => {
    const res = await axiosBase.put("evaluador/evaluaciones/updateItem", {
      ...item,
      proyecto_id,
    });
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    reload();
  };

  const finalizarEvaluacion = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.put(
      "evaluador/evaluaciones/finalizarEvaluacion",
      {
        proyecto_id,
        comentario,
      }
    );
    setLoadingBtn(false);
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    reload();
  };

  const reporte = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.get("evaluador/evaluaciones/fichaEvaluacion", {
      params: {
        proyecto_id,
      },
      responseType: "blob",
    });
    setLoadingBtn(false);
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <>
      <Table
        columnDefinitions={[
          {
            id: "opcion",
            header: "Criterio de evaluación",
            cell: (item) => (
              <div dangerouslySetInnerHTML={{ __html: item.opcion }}></div>
            ),
            isRowHeader: true,
            width: "50%",
          },
          {
            id: "puntaje_max",
            header: "Puntaje máximo",
            cell: (item) => item.puntaje_max,
            minWidth: 100,
          },
          {
            id: "puntaje",
            header: "Puntaje obtenido",
            minWidth: 155,
            editConfig: {
              editingCell: (item, { currentValue, setValue }) => {
                return (
                  <Input
                    autoFocus={true}
                    type="number"
                    inputMode="decimal"
                    value={currentValue ?? item.puntaje}
                    onChange={(event) => setValue(event.detail.value)}
                  />
                );
              },
              disabledReason: (item) => {
                if (item.editable != 1 || item.nivel == 2 || cerrado) {
                  return "Este campo no se puede editar.";
                }
                return undefined;
              },
              validation: (item, value) => {
                if (item.puntaje_max < value) {
                  return "Límite superado.";
                } else if (0 > value) {
                  return "Valor inválido.";
                }
                return undefined;
              },
            },
            cell: (item) => (item.nivel != 2 ? item.puntaje : null),
          },
          {
            id: "comentario",
            header: "Comentario",
            minWidth: 250,
            editConfig: {
              editingCell: (item, { currentValue, setValue }) => {
                return (
                  <Input
                    autoFocus={true}
                    value={currentValue ?? item.comentario}
                    onChange={(event) => setValue(event.detail.value)}
                  />
                );
              },
              disabledReason: (item) => {
                if (item.editable != 1 || item.nivel == 2 || cerrado) {
                  return "Este campo no se puede editar.";
                }
                return undefined;
              },
            },
            cell: (item) => item.comentario,
          },
        ]}
        wrapLines
        enableKeyboardNavigation
        items={data}
        loading={loading}
        loadingText="Cargando data"
        submitEdit={async (item, column, newValue) => {
          if (item.puntaje_max < newValue) {
            pushNotification(
              "El puntaje no debe ser menor al puntaje máximo.",
              "error",
              notifications.length + 1
            );
          } else if (0 > newValue) {
            pushNotification(
              "El valor no puede ser inferior a 0",
              "error",
              notifications.length + 1
            );
          } else {
            if (column.id == "puntaje") {
              await updateItem({ ...item, puntaje: newValue });
            } else {
              await updateItem({ ...item, comentario: newValue });
            }
          }
        }}
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
              (cerrado ? (
                <SpaceBetween size="xs">
                  <ButtonDropdown
                    loading={loadingBtn}
                    items={[
                      {
                        text: "Generar ficha de evaluación",
                        id: "action_1",
                        disabled: false,
                      },
                      {
                        text: "Cargar ficha de evaluación",
                        id: "action_2",
                        disabled: false,
                      },
                      {
                        text: "Ver ficha cargada",
                        id: "action_3",
                        disabled: ficha == null,
                        href: "/minio/proyecto-evaluacion/" + ficha,
                        external: true,
                      },
                    ]}
                    onItemClick={({ detail }) => {
                      if (detail.id == "action_1") {
                        reporte();
                      } else if (detail.id == "action_2") {
                        setVisible(true);
                      }
                    }}
                  >
                    Ficha
                  </ButtonDropdown>
                </SpaceBetween>
              ) : (
                <Button loading={loadingBtn} onClick={finalizarEvaluacion}>
                  Finalizar evaluación
                </Button>
              ))
            }
          >
            Criterios de evaluación
          </Header>
        }
      />
      {visible && (
        <ModalSubirFicha
          proyecto_id={proyecto_id}
          close={() => setVisible(false)}
          reload={reload}
        />
      )}
    </>
  );
};
