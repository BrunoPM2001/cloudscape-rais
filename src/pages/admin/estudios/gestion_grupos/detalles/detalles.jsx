import {
  Badge,
  Box,
  Button,
  ButtonDropdown,
  ColumnLayout,
  Container,
  Header,
  Link,
  SpaceBetween,
  Spinner,
  StatusIndicator,
} from "@cloudscape-design/components";
import { useState } from "react";
import ModalEditGrupo from "./components/modalEditGrupo";
import ModalAprobarSolicitud from "./components/modalAprobarSolicitud";
import ModalDisolverGrupo from "./components/modalDisolverGrupo";

export default ({ data, loading, grupo_id, reload }) => {
  //  States
  const [visible, setVisible] = useState(false);
  const [typeModal, setTypeModal] = useState("");

  return (
    <Container
      header={
        <Header
          variant="h2"
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <ButtonDropdown
                disabled={loading || data.estado < 0}
                items={
                  data.tipo == "grupo"
                    ? [
                        {
                          id: "action_1_1",
                          text: "Calificación",
                        },
                        {
                          id: "action_1_2",
                          text: "Reporte del grupo",
                        },
                        {
                          id: "action_1_3",
                          text: "Disolver grupo",
                        },
                      ]
                    : [
                        {
                          id: "action_2_1",
                          text: "Aprobar solicitud",
                        },
                      ]
                }
                onItemClick={({ detail }) => {
                  if (detail.id == "action_1_3") {
                    setVisible(true);
                    setTypeModal("disolver_grupo");
                  } else if (detail.id == "action_2_1") {
                    setVisible(true);
                    setTypeModal("aprobar_soli");
                  }
                }}
              >
                Opciones
              </ButtonDropdown>
              <Button
                variant="primary"
                onClick={() => {
                  setVisible(true);
                  setTypeModal("edit");
                }}
                disabled={loading || data.estado < 0}
              >
                Editar
              </Button>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="xs" alignItems="center" direction="horizontal">
            <Box variant="h1">Detalles del grupo</Box>
            <Badge color="green">{grupo_id}</Badge>
            <Badge color="blue">{data.grupo_nombre_corto}</Badge>
          </SpaceBetween>
        </Header>
      }
    >
      <ColumnLayout columns={3} variant="text-grid">
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Nombre</Box>
            {loading ? <Spinner /> : <div>{data.grupo_nombre}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Facultad</Box>
            {loading ? <Spinner /> : <div>{data.facultad}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Responsable</Box>
            {loading ? <Spinner /> : <div>{data.coordinador}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Estado</Box>
            {loading ? (
              <Spinner />
            ) : (
              <StatusIndicator
                type={
                  data.estado == -2
                    ? "error"
                    : data.estado == 1
                    ? "info"
                    : data.estado == 2
                    ? "stopped"
                    : data.estado == 4
                    ? "success"
                    : data.estado == 5
                    ? "pending"
                    : data.estado == 6
                    ? "in-progress"
                    : data.estado == 12
                    ? "error"
                    : "error"
                }
              >
                {data.estado == -2
                  ? "Disuelto"
                  : data.estado == -1
                  ? "Eliminado"
                  : data.estado == 1
                  ? "Reconocido"
                  : data.estado == 2
                  ? "Observado"
                  : data.estado == 4
                  ? "Registrado"
                  : data.estado == 5
                  ? "Enviado"
                  : data.estado == 6
                  ? "En proceso"
                  : data.estado == 12
                  ? "Reg. observado"
                  : "error"}
              </StatusIndicator>
            )}
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Resolución de creación</Box>
            {loading ? (
              <Spinner />
            ) : (
              <div>{data.resolucion_rectoral_creacion}</div>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Fecha de resolución de creación</Box>
            {loading ? (
              <Spinner />
            ) : (
              <div>{data.resolucion_creacion_fecha}</div>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Resolución actual</Box>
            {loading ? <Spinner /> : <div>{data.resolucion_rectoral}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Fecha de resolución actual</Box>
            {loading ? <Spinner /> : <div>{data.resolucion_fecha}</div>}
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Observaciones</Box>
            {loading ? (
              <Spinner />
            ) : (
              <StatusIndicator type="info">
                {data.observaciones}
              </StatusIndicator>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Observaciones al investigador</Box>
            {loading ? (
              <Spinner />
            ) : (
              <StatusIndicator
                type={
                  data.observaciones_admin == "" ||
                  data.observaciones_admin == null
                    ? "success"
                    : "pending"
                }
              >
                {data.observaciones_admin == "" ||
                data.observaciones_admin == null
                  ? "Ninguna"
                  : data.observaciones_admin}
              </StatusIndicator>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">
              Resoluciones decanales o constancias
            </Box>
            {loading ? (
              <Spinner />
            ) : (
              <Link href={data.url ? data.url : "#"} target="_blank">
                {data.url ? "Descargar" : "No hay archivos adjuntos"}
              </Link>
            )}
          </div>
        </SpaceBetween>
      </ColumnLayout>
      {visible &&
        (typeModal == "edit" ? (
          <ModalEditGrupo
            visible={visible}
            setVisible={setVisible}
            item={data}
            grupo_id={grupo_id}
            reload={reload}
          />
        ) : typeModal == "aprobar_soli" ? (
          <ModalAprobarSolicitud
            visible={visible}
            setVisible={setVisible}
            grupo_id={grupo_id}
          />
        ) : typeModal == "disolver_grupo" ? (
          <ModalDisolverGrupo
            visible={visible}
            setVisible={setVisible}
            grupo_id={grupo_id}
          />
        ) : (
          <></>
        ))}
    </Container>
  );
};
