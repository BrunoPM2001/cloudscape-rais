import {
  Box,
  ColumnLayout,
  Container,
  Header,
  SpaceBetween,
  Spinner,
  StatusIndicator,
} from "@cloudscape-design/components";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default ({ data, loading }) => {
  // //  State
  // const [data, setData] = useState({});
  // const [loading, setLoading] = useState(true);

  // //  Url
  // const location = useLocation();
  // const { id } = queryString.parse(location.search);

  // //  Functions
  // const getData = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await fetch(
  //       "http://localhost:8000/api/admin/estudios/grupos/detalle/" + id
  //     );
  //     if (!res.ok) {
  //       setData([]);
  //       setLoading(false);
  //       throw new Error("Error in fetch");
  //     } else {
  //       const data = await res.json();
  //       setData(data.data[0]);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setData([]);
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <Container header={<Header variant="h2">Detalles del grupo</Header>}>
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
            <div>{data.coordinador}</div>
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
                    : "error"
                }
              >
                {data.estado == -1
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
        </SpaceBetween>
      </ColumnLayout>
    </Container>
  );
};
