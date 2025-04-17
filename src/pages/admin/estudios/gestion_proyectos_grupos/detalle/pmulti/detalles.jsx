import {
  Box,
  Button,
  ButtonDropdown,
  ColumnLayout,
  Container,
  Header,
  SpaceBetween,
  Spinner,
  StatusIndicator,
  Table,
} from "@cloudscape-design/components";
import ModalEditarProyecto from "../components/modalEditarProyecto";
import { useState } from "react";
import axiosBase from "../../../../../../api/axios";

export default ({ data, loading, proyecto_id, reload }) => {
  //  States
  const [visible, setVisible] = useState(false);
  const [loadingReporte, setLoadingReporte] = useState(false);

  //  Functions
  const exportWord = async () => {
    setLoadingReporte(true);
    const res = await axiosBase.get(
      "admin/estudios/proyectosGrupo/exportToWord",
      {
        params: {
          proyecto_id,
        },
        responseType: "blob",
      }
    );
    setLoadingReporte(false);
    const blob = res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const exportPdf = async () => {
    setLoadingReporte(true);
    const res = await axiosBase.get("admin/estudios/proyectosGrupo/reporte", {
      params: {
        proyecto_id,
      },
      responseType: "blob",
    });
    setLoadingReporte(false);
    const blob = await res.data;
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
                items={[
                  {
                    id: "action_1",
                    text: "Word",
                  },
                  {
                    id: "action_2",
                    text: "Pdf",
                  },
                ]}
                onItemClick={({ detail }) => {
                  if (detail.id == "action_1") {
                    exportWord();
                  } else if (detail.id == "action_2") {
                    exportPdf();
                  }
                }}
                disabled={loading}
                loading={loadingReporte}
              >
                Exportar descripción
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
      <SpaceBetween size="s">
        <div>
          <Box variant="awsui-key-label">Título</Box>
          {loading ? <Spinner /> : <div>{data.titulo}</div>}
        </div>
        <ColumnLayout columns={4} variant="text-grid">
          <SpaceBetween size="s">
            <div>
              <Box variant="awsui-key-label">Código</Box>
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
            <div>
              <Box variant="awsui-key-label">Tipo de proyecto</Box>
              {loading ? <Spinner /> : <div>{data.tipo_proyecto}</div>}
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
              <Box variant="awsui-key-label">Fecha de inicio</Box>
              {loading ? <Spinner /> : <div>{data.fecha_inicio}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Fecha de fin</Box>
              {loading ? <Spinner /> : <div>{data.fecha_fin}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Comentarios</Box>
              {loading ? (
                <Spinner />
              ) : (
                <StatusIndicator type="info">
                  {data.comentarios == "" || data.comentarios == null
                    ? "Ninguno"
                    : data.comentarios}
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
          </SpaceBetween>
          <SpaceBetween size="s">
            <div>
              <Box variant="awsui-key-label">Línea de investigación</Box>
              {loading ? <Spinner /> : <div>{data.linea}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Área temática</Box>
              {loading ? <Spinner /> : <div>{data.area_tematica}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Objetivo ods</Box>
              {loading ? <Spinner /> : <div>{data.ods}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Área de conocimiento OCDE</Box>
              {loading ? <Spinner /> : <div>{data.ocde}</div>}
            </div>
            <div>
              <Box variant="awsui-key-label">Localización</Box>
              {loading ? <Spinner /> : <div>{data.localizacion}</div>}
            </div>
          </SpaceBetween>
          <SpaceBetween size="s">
            <Box variant="awsui-key-label">Grupos participantes</Box>
            <Table
              variant="embedded"
              columnDefinitions={[
                {
                  id: "grupo_nombre_corto",
                  header: "Nombre corto",
                  cell: (item) => item.grupo_nombre_corto,
                },
                {
                  id: "grupo_categoria",
                  header: "Categoría",
                  cell: (item) => item.grupo_categoria,
                },
                {
                  id: "autorizado",
                  header: "Autorizado",
                  cell: (item) => (
                    <StatusIndicator
                      type={
                        item.autorizado == "SÍ"
                          ? "success"
                          : item.autorizado == "NO"
                          ? "error"
                          : "pending"
                      }
                    >
                      {item.autorizado}
                    </StatusIndicator>
                  ),
                },
              ]}
              columnDisplay={[
                { id: "grupo_nombre_corto", visible: true },
                { id: "grupo_categoria", visible: true },
                { id: "autorizado", visible: true },
              ]}
              items={data?.grupos ?? []}
              loading={loading}
              loadingText="Cargando datos"
            />
          </SpaceBetween>
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
