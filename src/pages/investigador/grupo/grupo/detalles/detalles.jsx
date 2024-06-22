import {
  Box,
  ColumnLayout,
  Container,
  Header,
  SpaceBetween,
  Spinner,
  StatusIndicator,
} from "@cloudscape-design/components";
import { useState } from "react";

export default ({ data, loading }) => {
  //  States
  const [visible, setVisible] = useState(false);
  const [typeModal, setTypeModal] = useState("");

  return (
    <Container header={<Header variant="h2">Detalles del grupo</Header>}>
      <ColumnLayout columns={3} variant="text-grid">
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Nombre</Box>
            {loading ? <Spinner /> : <div>{data.grupo_nombre}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Nombre corto</Box>
            {loading ? <Spinner /> : <div>{data.grupo_nombre_corto}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Facultad</Box>
            {loading ? <Spinner /> : <div>{data.facultad}</div>}
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
            <Box variant="awsui-key-label">Teléfono</Box>
            {loading ? <Spinner /> : <div>{data.telefono}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Anexo</Box>
            {loading ? <Spinner /> : <div>{data.anexo}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Oficina</Box>
            {loading ? <Spinner /> : <div>{data.oficina}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Dirección</Box>
            {loading ? <Spinner /> : <div>{data.dirección}</div>}
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Correo</Box>
            {loading ? (
              <Spinner />
            ) : (
              <StatusIndicator type="info">{data.email}</StatusIndicator>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Página web</Box>
            {loading ? <Spinner /> : <div>{data.web}</div>}
          </div>
        </SpaceBetween>
      </ColumnLayout>
      {visible && (typeModal == "edit" ? <></> : <></>)}
    </Container>
  );
};
