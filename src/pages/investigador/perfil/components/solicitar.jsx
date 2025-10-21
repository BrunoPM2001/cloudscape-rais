import {
  Box,
  Link,
  SpaceBetween,
  StatusIndicator,
  Badge,
} from "@cloudscape-design/components";
import { useState } from "react";
import ModalReq1 from "./modalReq1";
import ModalReq2 from "./modalReq2";
import ModalReq3 from "./modalReq3";
import ModalReq4 from "./modalReq4";
import ModalReq5 from "./modalReq5";
import ModalReq6 from "./modalReq6";
import ModalInfo from "./modalInfo";

export default ({ data }) => {
  //  States
  const [modal, setModal] = useState("");

  //  Functions
  const close = () => setModal("");

  return (
    <>
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
          <StatusIndicator type={data.req1Val ? "success" : "error"}>
            {data.req1Val ? "Sí cumple" : "No cumple"}
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
          <StatusIndicator type={data.req2Val ? "success" : "error"}>
            {data.req2Val ? "Sí cumple" : "No cumple"}
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
          <StatusIndicator type={data.req3Val ? "success" : "error"}>
            {data.req3Val ? "Sí cumple" : "No cumple"}
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
          <StatusIndicator type={data.req4Val ? "success" : "error"}>
            {data.req4Val ? "Sí cumple" : "No cumple"}
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
          <StatusIndicator type={data.req5Val ? "success" : "error"}>
            {data.req5Val ? "Sí cumple" : "No cumple"}
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
          <StatusIndicator type="pending">No evaluado</StatusIndicator>
        </div>
      </SpaceBetween>

      {modal == "req1" ? (
        <ModalReq1 data={data.req1} close={close} />
      ) : modal == "req2" ? (
        <ModalReq2 data={data.req2} close={close} />
      ) : modal == "req3" ? (
        <ModalReq3 data={data.req3} close={close} />
      ) : modal == "req4" ? (
        <ModalReq4 data={data.req4} close={close} />
      ) : modal == "req5" ? (
        <ModalReq5 data={data.req5} close={close} />
      ) : modal == "info" ? (
        <ModalInfo data={data.info} close={close} />
      ) : (
        modal == "req6" && <ModalReq6 data={[]} close={close} />
      )}
    </>
  );
};
