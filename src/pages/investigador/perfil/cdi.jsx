import {
  Box,
  Form,
  Link,
  Alert,
  Button,
  Header,
  Spinner,
  Container,
  SpaceBetween,
  StatusIndicator,
  Badge,
} from "@cloudscape-design/components";
import axiosBase from "../../../api/axios";
import { useEffect, useState } from "react";
import ModalReq1 from "./components/modalReq1";
import ModalReq2 from "./components/modalReq2";
import ModalReq4 from "./components/modalReq4";
import ModalReq3 from "./components/modalReq3";
import ModalReq5 from "./components/modalReq5";
import ModalReq6 from "./components/modalReq6";
import ModalSolicitud from "./components/modalSolicitud";
import ModalObservado from "./components/modalObservado";

export default () => {
  //  States
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [typeModal, setTypeModal] = useState("");

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/perfil/cdiEstado");
    const data = res.data;
    setLoading(false);
    setData(data);
  };

  const close = () => {
    setTypeModal("");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      {loading ? (
        <>
          <Spinner /> Cargando información de CDI
        </>
      ) : (
        <Form
          header={
            <Header
              variant="h3"
              actions={
                data.estado == 3 && (
                  <Badge
                    color={
                      data.solicitud.estado == "Enviado"
                        ? "blue"
                        : data.solicitud.estado == "Observado"
                        ? "grey"
                        : data.solicitud.estado == "En trámite"
                        ? "blue"
                        : data.solicitud.estado == "Pendiente"
                        ? "blue"
                        : "red"
                    }
                  >
                    {data.solicitud.estado}
                  </Badge>
                )
              }
              description={
                data.estado == 3 && <>Fecha de envío: {data.solicitud.fecha}</>
              }
            >
              {data.estado == 3 ? (
                <>Solicitud CDI</>
              ) : (
                <>Requisitos para solicitar CDI</>
              )}
            </Header>
          }
          actions={
            data.estado != 4 &&
            (data.estado == 2 ? (
              <Button onClick={() => setTypeModal("solicitud")}>
                Solicitar CDI
              </Button>
            ) : data.solicitud.estado == "Observado" ? (
              <Button onClick={() => setTypeModal("observado")}>
                Actualizar solicitud
              </Button>
            ) : (
              <></>
            ))
          }
        >
          {data.estado == 0 ? (
            <Alert header="No figura su registro en RRHH" type="warning">
              Comuníquese con el personal del RAIS en caso vea este error si es
              que usted es docente desde hace más de un mes en la UNMMS
            </Alert>
          ) : data.estado == 1 ? (
            <Alert header="No cumple con los prerrequisitos para solicitar CDI">
              Necesita tener registrado su CTI VITAE, Google Scholar y asociado
              su ORCID al RAIS.
            </Alert>
          ) : data.estado == 2 ? (
            <>
              <SpaceBetween size="s">
                <div>
                  <Box variant="awsui-key-label">
                    Renacyt{" "}
                    <Link variant="info" onClick={() => setTypeModal("req1")}>
                      Info
                    </Link>
                  </Box>
                  <StatusIndicator type="pending">No evaluado</StatusIndicator>
                </div>
                <div>
                  <Box variant="awsui-key-label">
                    Grupo de investigación{" "}
                    <Link variant="info" onClick={() => setTypeModal("req2")}>
                      Info
                    </Link>
                  </Box>
                  <StatusIndicator type="pending">No evaluado</StatusIndicator>
                </div>
                <div>
                  <Box variant="awsui-key-label">
                    Actividades de Investigación{" "}
                    <Link variant="info" onClick={() => setTypeModal("req3")}>
                      Info
                    </Link>
                  </Box>
                  <StatusIndicator type="pending">No evaluado</StatusIndicator>
                </div>
                <div>
                  <Box variant="awsui-key-label">
                    Publicaciones con filiación{" "}
                    <Link variant="info" onClick={() => setTypeModal("req4")}>
                      Info
                    </Link>
                  </Box>
                  <StatusIndicator type="pending">No evaluado</StatusIndicator>
                </div>
                <div>
                  <Box variant="awsui-key-label">
                    Deudas{" "}
                    <Link variant="info" onClick={() => setTypeModal("req5")}>
                      Info
                    </Link>
                  </Box>
                  <StatusIndicator type="pending">No evaluado</StatusIndicator>
                </div>
                <div>
                  <Box variant="awsui-key-label">
                    Declaración Jurada (DJ){" "}
                    <Link variant="info" onClick={() => setTypeModal("req6")}>
                      Info
                    </Link>
                  </Box>
                  <StatusIndicator type="pending">No evaluado</StatusIndicator>
                </div>
              </SpaceBetween>
              {typeModal == "req1" ? (
                <ModalReq1 data={data.req1} close={close} />
              ) : typeModal == "req2" ? (
                <ModalReq2 data={data.req2} close={close} />
              ) : typeModal == "req3" ? (
                <ModalReq3 data={data.req3} close={close} />
              ) : typeModal == "req4" ? (
                <ModalReq4 data={data.req4} close={close} />
              ) : typeModal == "req5" ? (
                <ModalReq5 data={data.req5} close={close} />
              ) : typeModal == "req6" ? (
                <ModalReq6 data={data.req6} close={close} />
              ) : typeModal == "solicitud" ? (
                <ModalSolicitud
                  data={data.rrhh}
                  actividades={data.actividades_extra}
                  close={close}
                  reload={getData}
                />
              ) : (
                <></>
              )}
            </>
          ) : data.estado == 3 ? (
            <>
              <SpaceBetween size="s">
                <div>
                  <Box variant="awsui-key-label">
                    Renacyt{" "}
                    <Link variant="info" onClick={() => setTypeModal("req1")}>
                      Info
                    </Link>
                  </Box>
                  <StatusIndicator
                    type={data.solicitud.d1.cumple ? "success" : "error"}
                  >
                    {data.solicitud.d1.cumple ? "Sí cumple" : "No cumple"}
                  </StatusIndicator>
                </div>
                <div>
                  <Box variant="awsui-key-label">
                    Grupo de investigación{" "}
                    <Link variant="info" onClick={() => setTypeModal("req2")}>
                      Info
                    </Link>
                  </Box>
                  <StatusIndicator
                    type={data.solicitud.d2.cumple ? "success" : "error"}
                  >
                    {data.solicitud.d2.cumple ? "Sí cumple" : "No cumple"}
                  </StatusIndicator>
                </div>
                <div>
                  <Box variant="awsui-key-label">
                    Actividades de Investigación{" "}
                    <Link variant="info" onClick={() => setTypeModal("req3")}>
                      Info
                    </Link>
                  </Box>
                  <StatusIndicator
                    type={data.solicitud.d3.cumple ? "success" : "error"}
                  >
                    {data.solicitud.d3.cumple ? "Sí cumple" : "No cumple"}
                  </StatusIndicator>
                </div>
                <div>
                  <Box variant="awsui-key-label">
                    Publicaciones con filiación{" "}
                    <Link variant="info" onClick={() => setTypeModal("req4")}>
                      Info
                    </Link>
                  </Box>
                  <StatusIndicator
                    type={data.solicitud.d4.cumple > 0 ? "success" : "error"}
                  >
                    {data.solicitud.d4.cumple > 0 ? "Sí cumple" : "No cumple"}
                  </StatusIndicator>
                </div>
                <div>
                  <Box variant="awsui-key-label">
                    Deudas{" "}
                    <Link variant="info" onClick={() => setTypeModal("req5")}>
                      Info
                    </Link>
                  </Box>
                  <StatusIndicator
                    type={data.solicitud.d5.cumple ? "success" : "error"}
                  >
                    {data.solicitud.d5.cumple ? "Sí cumple" : "No cumple"}
                  </StatusIndicator>
                </div>
                <div>
                  <Box variant="awsui-key-label">
                    Declaración Jurada (DJ){" "}
                    <Link variant="info" onClick={() => setTypeModal("req6")}>
                      Info
                    </Link>
                  </Box>
                  <StatusIndicator
                    type={data.solicitud.d6.cumple > 0 ? "success" : "error"}
                  >
                    {data.solicitud.d6.cumple > 0 ? "Sí cumple" : "No cumple"}
                  </StatusIndicator>
                </div>
              </SpaceBetween>
              {typeModal == "req1" ? (
                <ModalReq1 data={data.solicitud.d1.valor} soli close={close} />
              ) : typeModal == "req2" ? (
                <ModalReq2 data={data.solicitud.d2.valor} close={close} />
              ) : typeModal == "req3" ? (
                <ModalReq3 data={data.solicitud.d3.lista} close={close} />
              ) : typeModal == "req4" ? (
                <ModalReq4 data={data.solicitud.d4.lista} close={close} />
              ) : typeModal == "req5" ? (
                <ModalReq5 data={data.solicitud.d5.lista} close={close} />
              ) : typeModal == "req6" ? (
                <ModalReq6 data={data.solicitud.d6.lista} close={close} />
              ) : typeModal == "observado" ? (
                <ModalObservado
                  id={data.solicitud.id}
                  antiguo={data.solicitud.antiguo}
                  close={close}
                  reload={getData}
                />
              ) : (
                <></>
              )}
            </>
          ) : (
            <Alert
              header="Constancia CDI"
              type="success"
              action={
                <Button
                  iconName="download"
                  href={data.url}
                  target="_blank"
                  variant="primary"
                  iconAlign="right"
                >
                  Descargar
                </Button>
              }
            >
              Vigente desde el {data.fecha_inicio} hasta el {data.fecha_fin}. La
              validez del presente documento está condicionada a la vigencia de
              su registro en RENACYT.
            </Alert>
          )}
        </Form>
      )}
    </Container>
  );
};
