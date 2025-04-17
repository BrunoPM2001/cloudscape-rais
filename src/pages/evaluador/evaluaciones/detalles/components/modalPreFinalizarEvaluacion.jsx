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
  console.log(comentario);
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
            <Alert header="Puntajes pendientes" type="error">
              Existen criterios de evaluación que no tienen un puntaje asignado.
              De continuar con la finalización, dichos criterios serán
              registrados automáticamente con un puntaje de <strong>0</strong>.
              Le recomendamos revisar cuidadosamente todos los criterios antes
              de enviar su evaluación.
            </Alert>
          )}
          {!info.comentariosValidos && (
            <Alert header="Comentarios obligatorios" type="warning">
              Para completar el proceso, es obligatorio registrar al menos un
              comentario en cada uno de los criterios evaluados. Estos
              comentarios constituyen un respaldo esencial de su valoración como
              evaluador. Por favor, asegúrese de completar todos los campos
              correspondientes antes de proceder.
            </Alert>
          )}
          {info.comentariosValidos && info.puntajesValidos && (
            <Alert header="Evaluación lista para finalizar" type="success">
              Todos los criterios cuentan con comentario y puntaje válido. Puede
              proceder a finalizar la evaluación.
              <br />
              <br />
              <strong>Importante:</strong> Una vez enviada la evaluación del
              proyecto, no será posible modificarla. En caso de dudas sobre el
              procedimiento, comuníquese con la Dirección General de
              Investigación y Transferencia al correo{" "}
              <a href="mailto:dgitt.vrip@unmsm.edu.pe">
                dgitt.vrip@unmsm.edu.pe
              </a>
              .<br />
              <br />
              <strong>Nota:</strong> No olvide firmar su evaluación y enviarla
              para concluir formalmente el proceso de evaluación.
            </Alert>
          )}
        </SpaceBetween>
      )}
    </Modal>
  );
};
