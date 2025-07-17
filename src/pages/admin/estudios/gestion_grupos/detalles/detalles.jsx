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
import ModalSubirDoc from "./components/modalSubirDoc";
import axiosBase from "../../../../../api/axios";

export default ({ data, loading, grupo_id, reload }) => {
  //  States
  const [modal, setModal] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);

  const reporteCalificacion = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.get("admin/estudios/grupos/calificacion", {
      params: {
        grupo_id,
      },
      responseType: "blob",
    });
    const blob = res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingBtn(false);
  };

  return (
    <Container
      header={
        <Header
          variant="h2"
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <ButtonDropdown
                disabled={loading || data.estado < 0}
                loading={loadingBtn}
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
                        {
                          id: "action_1_4",
                          text: "Subir documento",
                        },
                      ]
                    : [
                        {
                          id: "action_2_1",
                          text: "Aprobar solicitud",
                        },
                        {
                          id: "action_1_4",
                          text: "Subir documento",
                        },
                      ]
                }
                onItemClick={async ({ detail }) => {
                  if (detail.id == "action_1_1") {
                    reporteCalificacion();
                  } else if (detail.id == "action_1_3") {
                    setModal("disolver_grupo");
                  } else if (detail.id == "action_2_1") {
                    setModal("aprobar_soli");
                  } else if (detail.id == "action_1_2") {
                    const res = await axiosBase.get(
                      "admin/estudios/grupos/reporte",
                      {
                        params: {
                          id: grupo_id,
                        },
                        responseType: "blob",
                      }
                    );
                    const blob = await res.data;
                    const url = URL.createObjectURL(blob);
                    window.open(url, "_blank");
                  } else if (detail.id == "action_1_4") {
                    setModal("subir_doc");
                  }
                }}
              >
                Opciones
              </ButtonDropdown>
              <Button
                variant="primary"
                onClick={() => {
                  setModal("edit");
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
                    : data.estado == -1
                    ? "error"
                    : data.estado == 0
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
                  : data.estado == 0
                  ? "No aprobado"
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
            <Box variant="awsui-key-label">
              Resolución de la directiva actual
            </Box>
            {loading ? <Spinner /> : <div>{data.resolucion_rectoral}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">
              Fecha de resolución de la directiva actual
            </Box>
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
      {modal == "edit" ? (
        <ModalEditGrupo
          close={() => setModal("")}
          item={data}
          grupo_id={grupo_id}
          reload={reload}
        />
      ) : modal == "aprobar_soli" ? (
        <ModalAprobarSolicitud close={() => setModal("")} grupo_id={grupo_id} />
      ) : modal == "disolver_grupo" ? (
        <ModalDisolverGrupo close={() => setModal("")} grupo_id={grupo_id} />
      ) : (
        modal == "subir_doc" && (
          <ModalSubirDoc
            close={() => setModal("")}
            grupo_id={grupo_id}
            reload={reload}
          />
        )
      )}
    </Container>
  );
};
