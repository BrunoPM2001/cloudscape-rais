import {
  Box,
  Button,
  Form,
  Link,
  SpaceBetween,
  StatusIndicator,
  Badge,
  ButtonGroup,
} from "@cloudscape-design/components";
import ModalInfo from "./modalInfo";
import ModalReq1 from "./modalReq1";
import ModalReq2 from "./modalReq2";
import ModalReq3 from "./modalReq3";
import ModalReq4 from "./modalReq4";
import ModalReq5 from "./modalReq5";
import ModalReq6 from "./modalReq6";
import ModalObservaciones from "./modalObservaciones";
import ModalObservado from "./modalObservado";
import { useState } from "react";

export default ({ data, reload }) => {
  //  States
  const [modal, setModal] = useState("");
  const estados = [
    "Enviado",
    "Observado",
    "En trámite",
    "Pendiente",
    "Rechazado",
  ];

  //  Functions
  const close = () => setModal("");

  return (
    <Form
      actions={
        data.estado == "Observado" && (
          <SpaceBetween size="xs" direction="horizontal">
            <Button onClick={() => setModal("obs")}>Ver Observación</Button>
            <Button variant="primary" onClick={() => setModal("observado")}>
              Actualizar solicitud
            </Button>
          </SpaceBetween>
        )
      }
    >
      <SpaceBetween size="s">
        <div>
          <Box variant="awsui-key-label">
            <Badge color="severity-medium">
              <Link variant="info" external onClick={() => setModal("info")}>
                Ver Información Importante
              </Link>
            </Badge>
          </Box>
        </div>
        <div>
          <Box variant="awsui-key-label">
            Renacyt{" "}
            <Badge color="severity-low">
              <Link variant="info" onClick={() => setModal("req1")}>
                Ver
              </Link>
            </Badge>
          </Box>
          <StatusIndicator type={data.d1.cumple ? "success" : "error"}>
            {data.d1.cumple ? "Sí cumple" : "No cumple"}
          </StatusIndicator>
        </div>
        <div>
          <Box variant="awsui-key-label">
            Grupo de investigación{" "}
            <Badge color="severity-low">
              <Link variant="info" onClick={() => setModal("req2")}>
                Ver
              </Link>
            </Badge>
          </Box>
          <StatusIndicator type={data.d2.cumple ? "success" : "error"}>
            {data.d2.cumple ? "Sí cumple" : "No cumple"}
          </StatusIndicator>
        </div>
        <div>
          <Box variant="awsui-key-label">
            Actividades de Investigación{" "}
            <Badge color="severity-low">
              <Link variant="info" onClick={() => setModal("req3")}>
                Ver
              </Link>
            </Badge>
          </Box>
          <StatusIndicator type={data.d3.cumple ? "success" : "error"}>
            {data.d3.cumple ? "Sí cumple" : "No cumple"}
          </StatusIndicator>
        </div>
        <div>
          <Box variant="awsui-key-label">
            Publicaciones con filiación{" "}
            <Badge color="severity-low">
              <Link variant="info" onClick={() => setModal("req4")}>
                Ver
              </Link>
            </Badge>
          </Box>
          <StatusIndicator type={data.d4.cumple ? "success" : "error"}>
            {data.d4.cumple ? "Sí cumple" : "No cumple"}
          </StatusIndicator>
        </div>
        <div>
          <Box variant="awsui-key-label">
            Deudas{" "}
            <Badge color="severity-low">
              <Link variant="info" onClick={() => setModal("req5")}>
                Ver
              </Link>
            </Badge>
          </Box>
          <StatusIndicator type={data.d5.cumple ? "success" : "error"}>
            {data.d5.cumple ? "Sí cumple" : "No cumple"}
          </StatusIndicator>
        </div>
        <div>
          <Box variant="awsui-key-label">
            Declaración Jurada (DJ){" "}
            <Badge color="severity-low">
              <Link variant="info" onClick={() => setModal("req6")}>
                Ver
              </Link>
            </Badge>
          </Box>
          <StatusIndicator type={data.d6.cumple > 0 ? "success" : "error"}>
            {data.d6.cumple > 0 ? "Sí cumple" : "No cumple"}
          </StatusIndicator>
        </div>
      </SpaceBetween>
      <SpaceBetween size="m">
        <ButtonGroup>
          {estados.map((estado) => (
            <Button key={estado}>{estado}</Button>
          ))}
        </ButtonGroup>
      </SpaceBetween>
      {modal == "req1" ? (
        <ModalReq1 data={data.d1.valor} soli close={close} />
      ) : modal == "req2" ? (
        <ModalReq2 data={data.d2.valor} close={close} />
      ) : modal == "req3" ? (
        <ModalReq3 data={data.d3.lista} close={close} />
      ) : modal == "req4" ? (
        <ModalReq4 data={data.d4.lista} close={close} />
      ) : modal == "req5" ? (
        <ModalReq5 data={data.d5.lista} close={close} />
      ) : modal == "req6" ? (
        <ModalReq6 data={[data.d6.lista]} close={close} />
      ) : modal == "info" ? (
        <ModalInfo data={data} close={close} />
      ) : modal == "obs" ? (
        <ModalObservaciones data={data.obs} close={close} />
      ) : (
        modal == "observado" && (
          <ModalObservado
            id={data.id}
            antiguo={data.antiguo}
            close={close}
            reload={reload}
          />
        )
      )}
    </Form>
  );
};
