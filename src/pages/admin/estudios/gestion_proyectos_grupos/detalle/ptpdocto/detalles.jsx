import {
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
import ModalEditarProyecto from "../components/modalEditarProyecto";
import { useState } from "react";
import axiosBase from "../../../../../../api/axios";

export default ({ data, loading, proyecto_id, reload }) => {
  //  States
  const [visible, setVisible] = useState(false);
  const [loadingReporte, setLoadingReporte] = useState(false);

  //  Functions
  const reporteEconomico = async () => {
    setLoadingReporte(true);
    const res = await axiosBase.get(
      "admin/economia/comprobantes/reportePresupuesto",
      {
        params: {
          id: data?.geco_proyecto_id,
        },
        responseType: "blob",
      }
    );
    setLoadingReporte(false);
    const blob = res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const reporte = async () => {
    setLoadingReporte(true);
    const res = await axiosBase.get("admin/estudios/proyectosGrupo/reporte", {
      params: {
        proyecto_id,
      },
      responseType: "blob",
    });
    setLoadingReporte(false);
    const blob = res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <Container
      header={
        <Header
          variant="h2"
          actions={
            <SpaceBetween size="s" direction="horizontal">
              <ButtonDropdown
                disabled={loading}
                loading={loadingReporte}
                onItemClick={({ detail }) => {
                  if (detail.id == "action_1") {
                    reporte();
                  } else if (detail.id == "action_2") {
                    reporteEconomico();
                  }
                }}
                items={[
                  {
                    text: "Proyecto",
                    id: "action_1",
                  },
                  {
                    text: "Económico",
                    id: "action_2",
                    disabled: data?.geco_proyecto_id == null,
                  },
                ]}
              >
                Reporte
              </ButtonDropdown>
              <Button
                variant="primary"
                disabled={loading}
                onClick={() => setVisible(true)}
              >
                Editar
              </Button>
            </SpaceBetween>
          }
        >
          Datos generales
        </Header>
      }
    >
      <SpaceBetween size="m">
        <div>
          <Box variant="awsui-key-label">Título</Box>
          {loading ? <Spinner /> : <div>{data.titulo}</div>}
        </div>
        <ColumnLayout columns={3}>
          <SpaceBetween size="s">
            <div>
              <Box variant="awsui-key-label">Código del proyecto</Box>
              {loading ? <Spinner /> : <div>{data.codigo_proyecto}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Resolución rectoral</Box>
              {loading ? <Spinner /> : <div>{data.resolucion_rectoral}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Fecha de resolución rectoral</Box>
              {loading ? <Spinner /> : <div>{data.resolucion_fecha}</div>}
            </div>
          </SpaceBetween>
          <SpaceBetween size="s">
            <div>
              <Box variant="awsui-key-label">Facultad</Box>
              {loading ? <Spinner /> : <div>{data.facultad}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Línea de investigación</Box>
              {loading ? <Spinner /> : <div>{data.linea}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Estado</Box>
              {loading ? (
                <Spinner />
              ) : (
                <StatusIndicator
                  type={
                    data.estado == -1
                      ? "error"
                      : data.estado == 0
                      ? "stopped"
                      : data.estado == 1
                      ? "success"
                      : data.estado == 3
                      ? "in-progress"
                      : data.estado == 5
                      ? "in-progress"
                      : data.estado == 6
                      ? "in-progress"
                      : data.estado == 7
                      ? "stopped"
                      : data.estado == 8
                      ? "info"
                      : data.estado == 9
                      ? "in-progress"
                      : data.estado == 10
                      ? "success"
                      : data.estado == 11
                      ? "success"
                      : "error"
                  }
                >
                  {data.estado == -1
                    ? "Eliminado"
                    : data.estado == 0
                    ? "No aprobado"
                    : data.estado == 1
                    ? "Aprobado"
                    : data.estado == 3
                    ? "En evaluación"
                    : data.estado == 5
                    ? "Enviado"
                    : data.estado == 6
                    ? "En proceso"
                    : data.estado == 7
                    ? "Anulado"
                    : data.estado == 8
                    ? "Sustentado"
                    : data.estado == 9
                    ? "En ejecución"
                    : data.estado == 10
                    ? "Ejecutado"
                    : data.estado == 11
                    ? "Concluido"
                    : "Error"}
                </StatusIndicator>
              )}
            </div>
          </SpaceBetween>
          <SpaceBetween size="s">
            <div>
              <Box variant="awsui-key-label">Tipo de proyecto</Box>
              {loading ? <Spinner /> : <div>{data.tipo_proyecto}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Localización</Box>
              {loading ? <Spinner /> : <div>{data.localizacion}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Grupo</Box>
              {loading ? <Spinner /> : <div>{data.grupo_nombre}</div>}
            </div>
          </SpaceBetween>
        </ColumnLayout>
        <div>
          <Box variant="awsui-key-label">Declaración Jurada</Box>
          {loading ? (
            <Spinner />
          ) : (
            <div>
              {data.dj_aceptada == 1 ? (
                <>
                  <Link
                    href={data.url2}
                    external="true"
                    variant="primary"
                    target="_blank"
                  >
                    Descargar archivo
                  </Link>
                </>
              ) : (
                <StatusIndicator type="pending">Pendiente</StatusIndicator>
              )}
            </div>
          )}
        </div>
        <ColumnLayout columns={2}>
          <div>
            <Box variant="awsui-key-label">Comentarios</Box>
            {loading ? (
              <Spinner />
            ) : (
              <StatusIndicator type="info">
                {data.comentario == "" || data.comentario == null
                  ? "Ninguno"
                  : data.comentario}
              </StatusIndicator>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Observaciones</Box>
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
        </ColumnLayout>
      </SpaceBetween>
      {visible && (
        <ModalEditarProyecto
          item={data}
          proyecto_id={proyecto_id}
          reload={reload}
          setVisible={setVisible}
          visible={visible}
        />
      )}
    </Container>
  );
};
