import {
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Header,
  SpaceBetween,
  Spinner,
} from "@cloudscape-design/components";
import Modal from "@cloudscape-design/components/modal";
import ModalCalificarTransferencia from "./components/modalCalificarTransferencia";
import { useState } from "react";
import axiosBase from "../../../../../api/axios";

export default ({ id, proyecto, solicitud, loading, reload }) => {
  //  States
  const [visible, setVisible] = useState(false);
  const [loadingReporte, setLoadingReporte] = useState(false);
  const [visibleEliminar, setVisibleEliminar] = useState(false);
  const [loadingEliminar, setLoadingEliminar] = useState(false);

  //  Functions
  const eliminar = async () => {
    setLoadingEliminar(true);

    const res = await axiosBase.post(
      "admin/economia/transferencias/eliminar",
      {
        geco_proyecto_id: id,
      }
    );

    setLoadingEliminar(false);

    if (res.data.message === "success") {
      setVisibleEliminar(false);
      reload();
    }
  };

  return (
    <Grid
      gridDefinition={[
        {
          colspan: {
            default: 12,
            xl: 4,
            l: 4,
            m: 4,
            s: 4,
            xs: 4,
          },
        },
        {
          colspan: {
            default: 12,
            xl: 8,
            l: 8,
            m: 8,
            s: 8,
            xs: 8,
          },
        },
      ]}
    >
      <Container
        header={<Header variant="h2">Detalles del proyecto</Header>}
        fitHeight
      >
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Tipo</Box>
            {loading ? <Spinner /> : <div>{proyecto.tipo_proyecto}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Título</Box>
            {loading ? <Spinner /> : <div>{proyecto.titulo}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Código de proyecto</Box>
            {loading ? <Spinner /> : <div>{proyecto.codigo_proyecto}</div>}
          </div>
        </SpaceBetween>
      </Container>
      <Container
        header={
          <Header
            variant="h2"
            actions={
              <SpaceBetween direction="horizontal" size="s">
                <Button
                  iconName="remove"
                  variant="normal"
                  onClick={() => setVisibleEliminar(true)}
                  disabled={solicitud?.estado !== 3 && solicitud?.estado !== 4}
                >
                  Eliminar
                </Button>
                <Button
                  variant="primary"
                  disabled={solicitud?.estado != 3}
                  onClick={() => setVisible(true)}
                >
                  Calificar
                </Button>
              </SpaceBetween>
            }
          >
            Última solicitud
          </Header>
        }
        fitHeight
      >
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Justificación</Box>
            {loading ? <Spinner /> : <div>{solicitud.justificacion}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Estado</Box>
            {loading ? (
              <Spinner />
            ) : (
              <Badge
                color={
                  solicitud.estado == 1
                    ? "green"
                    : solicitud.estado == 2
                    ? "red"
                    : solicitud.estado == 3
                    ? "blue"
                    : solicitud.estado == 4
                    ? "grey"
                    : "red"
                }
              >
                {solicitud.estado == 1
                  ? "Aprobado"
                  : solicitud.estado == 2
                  ? "Rechazado"
                  : solicitud.estado == 3
                  ? "Nueva transferencia"
                  : solicitud.estado == 4
                  ? "Temporal"
                  : "Eliminado"}
              </Badge>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Fecha de solicitud</Box>
            {loading ? <Spinner /> : <div>{solicitud.created_at}</div>}
          </div>
        </SpaceBetween>
      </Container>
      {visible && (
        <ModalCalificarTransferencia
          visible={visible}
          setVisible={setVisible}
          reload={reload}
        />
      )}
      {visibleEliminar && (
        <Modal
          visible={visibleEliminar}
          onDismiss={() => setVisibleEliminar(false)}
          header="Eliminar transferencia"
          footer={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Button
                  variant="link"
                  onClick={() => setVisibleEliminar(false)}
                >
                  Cancelar
                </Button>

                <Button
                  variant="primary"
                  loading={loadingEliminar}
                  onClick={eliminar}
                >
                  Confirmar
                </Button>
              </SpaceBetween>
            </Box>
          }
        >
          ¿Está seguro de eliminar esta solicitud de transferencia?
        </Modal>
      )}
    </Grid>
  );
};
