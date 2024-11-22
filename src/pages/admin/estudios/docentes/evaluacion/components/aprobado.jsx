import {
  Box,
  Button,
  ButtonDropdown,
  ColumnLayout,
  Container,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";

export default ({ id, data }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Functions
  const ficha = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/docentes/fichaEvaluacion", {
      params: {
        id,
      },
      responseType: "blob",
    });
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoading(false);
  };

  const constanciaNoFirmada = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/docentes/constanciaCDI", {
      params: {
        id,
      },
      responseType: "blob",
    });
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoading(false);
  };

  const enviarCorreo = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/docentes/enviarCdiCorreo", {
      params: {
        id,
      },
    });
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    setLoading(false);
  };

  const constanciaFirmada = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/estudios/docentes/constanciaCDIFirmada",
      {
        params: {
          id,
        },
      }
    );
    const data = res.data;
    window.open(data.url, "_blank");
    setLoading(false);
  };

  return (
    <Container
      header={
        <Header
          variant="h3"
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button
                loading={loading}
                iconName="send"
                iconAlign="right"
                onClick={enviarCorreo}
              >
                Enviar CDI al usuario
              </Button>
              <ButtonDropdown
                loading={loading}
                items={[
                  {
                    id: "action_1",
                    text: "Ficha de evaluación",
                  },
                  {
                    id: "action_2",
                    text: "CDI no firmada",
                  },
                  {
                    id: "action_3",
                    text: "CDI firmada",
                  },
                ]}
                onItemClick={({ detail }) => {
                  if (detail.id == "action_1") {
                    ficha();
                  } else if (detail.id == "action_2") {
                    constanciaNoFirmada();
                  } else if (detail.id == "action_3") {
                    constanciaFirmada();
                  }
                }}
              >
                Documentos
              </ButtonDropdown>
            </SpaceBetween>
          }
        >
          Evaluación
        </Header>
      }
    >
      <ColumnLayout columns={2}>
        <div>
          <Box variant="awsui-key-label">Califica como</Box>
          <div>DOCENTE INVESTIGADOR</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Evaluación técnica</Box>
          <div>Aprobado</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Autoridad</Box>
          <div>DEI</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Confirmar constancia</Box>
          <div>{data.confirmar == 1 ? "Sí" : "No"}</div>
        </div>
      </ColumnLayout>
    </Container>
  );
};
