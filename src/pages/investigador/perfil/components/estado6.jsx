import {
  Badge,
  Box,
  Button,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";
import Constancia from "./constancia";
import Solicitud from "./solicitud";

export default ({ data, reload }) => {
  return (
    <SpaceBetween size="m">
      <Constancia data={data.constancia} />
      <SpaceBetween size="xs">
        <Header
          variant="h3"
          description="Puede solicitar una nueva constancia a 2 meses del vencimiento de su constancia vigente."
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
        <Solicitud data={data.solicitud} reload={reload} />
      </SpaceBetween>
    </SpaceBetween>
  );
};
