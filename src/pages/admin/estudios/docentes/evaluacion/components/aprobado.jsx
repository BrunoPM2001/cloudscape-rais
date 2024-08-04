import {
  Box,
  ButtonDropdown,
  ColumnLayout,
  Container,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useState } from "react";
import axiosBase from "../../../../../../api/axios";

export default ({ id, data }) => {
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
          <div>{data.estado_tecnico}</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Autoridad</Box>
          <div>DEI</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Confirmar constancia</Box>
          <div>No</div>
        </div>
      </ColumnLayout>
    </Container>
  );
};
