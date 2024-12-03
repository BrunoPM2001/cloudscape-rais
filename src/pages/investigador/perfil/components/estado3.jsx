import {
  Badge,
  Box,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";
import Solicitud from "./solicitud";

export default ({ data }) => {
  return (
    <SpaceBetween size="xs">
      <Header
        variant="h3"
        actions={
          <SpaceBetween size="xs" direction="horizontal" alignItems="center">
            <Box fontSize="body-s">Estado</Box>
            <Badge
              color={
                data.solicitud.estado == "Enviado"
                  ? "blue"
                  : data.solicitud.estado == "Observado"
                  ? "grey"
                  : data.solicitud.estado == "En trámite"
                  ? "green"
                  : data.solicitud.estado == "Pendiente"
                  ? "green"
                  : "red"
              }
            >
              {data.solicitud.estado}
            </Badge>
          </SpaceBetween>
        }
      >
        Solicitud en curso
      </Header>
      <Solicitud data={data.solicitud} />
    </SpaceBetween>
  );
};
