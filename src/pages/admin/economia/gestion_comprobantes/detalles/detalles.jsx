import {
  Box,
  Button,
  ColumnLayout,
  Container,
  Header,
  Icon,
  Link,
  SpaceBetween,
  Spinner,
  StatusIndicator,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios";

export default ({ id }) => {
  //  States
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);

  //  Functions
  const getData = async () => {
    const res = await axiosBase.get(
      "admin/economia/comprobantes/detalleProyecto",
      {
        params: {
          geco_id: id,
        },
      }
    );
    const data = res.data;
    setData(data);
    setLoading(false);
  };

  const reporte = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.get(
      "admin/economia/comprobantes/detalleGasto",
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
    setLoadingBtn(false);
  };

  const reporteHojaResumen = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.get(
      "admin/economia/comprobantes/reportePresupuesto",
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
    setLoadingBtn(false);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container
      header={
        <Header
          variant="h2"
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button
                disabled={loading}
                loading={loadingBtn}
                onClick={reporteHojaResumen}
                iconName="download"
              >
                Hoja de resumen
              </Button>
              <Button
                disabled={loading}
                loading={loadingBtn}
                onClick={reporte}
                iconName="file"
              >
                Detalle de gasto
              </Button>
            </SpaceBetween>
          }
        >
          Detalles del proyecto
        </Header>
      }
    >
      <ColumnLayout columns={4} variant="text-grid">
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Tipo</Box>
            {loading ? <Spinner /> : <div>{data.tipo_proyecto}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Título</Box>
            {loading ? <Spinner /> : <div>{data.titulo}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Código de proyecto</Box>
            {loading ? <Spinner /> : <div>{data.codigo_proyecto}</div>}
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Estado</Box>
            {loading ? (
              <Spinner />
            ) : (
              <StatusIndicator
                type={
                  data.estado == 0
                    ? "info"
                    : data.estado == 1
                    ? "success"
                    : "error"
                }
              >
                {data.estado == 0
                  ? "Pendiente"
                  : data.estado == 1
                  ? "Completado"
                  : "error"}
              </StatusIndicator>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Responsable</Box>
            {loading ? <Spinner /> : <div>{data.responsable}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Correo</Box>
            {loading ? <Spinner /> : <div>{data.email3}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Teléfono</Box>
            {loading ? <Spinner /> : <div>{data.telefono_movil}</div>}
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Porcentaje rendido</Box>
            {loading ? (
              <Spinner size="large" />
            ) : (
              <Link variant="awsui-value-large" href="#">
                {data.rendido}%
              </Link>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Comprobantes aprobados</Box>
            {loading ? (
              <Spinner size="large" />
            ) : (
              <Link variant="awsui-value-large" href="#">
                <Icon name="file" size="inherit" /> {data.comprobantes}
              </Link>
            )}
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Transferencias aprobadas</Box>
            {loading ? (
              <Spinner size="large" />
            ) : (
              <Link variant="awsui-value-large" href="#">
                <Icon name="check" size="inherit" /> {data.transferencias}
              </Link>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Cantidad de partidas</Box>
            {loading ? (
              <Spinner size="large" />
            ) : (
              <Link variant="awsui-value-large" href="#">
                <Icon name="search" size="inherit" /> {data.partidas}
              </Link>
            )}
          </div>
        </SpaceBetween>
      </ColumnLayout>
    </Container>
  );
};
