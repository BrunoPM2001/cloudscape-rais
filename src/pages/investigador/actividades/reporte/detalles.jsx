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
  Button,
} from "@cloudscape-design/components";
import axiosBase from "../../../../api/axios";
import ModalDj from "../proyectos_con_financiamiento/components/modalSubirDj";
import ModalDjECI from "../proyecto_eci/components/modalSubirDj";
import { useState } from "react";

export default ({ data, responsable, loading, id, items, antiguo }) => {
  //  States
  const [loadingReporte, setLoadingReporte] = useState(false);
  const [modal, setModal] = useState("");
  const [loadingFormato, setLoadingFormato] = useState(false);

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

  const formatoDjECI = async () => {
    setLoadingFormato(true);
    const res = await axiosBase.get(
      "investigador/actividades/eci/formatoDj",
      {
        params: {
          proyectoId: data.id,
        },
        responseType: "blob",
      }
    );

    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingFormato(false);
  };

  const formatoDj = async () => {
    setLoadingFormato(true);
    const res = await axiosBase.get(
      "investigador/actividades/conFinanciamiento/formatoDj",
      {
        params: {
          proyectoId: data.id,
        },
        responseType: "blob",
      }
    );

    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingFormato(false);
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
                } else if (detail.id == "action_4") {
                  reporte("reporteFex");
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
                    data.estado == "Eliminado"
                      ? "red"
                      : data.estado == "No aprobado"
                      ? "grey"
                      : data.estado == "Aprobado"
                      ? "green"
                      : data.estado == "Observado"
                      ? "red"
                      : data.estado == "En evaluación"
                      ? "blue"
                      : data.estado == "Enviado"
                      ? "blue"
                      : data.estado == "En proceso"
                      ? "severity-low"
                      : data.estado == "Anulado"
                      ? "red"
                      : data.estado == "Sustentado"
                      ? "blue"
                      : data.estado == "En ejecución"
                      ? "blue"
                      : data.estado == "Ejecutado"
                      ? "green"
                      : data.estado == "Concluido"
                      ? "green"
                      : "red"
                  }
                >
                  {data.estado}
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
            {loading ? (
              <Spinner />
            ) : (
              (data.dj_aceptada == null || data.dj_aceptada == 0) &&
              (data.tipo_proyecto == "PCONFIGI" || data.tipo_proyecto == "ECI") &&
              responsable == 1 && (
                <div>
                  <Box variant="awsui-key-label">Dj Subvencion Económica</Box>
                  <SpaceBetween direction="horizontal" size="xs">
                    <Button
                      variant="primary"
                      loading={loadingFormato}
                      onClick={() => {
                        if(data.tipo_proyecto === "PCONFIGI") {
                          formatoDj();
                        } else if  (data.tipo_proyecto === "ECI") {
                          formatoDjECI();
                        }
                      }}
                    >
                      Descargar Formato
                    </Button>
                    <Button loading={loading} onClick={() => setModal("firma")}>
                      Adjuntar DJ Firmada
                    </Button>
                  </SpaceBetween>
                </div>
              )
            )}
            {loading ? (
              <Spinner />
            ) : (
              data.dj_aceptada == 1 && (
                <div>
                  <Box variant="awsui-key-label">Dj Firmada</Box>
                  <StatusIndicator type="success">
                    Dj cargada correctamente!
                  </StatusIndicator>
                  <SpaceBetween direction="horizontal" size="xs">
                    <Button
                      variant="primary"
                      href={data.url}
                      target="_blank"
                      iconName="external"
                    >
                      Ver Dj Enviada
                    </Button>
                  </SpaceBetween>
                </div>
              )
            )}
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

      {modal === "firma" && (
        data.tipo_proyecto === "PCONFIGI" ? (
          <ModalDj
            onClose={() => setModal("")}
            proyecto_id={data.id}
            reload={() => {
              window.location.reload(); // esto es lo más directo si no tienes un sistema de estado
            }}
          />
        ) : (
          <ModalDjECI
            onClose={() => setModal("")}
            proyecto_id={data.id}
            reload={() => {
              window.location.reload();
            }}
          />
        )
      )}
    </Container>
  );
};
