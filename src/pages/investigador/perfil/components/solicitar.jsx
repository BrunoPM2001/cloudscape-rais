import {
  Alert,
  Box,
  Link,
  SpaceBetween,
  StatusIndicator,
} from "@cloudscape-design/components";
import { useState } from "react";
import ModalReq1 from "./modalReq1";
import ModalReq2 from "./modalReq2";
import ModalReq3 from "./modalReq3";
import ModalReq4 from "./modalReq4";
import ModalReq5 from "./modalReq5";
import ModalReq6 from "./modalReq6";

export default ({ data }) => {
  //  States
  const [visibleAlert, setVisibleAlert] = useState(true);
  const [modal, setModal] = useState("");

  //  Functions
  const close = () => setModal("");

  return (
    <>
      <SpaceBetween size="s">
        <Alert header="Información Sobre Publicaciones con filiación">
          <ul style={{ paddingLeft: "16px", margin: 0 }}>
            <li>
              Todas las publicaciones deben tener Filiación UNMSM. En caso
              contrario su solicitud será OBSERVADA.
            </li>
          </ul>
          <li>
            <Link
              href="https://vrip.unmsm.edu.pe/wp-content/uploads/2024/07/RR_009077-2024-R.pdf"
              target="_blank"
            >
              Ver Directiva ( Art 12° b) )
            </Link>
          </li>
        </Alert>
        <div>
          <Box variant="awsui-key-label">
            Renacyt{" "}
            <Link variant="info" onClick={() => setModal("req1")}>
              Info
            </Link>
          </Box>
          <StatusIndicator type="pending">No evaluado</StatusIndicator>
        </div>
        <div>
          <Box variant="awsui-key-label">
            Grupo de investigación{" "}
            <Link variant="info" onClick={() => setModal("req2")}>
              Info
            </Link>
          </Box>
          <StatusIndicator type="pending">No evaluado</StatusIndicator>
        </div>
        <div>
          <Box variant="awsui-key-label">
            Actividades de Investigación{" "}
            <Link variant="info" onClick={() => setModal("req3")}>
              Info
            </Link>
          </Box>
          <StatusIndicator type="pending">No evaluado</StatusIndicator>
        </div>
        <div>
          <Box variant="awsui-key-label">
            Publicaciones con filiación{" "}
            <Link variant="info" onClick={() => setModal("req4")}>
              Info
            </Link>
          </Box>
          <StatusIndicator type="pending">No evaluado</StatusIndicator>
        </div>
        <div>
          <Box variant="awsui-key-label">
            Deudas{" "}
            <Link variant="info" onClick={() => setModal("req5")}>
              Info
            </Link>
          </Box>
          <StatusIndicator type="pending">No evaluado</StatusIndicator>
        </div>
        <div>
          <Box variant="awsui-key-label">
            Declaración Jurada (DJ){" "}
            <Link variant="info" onClick={() => setModal("req6")}>
              Info
            </Link>
          </Box>
          <StatusIndicator type="pending">No evaluado</StatusIndicator>
        </div>
        {visibleAlert && (
          <Alert
            dismissible
            onDismiss={() => setVisibleAlert(false)}
            header="Recuerde que necesita tener al menos una publicación con
        filiación UNMSM para ser calificado como Docente Investigador"
          />
        )}
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
      ) : (
        modal == "req6" && <ModalReq6 data={[]} close={close} />
      )}
    </>
  );
};
