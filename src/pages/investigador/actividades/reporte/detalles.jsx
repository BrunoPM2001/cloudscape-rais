import {
  Badge,
  Box,
  ButtonDropdown,
  ColumnLayout,
  Container,
  Header,
  SpaceBetween,
  Spinner,
  StatusIndicator,
} from "@cloudscape-design/components";
import axiosBase from "../../../../api/axios";
import { useState } from "react";

export default ({ data, loading, id, items, antiguo }) => {
  //  States
  const [loadingReporte, setLoadingReporte] = useState(false);

  //  Functions
  const presupuesto = async () => {
    setLoadingReporte(true);
    const res = await axiosBase.get(
      "investigador/actividades/reportePresupuesto",
      {
        params: {
          id,
        },
        responseType: "blob",
      }
    );
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingReporte(false);
  };

  const reporte = async (tipo) => {
    setLoadingReporte(true);
    const res = await axiosBase.get("investigador/actividades/" + tipo, {
      params: {
        id,
      },
      responseType: "blob",
    });
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingReporte(false);
  };

  return (
    <Container
      header={
        <Header
          actions={
            <ButtonDropdown
              items={items}
              disabled={loading || items.length == 0}
              loading={loadingReporte}
              onItemClick={({ detail }) => {
                if (detail.id == "action_1") {
                  presupuesto();
                } else if (detail.id == "action_2") {
                  reporte("reporteConFin");
                } else if (detail.id == "action_3") {
                  reporte("reporteSinFin");
                }
              }}
            >
              Reportes
            </ButtonDropdown>
          }
        >
          Datos generales
        </Header>
      }
    >
      {antiguo == "no" ? (
        <ColumnLayout columns={3} variant="text-grid">
          <SpaceBetween size="s">
            <div>
              <Box variant="awsui-key-label">Tipo</Box>
              {loading ? <Spinner /> : <div>{data.tipo_proyecto}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Estado</Box>
              {loading ? (
                <Spinner />
              ) : (
                <Badge
                  color={
                    data.estado == -1
                      ? "red"
                      : data.estado == 0
                      ? "grey"
                      : data.estado == 1
                      ? "green"
                      : data.estado == 2
                      ? "grey"
                      : data.estado == 3
                      ? "grey"
                      : data.estado == 5
                      ? "blue"
                      : data.estado == 5
                      ? "blue"
                      : data.estado == 6
                      ? "grey"
                      : "red"
                  }
                >
                  {data.estado == -1
                    ? "Eliminado"
                    : data.estado == 0
                    ? "No aprobado"
                    : data.estado == 1
                    ? "Aprobado"
                    : data.estado == 2
                    ? "Observado"
                    : data.estado == 3
                    ? "En evaluación"
                    : data.estado == 5
                    ? "Enviado"
                    : data.estado == 6
                    ? "En proceso"
                    : "Error"}
                </Badge>
              )}
            </div>
            <div>
              <Box variant="awsui-key-label">Código</Box>
              {loading ? <Spinner /> : <div>{data.codigo_proyecto}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Periodo</Box>
              {loading ? <Spinner /> : <div>{data.periodo}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Tipo de investigación</Box>
              {loading ? <Spinner /> : <div>{data.tipo_investigacion}</div>}
            </div>
          </SpaceBetween>
          <SpaceBetween size="s">
            <div>
              <Box variant="awsui-key-label">Título</Box>
              {loading ? <Spinner /> : <div>{data.titulo}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Monto</Box>
              {loading ? <Spinner /> : <div>{data.monto}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Facultad</Box>
              {loading ? <Spinner /> : <div>{data.facultad}</div>}
            </div>
          </SpaceBetween>
          <SpaceBetween size="s">
            <div>
              <Box variant="awsui-key-label">Línea de investigación</Box>
              {loading ? (
                <Spinner />
              ) : (
                <StatusIndicator type="info">
                  {data.linea_investigacion}
                </StatusIndicator>
              )}
            </div>
            <div>
              <Box variant="awsui-key-label">Fecha de inscripción</Box>
              {loading ? <Spinner /> : <div>{data.fecha_inscripcion}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Resolución</Box>
              {loading ? <Spinner /> : <div>{data.resolucion_rectoral}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Grupo</Box>
              {loading ? <Spinner /> : <div>{data.grupo_nombre}</div>}
            </div>
          </SpaceBetween>
        </ColumnLayout>
      ) : (
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Tipo</Box>
            {loading ? <Spinner /> : <div>{data.tipo_proyecto}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Estado</Box>
            {loading ? (
              <Spinner />
            ) : (
              <Badge
                color={
                  data.estado == -1
                    ? "red"
                    : data.estado == 0
                    ? "grey"
                    : data.estado == 1
                    ? "green"
                    : data.estado == 2
                    ? "grey"
                    : data.estado == 3
                    ? "grey"
                    : data.estado == 5
                    ? "blue"
                    : data.estado == 5
                    ? "blue"
                    : data.estado == 6
                    ? "grey"
                    : "red"
                }
              >
                {data.estado == -1
                  ? "Eliminado"
                  : data.estado == 0
                  ? "No aprobado"
                  : data.estado == 1
                  ? "Aprobado"
                  : data.estado == 2
                  ? "Observado"
                  : data.estado == 3
                  ? "En evaluación"
                  : data.estado == 5
                  ? "Enviado"
                  : data.estado == 6
                  ? "En proceso"
                  : "Error"}
              </Badge>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Código</Box>
            {loading ? <Spinner /> : <div>{data.codigo_proyecto}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Periodo</Box>
            {loading ? <Spinner /> : <div>{data.periodo}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Título</Box>
            {loading ? <Spinner /> : <div>{data.titulo}</div>}
          </div>
        </SpaceBetween>
      )}
    </Container>
  );
};
