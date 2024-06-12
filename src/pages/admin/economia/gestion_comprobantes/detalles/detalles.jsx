import {
  Box,
  ColumnLayout,
  Container,
  Header,
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

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container header={<Header variant="h2">Detalles del proyecto</Header>}>
      <ColumnLayout columns={2} variant="text-grid">
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
        </SpaceBetween>
        <SpaceBetween size="s">
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
      </ColumnLayout>
    </Container>
  );
};
