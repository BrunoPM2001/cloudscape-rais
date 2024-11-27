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
  Popover,
} from "@cloudscape-design/components";
import axiosBase from "../../../api/axios";
import { useEffect, useState } from "react";
import ModalReq1 from "./components/modalReq1";
import ModalReq2 from "./components/modalReq2";
import ModalReq4 from "./components/modalReq4";
import ModalReq3 from "./components/modalReq3";
import ModalReq5 from "./components/modalReq5";
import ModalReq6 from "./components/modalReq6";
import ModalObservado from "./components/modalObservado";
import ModalObservaciones from "./components/modalObservaciones";
import Estado1 from "./components/estado1";
import Estado0 from "./components/estado0";
import Estado2 from "./components/estado2";
import Estado3 from "./components/estado3";

export default () => {
  //  States
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [modal, setModal] = useState("");
  const [visibleAlert, setVisibleAlert] = useState(true);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/perfil/cdiEstado");
    const data = res.data;
    setLoading(false);
    setData(data);
  };

  const close = () => {
    setModal("");
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
                  <SpaceBetween
                    size="xs"
                    direction="horizontal"
                    alignItems="center"
                  >
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
              <Button onClick={() => setModal("solicitud")}>
                Solicitar CDI
              </Button>
            ) : (
              data?.solicitud?.estado == "Observado" && (
                <SpaceBetween size="xs" direction="horizontal">
                  <Button onClick={() => setModal("obs")}>Ver obs.</Button>
                  <Button onClick={() => setModal("observado")}>
                    Actualizar solicitud
                  </Button>
                </SpaceBetween>
              )
            ))
          }
        >
          {data.estado == 0 ? (
            <Estado0 />
          ) : data.estado == 1 ? (
            <Estado1 />
          ) : data.estado == 2 ? (
            <Estado2
              data={data}
              reload={getData}
              modal={modal}
              setModal={setModal}
            />
          ) : data.estado == 3 ? (
            <Estado3 data={data} modal={modal} setModal={setModal} />
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
