import {
  Alert,
  Box,
  Link,
  SpaceBetween,
  StatusIndicator,
} from "@cloudscape-design/components";
import ModalReq1 from "./modalReq1";
import ModalReq2 from "./modalReq2";
import ModalReq3 from "./modalReq3";
import ModalReq4 from "./modalReq4";
import ModalReq5 from "./modalReq5";
import ModalReq6 from "./modalReq6";
import ModalObservaciones from "./modalObservaciones";
import ModalObservado from "./modalObservado";
import { useState } from "react";

export default ({ data }) => {
  //  States
  const [modal, setModal] = useState("");

  //  Functions
  const close = () => setModal("");

  return (
    <>
      <SpaceBetween size="s">
        <Alert header="Información Sobre Publicaciones con Filiación:">
          <ul style={{ paddingLeft: "16px", margin: 0 }}>
            <li>
              Todas las publicaciones deben tener Filiación UNMSM. En caso
              contrario su solicitud será OBSERVADA.
            </li>
            <li>
              Debe eliminar sus publicaciones sin Filiación UNMSM de su perfil
              RAIS.
            </li>
            <li>
              <Link
                href="https://vrip.unmsm.edu.pe/wp-content/uploads/2024/07/RR_009077-2024-R.pdf"
                target="_blank"
              >
                Ver Directiva ( Art 12° b) )
              </Link>
            </li>
          </ul>
        </Alert>
        <div>
          <Box variant="awsui-key-label">
            Renacyt{" "}
            <Link variant="info" onClick={() => setModal("req1")}>
              Info
            </Link>
          </Box>
          <StatusIndicator type={data.d1.cumple ? "success" : "error"}>
            {data.d1.cumple ? "Sí cumple" : "No cumple"}
          </StatusIndicator>
        </div>
        <div>
          <Box variant="awsui-key-label">
            Grupo de investigación{" "}
            <Link variant="info" onClick={() => setModal("req2")}>
              Info
            </Link>
          </Box>
          <StatusIndicator type={data.d2.cumple ? "success" : "error"}>
            {data.d2.cumple ? "Sí cumple" : "No cumple"}
          </StatusIndicator>
        </div>
        <div>
          <Box variant="awsui-key-label">
            Actividades de Investigación{" "}
            <Link variant="info" onClick={() => setModal("req3")}>
              Info
            </Link>
          </Box>
          <StatusIndicator type={data.d3.cumple ? "success" : "error"}>
            {data.d3.cumple ? "Sí cumple" : "No cumple"}
          </StatusIndicator>
        </div>
        <div>
          <Box variant="awsui-key-label">
            Publicaciones con filiación{" "}
            <Link variant="info" onClick={() => setModal("req4")}>
              Info
            </Link>
          </Box>
          <StatusIndicator type={data.d4.cumple ? "success" : "error"}>
            {data.d4.cumple ? "Sí cumple" : "No cumple"}
          </StatusIndicator>
        </div>
        <div>
          <Box variant="awsui-key-label">
            Deudas{" "}
            <Link variant="info" onClick={() => setModal("req5")}>
              Info
            </Link>
          </Box>
          <StatusIndicator type={data.d5.cumple ? "success" : "error"}>
            {data.d5.cumple ? "Sí cumple" : "No cumple"}
          </StatusIndicator>
        </div>
        <div>
          <Box variant="awsui-key-label">
            Declaración Jurada (DJ){" "}
            <Link variant="info" onClick={() => setModal("req6")}>
              Info
            </Link>
          </Box>
          <StatusIndicator type={data.d6.cumple > 0 ? "success" : "error"}>
            {data.d6.cumple > 0 ? "Sí cumple" : "No cumple"}
          </StatusIndicator>
        </div>
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
      ) : modal == "obs" ? (
        <ModalObservaciones data={data.obs} close={close} />
      ) : (
        modal == "observado" && (
          <ModalObservado
            id={data.id}
            antiguo={data.antiguo}
            close={close}
            reload={getData}
          />
        )
      )}
    </>
  );
};
