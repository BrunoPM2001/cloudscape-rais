import {
  Modal,
  Box,
  SpaceBetween,
  Button,
  Spinner,
  Alert,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";

export default ({ close, reload, proyecto_id, comentario }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [info, setInfo] = useState({});

  //  Functions
  const preFinalizarEvaluacion = async () => {
    const res = await axiosBase.put(
      "evaluador/evaluaciones/preFinalizarEvaluacion",
      {
        proyecto_id,
      }
    );
    const data = res.data;
    setInfo(data);
    setLoading(false);
  };

  const finalizar = async () => {
    setLoadingCreate(true);
    const res = await axiosBase.put(
      "evaluador/evaluaciones/finalizarEvaluacion",
      {
        proyecto_id,
        comentario,
      }
    );
    setLoadingCreate(false);
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    reload();
    close();
  };

  useEffect(() => {
    preFinalizarEvaluacion();
  }, []);

  return (
    <Modal
      onDismiss={close}
      visible
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={finalizar}
              disabled={loading || !info?.comentariosValidos}
              loading={loadingCreate}
            >
              Finalizar evaluación
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Finalizar evaluación"
    >
      {loading ? (
        <>
          <Spinner /> Cargando datos
        </>
      ) : (
        <SpaceBetween size="m">
          {!info.puntajesValidos && (
            <Alert header="Puntajes no completados">
              No ha colocado puntaje a todos los criterios por lo que se
              colocará 0 de forma automática en esos casos
            </Alert>
          )}
          {!info.comentariosValidos && (
            <Alert header="Comentarios obligatorios" type="warning">
              Es obligatorio colocar un comentario a cada criterio evaluado, por
              lo que no puede finalizar la evaluación sin completar eso
            </Alert>
          )}
          {info.comentariosValidos && info.puntajesValidos && (
            <Alert
              header="No hay observaciones en esta evaluación"
              type="success"
            />
          )}
        </SpaceBetween>
      )}
    </Modal>
  );
};
